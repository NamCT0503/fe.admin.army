import { createContext, useContext, useEffect, useReducer } from "react";
import { initNotiReducer, notiReducer } from "../reducers/noti";
import { useAuthContext } from "./UserContext";

const notiContext = createContext();

export const NotiProvider = ({ children }) => {
    // const userContext = useAuthContext();

    const [noti, dispatch] = useReducer(notiReducer, initNotiReducer);

    return(
        <notiContext.Provider value={{ noti, dispatch }}>
            { children }
        </notiContext.Provider>
    )
}

export const useNoti = () => useContext(notiContext);