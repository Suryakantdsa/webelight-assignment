import { createSlice } from "@reduxjs/toolkit";

const repoSlice = createSlice({
    name: "repository",
    initialState: {
      repo: [],
    },
    reducers: {
      addRepo: (state, action) => {
        state.repo = action.payload;
      },
    },
  });
  
  export const { addRepo } = repoSlice.actions;
  
  export default repoSlice.reducer;
  