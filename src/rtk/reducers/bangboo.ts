import { createSlice } from "@reduxjs/toolkit";
import { fetchBangboos, LoadingStatus } from "rtk/fetchData";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { Bangboo } from "types/bangboo";

export interface BangbooState {
    status: LoadingStatus;
    bangboos: Bangboo[];
}

const storedBangboos = localStorage.getItem("bangboos") || "null";

const initialState: BangbooState = {
    status: "idle",
    bangboos: storedBangboos !== "null" ? JSON.parse(storedBangboos) : [],
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
            if (JSON.stringify(action.payload) !== storedBangboos) {
                state.bangboos = action.payload;
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

export default bangbooSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: fetchBangboos.fulfilled,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedBangboos) {
            localStorage.setItem("bangboos", data);
        }
    },
});
