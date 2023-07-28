import {configureStore} from "@reduxjs/toolkit";
import appMainSlice from "./appMainSlice";

const ECModuleStore = configureStore({
    reducer: {
        appMain: appMainSlice.reducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof ECModuleStore.getState>

// Inferred type for Action Creators (reducers)
export type AppDispatch = typeof ECModuleStore.dispatch

export default ECModuleStore;