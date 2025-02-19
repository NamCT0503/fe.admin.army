import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import authReducer from "../reducers/AuthReducer";
import { getProfile } from "../actions/AuthAction";
import { WS_HOST } from "../api/websocket";
import { useNoti } from "./NotiContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const notiContext = useNoti();

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem("accessToken") || null,
    loading: false,
    error: null,
  });
  const [websoket, setWebsocket] = useState();   

  useEffect(() => {
    const fetchProfile = async () => {
      if (!state.token) return;
      try {
        await getProfile(dispatch); 
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
      const socket = new WebSocket(`${WS_HOST}?token=${state.token}`);
      socket.onopen = () => console.log('Connected to Websocket!');
      socket.onmessage = async (event) => {
          console.log('Message revice: ', event);
          const data = JSON.parse(event.data);
          if(data.type==='revice-noti'){
            const messages = Array.isArray(data.message) ? data.message : [data.message];
            notiContext.dispatch({ type: 'LOAD_NOTI', payload: { items: messages, no_read: messages.length } })
          }
      }
      socket.onclose = () => console.log('Disconnected to Websocket!');

      setWebsocket(socket);

      // return () => { socket.close() }
  }, []);

  return (
    <AuthContext.Provider value={{ authState: state, dispatch, wsState: websoket }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);