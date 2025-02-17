import React, { createContext, useReducer, useContext, useEffect } from "react";
import authReducer from "../reducers/AuthReducer";
import { getProfile } from "../actions/AuthAction";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem("accessToken") || null,
    loading: false,
    error: null,
  });

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

  return (
    <AuthContext.Provider value={{ authState: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
