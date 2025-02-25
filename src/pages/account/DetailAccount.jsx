import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { useLocation } from "react-router-dom";
// import { updateAccount } from "../../api/account";
import { useAuthContext } from "../../contexts/UserContext";
import { deleteDeviceFinger } from "../../api/account";

const DetailAccountJSX = () => {
    const { authState } = useAuthContext();
    const { state } = useLocation();

    const handleDelete = async () => {
        if(state && state?.id){
            // const res = await updateAccount(state.id, { device_finger: null })
            const res = await deleteDeviceFinger(state.id);
            if(res?.status===200){
                alert(res.message);
                window.location.href = '/danh-sach-tai-khoan';
            } else alert(res.message ?? 'Lỗi xóa mã thiết bị truy cập của tài khoản!');
        }
    }

    return(
        <div className="container flex justify-center items-center h-full">
            <div className="bg-white rounded-2xl flex justify-center items-center overflow-y-auto" style={{ width: '95%', height: '95%' }}>
                <div className="flex flex-col justify-start items-start gap-10" style={{ width: '95%', height: '95%' }}>
                    <div className="w-full h-fit flex justify-between items-center">
                        <span className="inline-block text-3xl font-extrabold">Chi tiết tài khoản số {state?.id}</span>
                    </div>
                    <div className="w-full grow flex flex-col justify-between items-start gap-7 text-lg">
                        <span className="inline-block"><b>Họ và tên: </b>{state.fullname}</span>
                        <span className="inline-block"><b>Tài khoản sử dụng: </b>{state.username}</span>
                        <span className="inline-block"><b>Họ và tên: </b>{state.fullname}</span>
                        <div className="w-full h-fit flex justify-start items-center gap-3">
                            {
                                state.device_finger?
                                <>
                                <span className="inline-block"><b>Mã thiết bị truy cập:</b> {state.device_finger}</span>
                                {
                                    authState?.user?.role_id<4?
                                    <Popconfirm
                                        title="Xóa mã thiết bị truy cập"
                                        description="Xác nhận xóa mã thiết bị truy cập của người dùng này? Hành động không thể hoàn tác!"
                                        okText="Xác nhận"
                                        cancelText="Hủy"
                                        onConfirm={handleDelete}
                                    >
                                        <Button danger><DeleteOutlined /></Button>
                                    </Popconfirm>:
                                    <></>
                                }
                                </>:
                                <span className="inline-block"><b>Mã thiết bị truy cập:</b> Tạm không có.</span>
                            }
                        </div>
                        <span className="inline-block"><b>Chức vụ: </b>{state.roles.name}</span>
                        <span className="inline-block"><b>Phòng/Ban/Bộ phận: </b>{state.department_name ?? 'Tạm không có'}</span>
                        <span className="inline-block"><b>Kho: </b>{state.storages?.name ?? 'Tạm không có'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailAccountJSX;