import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './slices/dataSlice';

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  }
})

export default store;