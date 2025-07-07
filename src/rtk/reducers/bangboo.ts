import { createSlice } from "@reduxjs/toolkit";
import { isUnreleasedContent } from "helpers/utils";
import { fetchBangboos, LoadingStatus } from "rtk/fetchData";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { Bangboo } from "types/bangboo";

export interface BangbooState {
    status: LoadingStatus;
    bangboos: Bangboo[];
    names: string[];
}

const storedBangboos = localStorage.getItem("data/bangboos") || "null";
localStorage.removeItem("bangboos");

const storedSettings = localStorage.getItem("settings") || "{}";
const { unreleasedContent = false } = JSON.parse(storedSettings);

const initialState: BangbooState = {
    status: "idle",
    bangboos: storedBangboos !== "null" ? JSON.parse(storedBangboos) : [],
    names: [],
};

export const bangbooSlice = createSlice({
    name: "bangboos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBangboos.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchBangboos.fulfilled, (state, action) => {
            let payload = action.payload;
            state.names = action.payload.map((item) => item.name.split(" ").join("_").toLowerCase());
            if (!unreleasedContent) {
                payload = payload.filter((item) =>
                    isUnreleasedContent(item.release.version)
                );
            }
            if (JSON.stringify(payload) !== storedBangboos) {
                state.bangboos = payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchBangboos.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectBangboos = (state: RootState): Bangboo[] =>
    state.bangboos.bangboos;

export const selectBangbooNames = (state: RootState): string[] =>
    state.bangboos.names;

export default bangbooSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: fetchBangboos.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        if (!unreleasedContent) {
            payload = payload.filter((item) =>
                isUnreleasedContent(item.release.version)
            );
        }
        const data = JSON.stringify(payload);
        if (data !== storedBangboos) {
            localStorage.setItem("data/bangboos", data);
        }
    },
});
