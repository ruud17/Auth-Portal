import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IRegistrationFields } from 'interfaces/IRegistrationFields';
import { ILoginFields } from 'interfaces/ILoginFields';
import { IUser } from 'interfaces/IUser';
import { getToken, setToken } from 'utils/localStorageHelper';
import { ENDPOINT } from 'constants/constants';

const API_BASE_URL: string | undefined = process.env.REACT_APP_API_BASE_URL;
const EXCLUDED_ENDPOINTS = [ENDPOINT.REGISTER, ENDPOINT.LOGIN];

if (!API_BASE_URL) {
  throw new Error('API base URL not provided');
}

const apiService: AxiosInstance = axios.create({
  baseURL: API_BASE_URL
});

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
      if (key !== 'photos') {
        formData.append(key, value?.toString()); // Convert all values to string
      }
    });

    // Append files (photos) to formData if
    if (userRegisterData.photos) {
      userRegisterData.photos.forEach((file, index) => {
        formData.append('photos', file, file.name);
      });
    }

    // API call with formData
    await apiService.post(ENDPOINT.REGISTER, formData);
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export const login = async (loginData: ILoginFields): Promise<void> => {
  try {
    const response: AxiosResponse<{ access_token: string }> = await apiService.post(ENDPOINT.LOGIN, loginData);
    const { access_token } = response.data;
    setToken(access_token); // Store the token using localStorage helper
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export const getUserInfo = async (): Promise<IUser> => {
  try {
    const response: AxiosResponse<IUser> = await apiService.get(ENDPOINT.PROFILE);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

export default apiService;
