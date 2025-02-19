import { Drawer, Input } from "antd"
import { useStateContext } from "../../contexts/StateContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/UserContext";
import { useWsContext } from "../../contexts/Websocet";

const QuickMessage = ({ loading, data, message }) => {
    const stateContext = useStateContext();
    const userContext = useAuthContext();
    const wsContext = useWsContext();

    const [messCurrent, setMessCurrent] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSend, setIsSend] = useState(false); // TRạng thái đã gửi tin hay chưa (dùng để cập nhật dữ liệu tin nhắn thời gian thực).
    const [suggesstion, setSuggesstion] = useState();
    const [dataInput, setDataInput] = useState('');

    useEffect(() => {
        setIsOpen(stateContext.state.isOpenQuickMessage);
    }, [stateContext]);

    useEffect(() => {
        setMessCurrent(message)
    }, [message]);

    useEffect(() => {
        if(stateContext.state.isOpenQuickMessage){
            setSuggesstion(data)
        } else setSuggesstion(undefined)
    }, [data, stateContext]);

    useEffect(() => {
        if(isSend && wsContext.newMessage){
            setMessCurrent(wsContext.newMessage);
        }
    }, [isSend, wsContext]);

    useEffect(() => {
        if(suggesstion?.id && wsContext?.wsState){
            wsContext.wsState.send(JSON.stringify({
                type: 'read-message',
                suggesstion_id: suggesstion.id
            }))
        }
    }, [suggesstion, wsContext]);

    const handleChangeData = (e) => {
        setDataInput(e.target.value);
    }

    const handleSendMessage = (e) => {
        if(e.key==='Enter' && !e.shiftKey){
            e.preventDefault();
            if(dataInput.trim()!=='' && wsContext.wsState && suggesstion?.id){
                wsContext.wsState.send(JSON.stringify({
                    type: 'send-message',
                    suggesstion_id: suggesstion.id,
                    message: dataInput
                }))
                setDataInput('');
                setIsSend(true);
            }
        }
    }

    return(
        <Drawer className="flex flex-col justify-center items-start" closable destroyOnClose title={<p>Tin nhắn nhanh</p>} loading={loading} placement="right" open={isOpen} onClose={() => stateContext.dispatch({ type: 'CLOSE_QUICK_MESSAGE' })} size="default">
            <div className="flex flex-col justify-start items-center overflow-hidden" style={{ border: '1px solid #ccc', width: '330px', height: '86vh' }}>
                {/* Phần đầu */}
                <div className="w-full h-fit flex flex-col justify-start items-start">
                    <span className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold" style={{ fontSize: '16px' }}>Yêu cầu của {suggesstion?.users?.fullname}</span>
                    {wsContext?.usersOnline?.map(items => {
                        if(items?.info?.id===suggesstion?.user_id){
                            return(
                                <div className="flex justify-start items-center w-full gap-2 pb-3" style={{ borderBottom: '1px solid #ccc' }}>
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3fbb46' }}></div>
                                    <span className="inline-block" style={{ transform: 'translateY(-5%)', color: 'gray'}}>Người yêu cầu hiện đang hoạt động</span>
                                </div>
                            )
                        }
                    })}
                </div>

                {/* Phần tin nhắn */}
                <div className="flex-grow w-full min-h-0 overflow-hidden">
                    <div className="flex flex-col-reverse overflow-y-auto w-full h-full gap-2 py-1"
                        style={{ maxHeight: "100%" }}
                    >
                        {messCurrent.length === 0 ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <span className="inline-block">Tạm chưa có tin nhắn.</span>
                            </div>
                        ) : (
                            messCurrent.map(items => (
                                <div className="w-full h-fit flex items-center"
                                    style={{
                                        justifyContent: items.sender_id === userContext?.authState?.user?.id ? "end" : "start",
                                    }}
                                >
                                    <div className="p-2 rounded-2xl"
                                        style={{
                                            maxWidth: "70%",
                                            backgroundColor: items.sender_id === userContext?.authState?.user?.id ? "#4f45ff" : "#f0f0f0",
                                            color: items.sender_id === userContext?.authState?.user?.id ? "white" : "black",
                                        }}
                                    >
                                        {items.message}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Phần cuối */}
                <div className="w-full h-20 flex justify-around items-center" style={{ border: '1px solid blue' }}>
                    <i className="fa-solid fa-file-medical"></i>
                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: '90%'}} value={dataInput} onChange={handleChangeData} onKeyDown={handleSendMessage} />
                </div>
            </div>
        </Drawer>
    )
}

export default QuickMessage;