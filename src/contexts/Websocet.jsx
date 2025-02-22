import { createContext, useContext, useEffect, useState } from "react";
import { WS_HOST } from "../api/websocket";
import { useNoti } from "./NotiContext";
import { useAuthContext } from "./UserContext";

const wsContext = createContext();

export const WsProvider = ({ children }) => {
    const notiContext = useNoti();
    const { authState } = useAuthContext();

    const [websocket, setWebsocket] = useState();
    const [usersOnline, setUsersOnline] = useState([]);
    const [newMessage, setNewMessage] = useState([]);

    useEffect(() => {
        if(!authState.token) return;

        setTimeout(() => {
            const socket = new WebSocket(`${WS_HOST}?token=${authState.token}`);
            socket.onopen = () => console.log('Connected to Websocket!');
            socket.onmessage = async (event) => {
                // console.log('Message revice: ', event);
                const data = JSON.parse(event.data);
                if(data.type==='revice-noti'){
                    const messages = data.message;
                    notiContext.dispatch({ type: 'LOAD_NOTI', payload: { items: messages, no_read: messages.length } })
                }
                if(data.type==='users-online'){
                    setUsersOnline(data.message);
                }
                if(data.type==='new-message'){
                    setNewMessage(data.message);
                }
            }
            socket.onclose = () => console.log('Disconnected to Websocket!');

            setWebsocket(socket);
        }, 3000)
    }, [authState.token]);

    return(
        <wsContext.Provider value={{ wsState: websocket, usersOnline, newMessage }}>
            { children }
        </wsContext.Provider>
    )
}

export const useWsContext = () => useContext(wsContext);