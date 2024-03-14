import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BASE_URL = "http://localhost:1337/";
const TIME_OUT = 30000;
export const BLOSSOM_TOKEN_NAME = "blossom_user_token";

export const saveToken = async (key: string, value: any) => {
  try {
    // Verifica se o valor é uma string
    const stringValue =
      typeof value === "string" ? value : JSON.stringify(value);
    await SecureStore.setItemAsync(key, stringValue);
  } catch (error) {
    console.log("error ao salvar token", error);
    throw error;
  }
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

axiosInstance.interceptors.request.use(async (req) => {
  try {
    const access_token = await SecureStore.getItemAsync(BLOSSOM_TOKEN_NAME);
    req.headers.Authorization = access_token;

    return req;
  } catch (error) {
    return req;
  }
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;
