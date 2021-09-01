import axios from "axios"
import { jsonContentTypeConfig, removeTokenHeader, setTokenHeader } from "../../utils/AxiosUtils"
import { USER_ERROR, USER_LOADING, LOGIN_SUCCESS, REGISTER_SUCCESS, GET_USER_SUCCESS, USER_LOGOUT, CLEAR_USER_ERROR, CLEAR_USER_SUCCESS } from "../types"

export const registerUser = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_LOADING })
    const requestBody = { name, email, password }

    try {
        const res = await axios.post("/api/auth/register", requestBody, jsonContentTypeConfig)
        dispatch({ type: REGISTER_SUCCESS, payload: res.data })

        localStorage.setItem("token", res.data.accessToken)
        setTokenHeader()

    } catch(err) {
        dispatch({
            type: USER_ERROR,
            payload: err.response.data
        })
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOADING })
    const requestBody = { email, password }

    try {
        const res = await axios.post("/api/auth/login", requestBody, jsonContentTypeConfig)

        dispatch({ type: LOGIN_SUCCESS, payload: res.data })

        localStorage.setItem("token", res.data.accessToken)
        setTokenHeader()
        
    } catch(err) {
        dispatch({
            type: USER_ERROR,
            payload: err.response.data
        })
    }
}

export const getCurrentUser = () => async (dispatch) => {
    dispatch({ type: USER_LOADING })

    try {
        const res = await axios.get("/api/auth/user")

        dispatch({ type: GET_USER_SUCCESS, payload: res.data })

    } catch(err) {
        dispatch({
            type: USER_ERROR,
            payload: err.response.data
        })
    }
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem("token")
    removeTokenHeader()

    dispatch({ type: USER_LOGOUT })
}

export const clearUserError = () => (dispatch) => {
    dispatch({ type: CLEAR_USER_ERROR })
}

export const clearUserSuccess = () => (dispatch) => {
    dispatch({ type: CLEAR_USER_SUCCESS })
}
