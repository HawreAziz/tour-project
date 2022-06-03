import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import localforage from 'localforage';


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

interface TourData {
    title: string;
    description: string;
    imageFile: string;
    tags: string[];
}


export const signin = async <T>(signinCreds: SigninCreds) => await api.post<T>('/users/signin', signinCreds);
export const signup = async (signupCreds: Signup) => await api.post('/users/signup', signupCreds);
export const createTour = async (tourData: TourData) => await api.post('/tours/create', tourData);