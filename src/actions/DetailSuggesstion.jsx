import { getAccount } from "../api/account";
import { getSuggesstionById, updateSuggesstion } from "../api/suggesstion"

export const getSuggesstionFiles = async (suggesstion_id) => {
    try {
        const res = await getSuggesstionById(suggesstion_id);
        const dataRes = res.metadata.suggesstionfiles;
        return dataRes;
    } catch (error) {
        throw console.error("Lỗi lấy SuggesstionFile: ", error);
    }
}

export const getAllUser = async (page, limit) => {
    try {
        const res = await getAccount(page, limit);
        const dataRes = res.metadata.records;
        return dataRes;
    } catch (error) {
        throw console.error("Lỗi lấy tất cả tài khoản: ", error);
    }
}

export const putSuggesstion = async (id, data) => {
    try {
        const res = await updateSuggesstion(id, data);
        const dataRes = res.status;
        return dataRes;
    } catch (error) {
        throw console.error("Lỗi cập nhật suggesstion: ", error);
    }
}