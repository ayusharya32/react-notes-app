import { USER_ERROR, USER_LOADING, LOGIN_SUCCESS, REGISTER_SUCCESS, GET_USER_SUCCESS, USER_LOGOUT, CLEAR_USER_ERROR, CLEAR_USER_SUCCESS } from "../types";

const initialUserState = {
    authToken: localStorage.getItem('token'), 
    isAuthenticated: localStorage.getItem('token') && true,
    successMessage: "",
    error: null
}

export default function userReducer(state = { ...initialUserState }, action) {
    switch(action.type) {
        case USER_LOADING: 
            return {
                ...state,
                loading: true
            }

        case LOGIN_SUCCESS: 
            return {
                ...state,
                authToken: action.payload.accessToken,
                isAuthenticated: true,
                loading: false,
                successMessage: "Logged In Successfully",
            }

        case REGISTER_SUCCESS:
            return {
                ...state,
                authToken: action.payload.accessToken,
                isAuthenticated: true,
                loading: false,
                successMessage: "User Registered Successfully",
            }

        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }   

        case USER_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authToken: null,
                successMessage: "Logged Out Successfully"
            }

        case CLEAR_USER_ERROR:
            return {
                ...state,
                error: null
            }

        case CLEAR_USER_SUCCESS:
            return {
                ...state,
                successMessage: ""
            }

        default:
            return state
    }
}