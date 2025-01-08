import { createSlice } from "@reduxjs/toolkit";
import { isUnreleasedContent } from "helpers/utils";
import { fetchDriveDiscs, LoadingStatus } from "rtk/fetchData";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { DriveDisc } from "types/driveDisc";

export interface DriveDiscState {
    status: LoadingStatus;
    driveDiscs: DriveDisc[];
}

const storedDriveDiscs = localStorage.getItem("data/driveDiscs") || "null";
localStorage.removeItem("driveDiscs");

const storedSettings = localStorage.getItem("settings") || "{}";
const { unreleasedContent = false } = JSON.parse(storedSettings);

const initialState: DriveDiscState = {
    status: "idle",
    driveDiscs: storedDriveDiscs !== "null" ? JSON.parse(storedDriveDiscs) : [],
};

export const driveDiscSlice = createSlice({
    name: "driveDiscs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDriveDiscs.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchDriveDiscs.fulfilled, (state, action) => {
            let payload = action.payload;
            if (!unreleasedContent) {
                payload = payload.filter((item) =>
                    isUnreleasedContent(item.release.version)
                );
            }
            if (JSON.stringify(action.payload) !== storedDriveDiscs) {
                state.driveDiscs = action.payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchDriveDiscs.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectDriveDiscs = (state: RootState): DriveDisc[] =>
    state.driveDiscs.driveDiscs;

export default driveDiscSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: fetchDriveDiscs.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        if (!unreleasedContent) {
            payload = payload.filter((item) =>
                isUnreleasedContent(item.release.version)
            );
        }
        const data = JSON.stringify(payload);
        if (data !== storedDriveDiscs) {
            localStorage.setItem("data/driveDiscs", data);
        }
    },
});
