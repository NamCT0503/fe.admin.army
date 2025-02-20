import { useEffect, useState } from "react";
import { getMessageLatestOfAllSuggesstion } from "../../api/message";
import { useAuthContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useWsContext } from "../../contexts/Websocet";

const MenuChatJSX = () => {
    const { authState } = useAuthContext();
    const wsContext = useWsContext();

    const [data, setData] = useState([]); // Dữ liệu tin các tin nhăn mới nhất.
    const [chatCurrent, setChatCurrent] = useState(null);

    const navigate = useNavigate();

    const fetchLatestMessage = async (page, limit) => {
        const res = await getMessageLatestOfAllSuggesstion(page, limit);
        if(res && res?.status===200){
            setData(res.metadata.records);
        }
    }

    useEffect(() => {
        fetchLatestMessage(1, 10);
    }, [wsContext.newMessage]);

    const handleClickChat = (data) => {
        setChatCurrent(data.id);
        navigate('/tin-nhan', { state: data.id });
    }

    return(
        <div className="flex flex-col justify-start items-center gap-2 overflow-y-auto" style={{ gridArea: 'menu', border: '1px solid red', height: '100%' }}>
            <div className="w-full flex justify-start items-center cursor-pointer" onClick={() => navigate('/de-nghi-nhu-cau')}>
                <span className="inline-block font-semibold">&lt; Quay lại</span>
            </div>

            {/* Phần menu chat */}
            {data.map(items => {
                const sender = items?.messages[0]?.users?.fullname?.split(' ');
                const isRead = items?.messages[0]?.is_read;
                return(
                    <div className="w-full h-20 flex flex-col justify-center items-start gap-2 cursor-pointer" style={{ border: '1px solid #ccc', backgroundColor: chatCurrent===items.id? '#ccc': 'white' }} onClick={() => handleClickChat(items)}>
                        <span className="inline-block font-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap">Yêu cầu số {items?.id} ({items.users.fullname})</span>
                        <span 
                            className="inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap"
                            style={{
                                fontWeight: (items?.messages[0]?.sender_id!==authState.user.id && isRead===false)? '600': 'normal'
                            }}
                        >
                            {
                                items?.messages[0]?.sender_id===authState.user.id?
                                `Bạn: ${items?.messages[0]?.message}`:
                                sender?.length>0? `${sender.slice(2)?.length!==0? sender.slice(2): sender.slice(0)}: ${items?.messages[0]?.message}`:
                                'Tạm chưa có tin nhắn.'
                            }
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default MenuChatJSX;