import { get } from "."

export const getAllStorage = async (page, limit) => {
    return await get(`/storage/get-all?page=${page}&limit=${limit}`);
}