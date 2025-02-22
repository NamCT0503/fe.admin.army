import { get } from "."

export const getAllDepartment = async (page, limit) => {
    return await get(`/department/get-all?page=${page}&limit=${limit}`);
}