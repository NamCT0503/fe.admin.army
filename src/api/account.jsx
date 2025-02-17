import { get, update, del, post } from "./index";

export const getAccount = async (page, limit) => {
  const filter = new URLSearchParams({ page, limit });
  return await get(`/user/get?${filter.toString()}`);
};

export const createAccount = async (params) => {
  return await post("/user/create", params);
};

export const updateAccount = async (id, params) => {
  return await update(`/account/${id}`, params);
};

export const deleteAccount = async (id) => {
  return await del(`/account/${id}`);
};