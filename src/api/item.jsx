import { get, post } from './index';

export const getItem = (page, limit, { type, status }) => {
    return get(`/item/get?page=${page}&limit=${limit}&type=${type}&status=${status}`);
}

export const createItem = (data) => {
    return post(`/item/create`, data);
}