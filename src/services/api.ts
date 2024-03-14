import axiosInstance, { BLOSSOM_TOKEN_NAME, saveToken } from "./config";

type RegisterUserTypes = IUser;

export const registerUser = async ({
  email,
  name,
  password,
}: RegisterUserTypes) => {
  try {
    const response = await axiosInstance.post("/user/create", {
      email,
      password,
      name,
    });
    return response.data.user;
  } catch (error) {
    console.log("erro ao registrar usuario", error);
    throw error;
  }
};

type LoginUserTypes = Omit<IUser, "name">;

export const loginUser = async ({ email, password }: LoginUserTypes) => {
  try {
    const response = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    const _token = String(response.data.token);
    saveToken(BLOSSOM_TOKEN_NAME, _token);
    axiosInstance.defaults.headers.common["Authorization"] = _token;
    return response.data.user;
  } catch (error) {
    console.log("erro ao registrar usuario", error);
    throw error;
  }
};
