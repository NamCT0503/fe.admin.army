import { get, update, del, post } from "./index";

export const getAccount = async (page, limit, filter, ) => {
  // const filter = new URLSearchParams({ page, limit, is_paranoid });
  const params = new URLSearchParams({ page, limit });
  Object.entries({
    is_paranoid: filter.is_paranoid,
    department_id: filter.department,
    name: filter.name
}).reduce((acc, [key, value]) => (value!==null && value!=='' ? params.append(key, value) : acc), params);

  return await get(`/user/get?${params.toString()}`);
};

export const createAccount = async (params) => {
  return await post("/user/create", params);
};

export const updateAccount = async (id, params) => {
  return await update(`/user/update/${id}`, params);
};

export const deleteAccount = async (id, is_delete) => {
  return await del(`/user/delete/${id}?is_delete=${is_delete}`);
};

export const deleteDeviceFinger = async (userid) => {
  return await del(`/user/delete/device-finger/${userid}`);
}