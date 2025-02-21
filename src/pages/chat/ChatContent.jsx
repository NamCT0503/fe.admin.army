import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListMessage } from "../../api/message";
import { useWsContext } from "../../contexts/Websocet";
import { useAuthContext } from "../../contexts/UserContext";
import { Input } from "antd";

const ChatContentJSX = () => {
    const wsContext = useWsContext();
    const userContext = useAuthContext();

    const [messages, setMessages] = useState([]);
    const [dataInput, setDataInput] = useState('');
    const [isSend, setIsSend] = useState(false);

    const { state } = useLocation(); // Suggesstion_id.

    useEffect(() => {
        if(!state) return;

        const fetcher = async (suggesstion_id, page, limit) => {
            const res = await getListMessage(suggesstion_id, limit, page);
            if(res && res?.status===200){
                setMessages(res.metadata.records);
            }
        }

        fetcher(state, 1, 15);
    }, [state]);

    useEffect(() => {
        if(wsContext.newMessage){
            setMessages(wsContext.newMessage);
        }
    }, [wsContext.newMessage]);

    useEffect(() => {
        if(isSend && wsContext.newMessage){
            setMessages(wsContext.newMessage);
        }
    }, [isSend, wsContext]);

    useEffect(() => {
        if(state && wsContext?.wsState?.readyState===WebSocket.OPEN){
            wsContext.wsState.send(JSON.stringify({
                type: 'read-message',
                suggesstion_id: state
            }))
        }
    }, [state, wsContext]);

    const handleChangeData = (e) => {
        setDataInput(e.target.value);
    }

    const handleSendMessage = (e) => {
        if(e.key==='Enter' && !e.shiftKey){
            e.preventDefault();
            if(dataInput.trim()!=='' && wsContext.wsState && state){
                wsContext.wsState.send(JSON.stringify({
                    type: 'send-message',
                    suggesstion_id: state,
                    message: dataInput
                }))
                setDataInput('');
                setIsSend(true);
            }
        }
    }

    return(
        <div className="overflow-y-scroll flex flex-col justify-start items-center" style={{ gridArea: 'chat', border: '1px solid blue', height: '100%', minHeight: 0 }}>
            {
                state?
                <div className="w-full h-full flex flex-col justify-start items-center">
                    {/* Phần nội dung nhắn tin */}
                    {/* <div className="w-full grow" style={{ border: '1px solid green' }}>
                        {messages.map(items => {
                            return(
                                <div>
                                    {items?.message}
                                </div>
                            )
                        })}
                    </div> */}
                    <div className="w-full grow flex flex-col-reverse justify-end items-center gap-3 py-2" style={{ border: '1px solid green' }}>
                        {messages.length>0? messages.map(items => {
                            return(
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
                            )
                        }):
                        <div className="w-full h-full flex justify-center items-center">
                            <span>Đề nghị này chưa có tin nhắn nào.</span>
                        </div>}
                    </div>

                    {/* Phần nhắn tin */}
                    <div className="w-full h-14 flex flex-col justify-center items-center" style={{ border: '1px solid red' }}>
                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} style={{ width: '90%'}} value={dataInput} onChange={handleChangeData} onKeyDown={handleSendMessage} />
                    </div>

                </div>:
                <div className="w-full h-full flex justify-center items-center">
                    <span className="inline-block">Click chuột vào đề nghị phía menu bên phải để bắt đầu <b>CHAT.</b></span>
                </div>
            }
        </div>
    )
}

export default ChatContentJSX;