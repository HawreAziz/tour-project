import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/auth-reducer';
import tourReducer from './reducers/tour-reducer';



const store = configureStore({
    reducer: {
        auth: AuthReducer,
        tour: tourReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;