import { get, update, post, del } from './index';

export const getSuggesstion = (page, limit, filters) => {
    const params = new URLSearchParams({ page, limit });

    Object.entries({
        start_date: filters.startDate,
        end_date: filters.endDate,
        department: filters.department,
        status: filters.status
    }).reduce((acc, [key, value]) => (value ? params.append(key, value) : acc), params);

    return get(`/suggesstion/get?${params.toString()}`);
};

export const getSuggesstionById = (id) => {
    return get(`/suggesstion/detail/${id}`);
}

export const createSuggesstion = (data) => {
    return post(`/suggesstion/create`, data);
}

export const updateSuggesstion = (id, data) => {
    return update(`/suggesstion/update/${id}`, data);
}

export const deleteSuggesstion = (id) => {
    return del(`/suggesstion/delete/${id}`);
}