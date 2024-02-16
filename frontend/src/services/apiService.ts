import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getToken, setToken } from '../utils/localStorageHelper';
import { REGISTER_ENDPOINT, LOGIN_ENDPOINT, PROFILE_ENDPOINT } from './apiEndpoints';
import { IRegistrationFields } from '../interfaces/IRegistrationFields';
import { ILoginFields } from '../interfaces/ILoginFields';
import { IUser } from '../interfaces/IUser';

const API_BASE_URL: string | undefined = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('API base URL not provided');
}

const apiService: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

const EXCLUDED_ENDPOINTS = [REGISTER_ENDPOINT, LOGIN_ENDPOINT];

// Add a request interceptor
apiService.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token && !EXCLUDED_ENDPOINTS.some((endpoint) => config.url?.startsWith(endpoint))) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerNewUser = async (userRegisterData: IRegistrationFields): Promise<void> => {
    try {
        const formData = new FormData();
        // Append user registration text fields to formData
        Object.entries(userRegisterData).forEach(([key, value]) => {
            if (key !== "photos") { // Exclude the photos key for now
                formData.append(key, value.toString()); // Convert all values to string
            }
        });

        // Append files (photos) to formData if present
        if (userRegisterData.photos) {
            userRegisterData.photos.forEach((file, index) => {
                formData.append('photos', file, file.name);
            });
        }

        // API call with formData
        const response: AxiosResponse<void> = await apiService.post(REGISTER_ENDPOINT, formData, {
            headers: {
                'Content-Type': undefined, // This instructs Axios to automatically set the correct Content-Type
            },
        });
    } catch (error: unknown) {
        throw error;
    }
};

export const login = async (loginData: ILoginFields): Promise<void> => {
    try {
        const response: AxiosResponse<{ access_token: string }> = await apiService.post(LOGIN_ENDPOINT, loginData);
        const { access_token } = response.data;
        console.log("TOKEN", response, access_token);
        setToken(access_token); // Store the token using localStorage helper
    } catch (error) {
        console.log(error);
        throw error;
        // TO DO: Handle error
    }
};

export const getUserInfo = async (): Promise<IUser> => {
    try {
        const response: AxiosResponse<IUser> = await apiService.get(PROFILE_ENDPOINT);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
        // TO DO: Handle error
    }
};

export default apiService;
