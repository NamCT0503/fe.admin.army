import { createContext, useContext, useEffect, useReducer } from "react";
import { initStateReducer, stateReducer } from "../reducers/state";

const stateContext = createContext();

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, initStateReducer);

    useEffect(() => {
        dispatch({ type: 'LOAD_STATE' });
    }, []);

    return(
        <stateContext.Provider value={{ state, dispatch }}>
            { children }
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);