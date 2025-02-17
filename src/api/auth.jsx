import { post, get } from "./index";

export const login = async ({ username, password, device_finger }) => {
  const response = await post("/signin", { username, password, device_finger }, {
    withCredentials: true,
  });
  return response;
};

export const getProfile = async () => {
  const response = await get("/user/profile");
  return response;
};