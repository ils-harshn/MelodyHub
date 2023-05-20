import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./reducers";
import  createSagaMiddleware  from 'redux-saga';
import rootSaga from "./sagas";


const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: combinedReducers,
    middleware: () => [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)