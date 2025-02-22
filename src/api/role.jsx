import { get } from "."

export const getAllRole = async (page, limit) => {
    return await get(`/role/get-all?page=${page}&limit=${limit}`);
}