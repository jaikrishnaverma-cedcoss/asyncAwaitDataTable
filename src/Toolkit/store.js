import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slicer";

 const store = configureStore({reducer:mainSlice})
 export default store