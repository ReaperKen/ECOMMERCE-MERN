import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "ERROR":
      return {
        user: JSON.parse(localStorage.getItem("user")) || null,
        error: action.payload,
        loading: false,
      };
    case "LOADING":
      return {
        loading: true,
      };
    case "SUCCESS":
      return {
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
        logged: false,
      };

    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
