const initialState = {
    user: null,
    token: null,
    error: null,
    loading: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return { ...state, loading: true, error: null };
      case "LOGIN_SUCCESS":
        return { ...state, loading: false, token: action.payload, error: null };
      case "LOGIN_ERROR":
        return { ...state, loading: false, error: action.payload };
      case "LOGOUT":
        return { ...state, user: null, token: null };
      case "SET_USER":
        return { ...state, user: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;