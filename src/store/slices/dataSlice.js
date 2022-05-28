import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hours: [[{name: "First", desc: "Detailed Info"},{name: "Second", desc: "Detailed Info"},],[{name: "Third", desc: "Detailed Info"},{name: "Fourth", desc: "Detailed Info"}],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
};

const dataSlice = createSlice({  
  name: 'data',
  initialState,
  reducers: {
    setHours (state, action) {
      state.hours = action.payload;
    },
  },
})

export default dataSlice;

export const { setHours } = dataSlice.actions;
