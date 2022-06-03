import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast as ToastType } from 'react-toastify';
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import {
    signin as signinRoute,
    signup as signupRoute,
} from '../../api';
import localforage from "localforage";
import { User } from '../../../types';



interface AuthState {
    user: User | null;
    loading: boolean;
    error: string;
}

const initialState: AuthState = {
    user: null,
    error: "",
    loading: false
};


interface AuthParams {
    email: string;
    password: string;
    navigate: NavigateFunction;
    toast: typeof ToastType;
}


interface SignupParams extends AuthParams {
    name: string;
}


type Err = {
    error: string;
}

const formatError = (error: any): string => {
    console.log(error);
    return error instanceof AxiosError
        ? error.response?.data.error  //|| error.response?.
        : "Something went wrong on the server";
}

export const signin = createAsyncThunk<AuthState, AuthParams, { rejectValue: { error: string } }>(
    "/auth/signin",
    async (signinParams: AuthParams, { rejectWithValue }) => {
        try {
            const response = await signinRoute(signinParams)
            signinParams.toast.success("Login Succesfully!");
            signinParams.navigate('/');
            return response.data as AuthState;
        } catch (error) {
            const err = rejectWithValue({ error: formatError(error) });
            return err;
        }
    });


export const signup = createAsyncThunk<AuthState, SignupParams, { rejectValue: { error: string } }>(
    "/auth/signup",
    async (signupParams: SignupParams, { rejectWithValue }) => {
        try {
            const response = await signupRoute(signupParams);
            signupParams.toast.success('Signup successfull');
            signupParams.navigate("/");
            return response.data as AuthState;
        } catch (error) {
            const err = rejectWithValue({ error: formatError(error) });
            return err;
        }
    }
)

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setUser(state: AuthState, { payload }: PayloadAction<User>) {
            state.user = payload;
        },
        signout(state: AuthState) {
            (async () => await localforage.clear())();
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signin.pending, (state: AuthState) => {
            state.loading = true;
        });

        builder.addCase(signin.fulfilled, (state: AuthState, { payload }) => {
            if (!payload) {
                return;
            }
            (async () => await localforage.setItem("profile", JSON.stringify(payload.user)))();
            state.user = payload.user;
        });

        builder.addCase(signin.rejected, (state: AuthState, { payload }) => {
            const error = payload ? payload.error : "Something went wrong";
            state.error = error;
            state.loading = false;
        });

        builder.addCase(signup.pending, (state: AuthState) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(signup.fulfilled, (state: AuthState) => {
            state.loading = false;
        });

        builder.addCase(signup.rejected, (state: AuthState, { payload }) => {
            const error = payload ? payload.error : "Something went wrong";
            state.error = error;
            state.loading = false;
        });
    }
});



export const { setUser, signout } = authSlice.actions;

export default authSlice.reducer;
