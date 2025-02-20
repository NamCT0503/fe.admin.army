import { get } from "."

export const getListMessage = async (suggesstion_id, limit, page) => {
    return get(`/message/get-all/${suggesstion_id}?page=${page}&limit=${limit}`);
}

export const getMessageLatestOfAllSuggesstion = async (page, limit) => {
    return get(`/message/get-latest?page=${page}&limit=${limit}`);
}