import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tour, TourData } from "../../../types";
import * as api from '../../api';
import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';
import { formatError } from ".";
import { NONAME } from "dns";



interface TourState {
    loading: boolean;
    error: string;
    tours: Tour[];
    tour: Tour | null;
    userTours: Tour[];
}


interface CreateParams extends TourData {
    toast: typeof toast;
    navigate: NavigateFunction;
}



const initialState: TourState = {
    loading: false,
    error: "",
    tours: [],
    tour: null,
    userTours: []
}

interface RejectValue {
    error: string
}


export const createTour = createAsyncThunk<TourState, CreateParams, { rejectValue: RejectValue }>(
    "/tours/create",
    async (tourParams: CreateParams, { rejectWithValue }) => {
        const { title, tags, description, imageFile } = tourParams;
        try {
            const { data } = await api.createTour({ title, tags, description, imageFile });
            tourParams.toast.success("Tour created successfully");
            tourParams.navigate("/");
            return data as TourState;
        } catch (error) {
            return rejectWithValue({ error: formatError(error) });
        }
    }
);


export const getTours = createAsyncThunk<Tour[], string, { rejectValue: RejectValue }>(
    "/tours/getTours",
    async (_: string = "", { rejectWithValue }) => {
        try {
            const { data } = await api.getTours();
            return data.tours;
        } catch (error) {
            return rejectWithValue({ error: formatError(error) });
        }
    });



export const getToursByUser = createAsyncThunk<Tour[], string, { rejectValue: RejectValue }>(
    "/tours/getToursByUser",
    async (userId: string, { rejectWithValue }) => {
        try {
            const { data } = await api.getToursById(userId);
            return data.tours as Tour[];
        } catch (error) {
            return rejectWithValue({ error: formatError(error) })
        }
    }
);


export const getTour = createAsyncThunk<Tour, string, { rejectValue: RejectValue }>('/tour/getTour',
    async (tourId: string, { rejectWithValue }) => {
        try {
            const { data } = await api.getTour(tourId);
            return data.tour as Tour;
        } catch (error) {
            return rejectWithValue({ error: formatError(error) });
        }
    });


export const deleteTour = createAsyncThunk<{ message: string }, string, { rejectValue: RejectValue }>("/tours/deleteTour",
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await api.deleteTour(id);
            return data as { message: string };
        } catch (error) {
            console.log(error);
            return rejectWithValue({ error: formatError(error) })
        }
    });

const tourSlice = createSlice({
    name: "Tour",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<TourState>) => {
        builder.addCase(createTour.pending, (state: TourState) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(createTour.fulfilled, (state: TourState) => {
            state.loading = false;
        });

        builder.addCase(createTour.rejected, (state: TourState, { payload }) => {
            state.error = payload ? payload.error : "Something went wrong";
        });

        builder.addCase(getTours.pending, (state: TourState) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(getTours.fulfilled, (state: TourState, { payload }) => {
            state.loading = false;
            state.tours = payload;
        });

        builder.addCase(getTours.rejected, (state: TourState, { payload }) => {
            state.loading = false;
            state.error = payload ? payload.error : "Something went wrong";
        });

        builder.addCase(getToursByUser.pending, (state: TourState) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(getToursByUser.fulfilled, (state: TourState, { payload }) => {
            state.userTours = payload;
            state.loading = false;
        });

        builder.addCase(getToursByUser.rejected, (state: TourState, { payload }) => {
            state.loading = false;
            state.error = payload ? payload.error : "Something went wrong";
        });

        builder.addCase(deleteTour.pending, (state: TourState) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(deleteTour.fulfilled, (state: TourState, action) => {
            state.loading = false;
        });

        builder.addCase(deleteTour.rejected, (state: TourState, { payload }) => {
            state.loading = false;
            state.error = payload ? payload.error : "Something went wrong";
        });

        builder.addCase(getTour.pending, (state: TourState) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(getTour.fulfilled, (state: TourState, { payload }) => {
            state.loading = false;
            state.tour = payload;
        });

        builder.addCase(getTour.rejected, (state: TourState, {payload}) => {
            state.loading = false;
            state.error = payload ? payload.error : "Something went wrong";
        });
    }
});


export default tourSlice.reducer;