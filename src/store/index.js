import { createSlice, configureStore } from "@reduxjs/toolkit";

const describeDataSlice = createSlice({
  name: "describe",
  initialState: {
    describeData: "",
    reference: "",
  },
  reducers: {
    setData(state, action) {
      state.describeData = action.payload.fields.filter(
        (data) =>
          data.type.name === "picklist" ||
          data.type.name === "multipicklist" ||
          data.type.name === "owner"
      );
    },
    setReference(state, action) {
      state.reference = action.payload;
    },
  },
});

const store = configureStore({
  reducer: describeDataSlice.reducer,
});
export const describeDataAction = describeDataSlice.actions;

export default store;
