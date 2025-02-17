import { login as loginAPI, getProfile as getProfileAPI } from "../api/auth";

export const login = async (dispatch, credentials) => {
  dispatch({ type: "LOGIN_REQUEST" });
  console.log("credentials", credentials);
  try {
    const response = await loginAPI(credentials);
    const token = response.metadata.accessToken;
    localStorage.setItem("accessToken", token);
    dispatch({ type: "LOGIN_SUCCESS", payload: token });
    window.location.href = "/de-nghi-nhu-cau";
    return true;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error.message });
    throw error;
  }
};

export const getProfile = async (dispatch) => {
  const token = localStorage.getItem("accessToken");
  console.log("token", token);

  if (!token) {
    throw new Error("Access token not found.");
  }

  try {
    const response = await getProfileAPI();
    dispatch({ type: "SET_USER", payload: response.metadata }); // Dispatch user thông qua action
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};
