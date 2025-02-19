import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllUser, getSuggesstionFiles, putSuggesstion } from "../../actions/DetailSuggesstion";
import { useAuthContext } from "../../contexts/UserContext";
import { sendMessage } from "../../api/websocket";
import { getSuggesstion } from "../../api/suggesstion";
import { useWsContext } from "../../contexts/Websocet";

const DetailSuggesstionJSX = () => {
    const userContext = useAuthContext();
    const wsContext = useWsContext();
    const { state, pathname } = useLocation();

    const [files, setFiles] = useState([]); // SugggesstionFile theo suggesstion.
    const [account, setAccount] = useState([]); // Tất cả tài khoản khả dụng trong hệ thống.
    const [infoSuggesstion, setInfoSuggesstion] = useState(); // Thông tin suggsstion được chuyển đến từ thông báo.
    const [dataInput, setDataInput] = useState({
        note: state?.note,
        invite_id: state?.invite?.id
    }); // Dữ liệu nhập vào.
    const [inviteName, setInviteName] = useState(''); // Tên người xử lý (chỉ dành cho user thường).

    const navigate = useNavigate();

    useEffect(() => {
        const fetcher = async (id) => {
            const res = await getSuggesstionFiles(id);
            if(res){
                setFiles(res);
            } else alert('Lỗi lấy SuggesstionFile!');
        }

        const fetchAccount = async (page, limit) => {
            const res = await getAllUser(page, limit);
            if(res){
                let optionSelect = [];
                res.map(items => {
                    const option = { value: items.id, label: items.department_name!==null? `${items.fullname} - ${items.department_name}`: items.fullname }
                    optionSelect.push(option);
                });
                setAccount(optionSelect);
            } else alert('Lỗi khi lấy tất cả tài khoản!');
        }

        if(state===null){
            const noti_id = pathname.split('/')[3];
            const fetchSuggesstions = async () => {
                try {
                    const res = await getSuggesstion(1, 50, {});
                    if (res.status === 200) {
                        const dataRes = res.metadata.records;
                        const targetSuggess= dataRes.find(items => items.id==noti_id);
                        setInfoSuggesstion(targetSuggess);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchSuggesstions();
        }

        const noti_id = pathname.split('/')[3];
        fetcher(parseInt(noti_id));
        fetchAccount(1, 100);
    }, [state]);

    useEffect(() => {
        const invite_name = account.find(items => items.value===dataInput.invite_id)
        setInviteName(invite_name?.label || "");
    }, [state, account]);

    useEffect(() => {
        if(!state && infoSuggesstion){
            setDataInput({
                ...dataInput,
                note: infoSuggesstion?.note,
                invite_id: infoSuggesstion?.invite?.id
            });
        }
    },[state, infoSuggesstion]);

    const handleClickFile = (filePath) => {
        if (filePath) {
            window.open(filePath, '_blank');
        }
    }

    const handleChangeData = (e) => {
        setDataInput({
            ...dataInput,
            note: e.target.value
        });
    }

    const handleSelectUser = (value) => {
        setDataInput({
            ...dataInput,
            invite_id: value
        })
    }

    const handleSubmit = async () => {
        if(!dataInput.invite_id) return alert("Vui lòng chọn người xử lý yêu cầu!");

        const data = {
            note: dataInput.note,
            status: state? `${parseInt(state?.status)+1}`: `${parseInt(state?.status)+1}`,
            invite_id: dataInput.invite_id
        }
        let res;
        if(state){
            res = await putSuggesstion(state?.id, data);
        } else res = await putSuggesstion(infoSuggesstion?.id, data);

        if(res && res===200){
            // if(state){
            //     sendMessage(userContext.wsState, { invite_id: dataInput.invite_id, suggesstion_id: state?.id }, 'send-noti');
            // } else sendMessage(userContext.wsState, { invite_id: dataInput.invite_id, suggesstion_id: infoSuggesstion?.id }, 'send-noti');
            if(state){
                sendMessage(wsContext.wsState, { invite_id: dataInput.invite_id, suggesstion_id: state?.id }, 'send-noti');
            } else sendMessage(wsContext.wsState, { invite_id: dataInput.invite_id, suggesstion_id: infoSuggesstion?.id }, 'send-noti');
            navigate('/de-nghi-nhu-cau');
        } else {
            alert('Lỗi xử lý suggesstion!');
        }
    }

    return(
        <div className="container flex justify-center items-center h-full">
            <div className="bg-white rounded-2xl flex justify-center items-center overflow-y-auto" style={{ width: '95%', height: '95%' }}>
                <div className="flex flex-col justify-start items-start gap-6" style={{ width: '95%', height: '95%' }}>
                    <div className="w-full h-fit flex justify-between items-center">
                        <span className="inline-block text-3xl font-extrabold">Chi tiết yêu cầu {state? state?.id: infoSuggesstion?.id}</span>
                        <div className="w-fit h-fit flex justify-start items-center gap-2">
                            <span className="inline-block text-3xl font-extrabold">Ngày:</span>
                            <span className="inline-block text-3xl font-normal">{state? state?.date.split(' ')[0]: infoSuggesstion?.date.split(' ')[0]}</span>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col justify-start items-start text-lg gap-5">
                        <div className="w-full h-fit flex justify-start items-center gap-2">
                            <span className="inline-block font-medium">Họ và tên người yêu cầu:</span>
                            <span>{state? state?.users?.fullname: infoSuggesstion?.users?.fullname}</span>
                        </div>
                        <div className="w-full h-fit flex justify-start items-center gap-2">
                            <span className="inline-block font-medium">Phòng:</span>
                            <span>{state? state?.users?.departments?.name: infoSuggesstion? infoSuggesstion?.users?.departments?.name: 'Tạm chưa có'}</span>
                        </div>
                        <div className="w-full h-fit flex justify-start items-start gap-2">
                            <span className="inline-block font-medium">Mô tả:</span>
                            <Input.TextArea size="large" rows={3} value={state? state?.description: infoSuggesstion?.description} readOnly style={{ width: '60%'}} />
                        </div>
                        <div className="w-4/5 h-fit flex justify-start items-center gap-4">
                            <span className="inline-block font-medium">Hình ảnh:</span>
                            <div className="w-4/5 h-full flex justify-start items-center gap-3">
                                {files.map(items => {
                                    if(items.type===false){
                                        return(
                                            <div className="bg-gray-400 text-sm p-1 rounded-md cursor-pointer hover:text-red-700" onClick={() => handleClickFile(items.file)}>{items.file.split('/')[3]}</div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className="w-4/5 h-fit flex justify-start items-center gap-4">
                            <span className="inline-block font-medium">File đính kèm:</span>
                            <div className="w-4/5 h-full flex justify-start items-center gap-3">
                                {files.map(items => {
                                    if(items.type===true){
                                        return(
                                            <div className="bg-gray-400 text-sm p-1 rounded-md cursor-pointer hover:text-red-700" onClick={() => handleClickFile(items.file)}>{items.file.split('/')[3]}</div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className="w-full h-fit flex justify-start items-center gap-2">
                            <span className="inline-block font-medium">Trạng thái:</span>
                            {
                                state?
                                    state?.status==1?
                                    <span className="text-red-600 bg-red-100 font-bold py-1 px-2 rounded">Chưa xử lý</span>:
                                    state?.status==2?
                                    <span className="text-yellow-600 bg-yellow-100 font-bold py-1 px-2 rounded">Đang xử lý</span>:
                                    <span className="text-green-600 bg-green-100 font-bold py-1 px-2 rounded">Đã xử lý</span>
                                : 
                                    infoSuggesstion?.status==1?
                                    <span className="text-red-600 bg-red-100 font-bold py-1 px-2 rounded">Chưa xử lý</span>:
                                    infoSuggesstion?.status==2?
                                    <span className="text-yellow-600 bg-yellow-100 font-bold py-1 px-2 rounded">Đang xử lý</span>:
                                    <span className="text-green-600 bg-green-100 font-bold py-1 px-2 rounded">Đã xử lý</span>
                            }
                            <span className="inline-block font-medium ml-10">Lúc: </span>
                            <span>{
                                state?
                                state?.deletedAt===null? state?.updatedAt: state?.deletedAt:
                                infoSuggesstion?.deletedAt===null? infoSuggesstion?.updatedAt: infoSuggesstion?.deletedAt    
                            }</span>
                        </div>
                        <div className="w-full h-fit flex justify-start items-start gap-2">
                            <span className="inline-block font-medium">Ghi chú:</span>
                            <Input.TextArea size="large" rows={3} value={dataInput.note} onChange={handleChangeData} readOnly={userContext.authState.user?.role_id>3? true: false} style={{ width: '60%' }} />
                        </div>
                        <div className="w-full h-fit flex justify-start items-start gap-2">
                            <span className="inline-block font-medium">Phân công xử lý:</span>
                            {
                                userContext.authState.user?.role_id<4?
                                <Select options={account} value={dataInput.invite_id} onSelect={handleSelectUser} allowClear placeholder="Chọn người xử lý" onClear={() => setDataInput({...dataInput, invite_id: null})} style={{ minWidth: '200px'}} />:
                                <span>{inviteName.trim()===''? 'Tạm chưa có': 
                                    state?
                                    state?.invite?.departments?.name? `${state?.invite?.fullname} - ${state?.invite?.departments.name}`: state?.invite?.fullname:
                                    infoSuggesstion?.invite?.departments?.name? `${infoSuggesstion?.invite?.fullname} - ${infoSuggesstion?.invite?.departments.name}`: infoSuggesstion?.invite?.fullname
                                }</span>
                            }
                        </div>
                        {
                            userContext.authState.user?.role_id < 4?
                            <div className="w-full flex justify-center items-center">
                                <Button className="mb-5" size="large" type="primary" onClick={handleSubmit}>Xác nhận</Button>
                            </div>:
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSuggesstionJSX;