import { useEffect, useState } from "react";
import { useNoti } from "../contexts/NotiContext";
import { useWsContext } from "../contexts/Websocet";

const ViewNotiJSX = ({ open }) => {
    const notiContext = useNoti();
    const wsContext = useWsContext();

    const [notis, setNotis] = useState([]);
    const [display, setDisplay] = useState('flex');
    const [transY, setTransY] = useState('translateY(100%)');

    useEffect(() => {
        setNotis(notiContext.noti.items);
    }, [notiContext]);

    useEffect(() => {
        if(open){
            setDisplay('flex');
            setTimeout(() => {
                setTransY('translateY(100%)')
            }, 10);
        } else {
            setTransY('translateY(90%)');
            setTimeout(() => {
                setDisplay('none')
            }, 200);
        }
    }, [open]);

    const handleClickNoti = (data) => {
        const direction = data.navigate_to;
        const noti_id = direction.split('/')[3];

        if(noti_id){
            if(wsContext) {
                const wsState = wsContext.wsState;
                if (wsState && wsState.readyState === WebSocket.OPEN) {
                    wsState.send(JSON.stringify({ type: 'is-read-noti', noti_id: data.id, suggesstion_id: parseInt(noti_id) })); 
                } else {
                    console.error("WebSocket is not connected!");
                }
            }

            window.location.href = direction
        }
    }

    return(
        <div className="absolute right-0 bottom-0 bg-white w-96 h-fit flex-col justify-start items-center gap-2 py-3 rounded" style={{ display: display, transform: transY, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', transition: 'all 0.3s ease-in-out' }}>
            {notis.map(items => {
                return(
                    <div className="w-full h-fit px-3 cursor-pointer" style={{ backgroundColor: items.is_read? 'white': '#d1d1d1'}} onClick={() => handleClickNoti(items)}>
                        <span className="inline-block font-semibold" style={{ fontSize: '16px' }}>{items.title}</span>
                        <span className="inline-block w-full h-6 overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '14px' }}>{items.content}</span>
                    </div>
                )
            })}
            {
                notis.length>5?
                <span className="inline-block cursor-pointer">Xem thêm</span>:
                <></>
            }
        </div>
    )
}

export default ViewNotiJSX;