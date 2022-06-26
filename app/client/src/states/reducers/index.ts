import { AxiosError } from 'axios';

export const formatError = (error: any): string => {
    return error instanceof AxiosError
        ? error.response?.data.error
        : "Something went wrong on the server";
}