import { createSlice } from "@reduxjs/toolkit";



const graphSlice=createSlice({
    name:"graph"
    ,initialState:{
        data:[]
    },
    reducers:{
        addGraphData:((state,action)=>{
            state=action.payload
        }),
        removeGraphData:((state,action)=>{
            state=[]
        })
    }
})

export const {addGraphData,removeGraphData}=graphSlice.actions
export default graphSlice.reducer
