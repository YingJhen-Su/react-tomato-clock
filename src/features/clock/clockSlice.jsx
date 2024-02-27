import { createSlice } from "@reduxjs/toolkit";
import { PERIOD } from "./constants";

const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timeLeft: "25:00",
    isRunning: false,
    period: PERIOD.SESSION,
};

const handleTimeLeft = (timeLeft) => {
    return timeLeft.toString().padStart(2, "0") + ":00";
};

export const clockSlice = createSlice({
    name: "clock",
    initialState,
    reducers: {
        incrementBreak: (state) => {
            if (state.isRunning || state.breakLength === 60) return;
            state.breakLength += 1;
            if (state.period === PERIOD.BREAK) {
                state.timeLeft = handleTimeLeft(state.breakLength);
            }
        },
        decrementBreak: (state) => {
            if (state.isRunning || state.breakLength === 1) return;
            state.breakLength -= 1;
            if (state.period === PERIOD.BREAK) {
                state.timeLeft = handleTimeLeft(state.breakLength);
            }
        },
        incrementSession: (state) => {
            if (state.isRunning || state.sessionLength === 60) return;
            state.sessionLength += 1;
            if (state.period === PERIOD.SESSION) {
                state.timeLeft = handleTimeLeft(state.sessionLength);
            }
        },
        decrementSession: (state) => {
            if (state.isRunning || state.sessionLength === 1) return;
            state.sessionLength -= 1;
            if (state.period === PERIOD.SESSION) {
                state.timeLeft = handleTimeLeft(state.sessionLength);
            }
        },
        changeTimeLeft: (state, action) => {
            state.timeLeft = action.payload;
        },
        changeSwitch: (state) => {
            state.isRunning = !state.isRunning;
        },
        changePeriod: (state) => {
            state.period =
                state.period === PERIOD.SESSION ? PERIOD.BREAK : PERIOD.SESSION;
        },
        reset: () => {
            return initialState;
        },
    },
});

export default clockSlice.reducer;
export const clockSelector = (state) => state.clock;
export const {
    incrementBreak,
    decrementBreak,
    incrementSession,
    decrementSession,
    changeTimeLeft,
    changeSwitch,
    changePeriod,
    reset,
} = clockSlice.actions;
