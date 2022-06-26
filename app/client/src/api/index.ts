import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import localforage from 'localforage';
import { TourData } from '../../types';


const api = axios.create({
    baseURL: "http://localhost:5000"
});


api.interceptors.request.use(async (req: AxiosRequestConfig<AxiosRequestHeaders>) => {
    const data = await localforage.getItem("profile") as string;
    if (data) {
        req.headers!.Authorization = `Bearer ${JSON.parse(data).token}`;
    }
    return req;
});

interface SigninCreds {
    email: string;
    password: string;
}


interface Signup {
    email: string;
    password: string;
    name: string;
}



export const signin = async (signinCreds: SigninCreds) => await api.post('/users/signin', signinCreds);
export const signup = async (signupCreds: Signup) => await api.post('/users/signup', signupCreds);
export const createTour = async (tourData: TourData) => await api.post('/tours/create', tourData);
export const getTours = async () => await api.get('/tours');
export const getTour = async (tourId: string) => await api.get('/tour/${tourId}');
export const getToursById = async (userId: string) => await api.get(`/tours/${userId}`);
export const deleteTour = async (tourId: string) => await api.delete(`/tours/${tourId}`)