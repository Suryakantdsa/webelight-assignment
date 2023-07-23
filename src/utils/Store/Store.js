import { configureStore } from "@reduxjs/toolkit";
import repoSlice from "./Slice/repoSlice";

import createSagaMiddleware from "redux-saga" 
import repoSaga from "../repoSaga";
import graphSlice from "./Slice/graphSlice";


const sagaMiddleware=createSagaMiddleware()

const store=configureStore({
    reducer:{
        repository:repoSlice
        ,graph:graphSlice
    },
    middleware:[sagaMiddleware]

})
sagaMiddleware.run(repoSaga)

export default store