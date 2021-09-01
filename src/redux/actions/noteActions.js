import axios from "axios"
import { setTokenHeader } from "../../utils/AxiosUtils";
import { ADD_NOTE, CLEAR_NOTE_ERROR, CLEAR_NOTE_SUCCESS, NOTE_ERROR, NOTE_LOADING, REMOVE_NOTE, SET_NOTES, UPDATE_NOTE } from "../types"

export const getUserNotes = () => async (dispatch) => {
    dispatch({ type: NOTE_LOADING })

    setTokenHeader()
    try {
        const res = await axios.get("/api/notes")

        dispatch({ type: SET_NOTES, payload: res.data})
    } catch(err) {

        dispatch({
            type: NOTE_ERROR,
            payload: err.response.data
        })
    }
}

export const searchNotes = (keyword) => async (dispatch) => {
    dispatch({ type: NOTE_LOADING })

    setTokenHeader()
    try {
        const res = await axios.get(`/api/notes/search?searchQuery=${keyword}`)
        dispatch({ type: SET_NOTES, payload: res.data})

    } catch(err) {

        dispatch({
            type: NOTE_ERROR,
            payload: err.response.data
        })
    }
}

export const addNote = (title, description) => async (dispatch) => {
    dispatch({ type: NOTE_LOADING })

    setTokenHeader()
    const requestBody = { title, description }
    try {
        const res = await axios.post("/api/notes", requestBody)

        dispatch({ type: ADD_NOTE, payload: res.data})
    } catch(err) {
        dispatch({
            type: NOTE_ERROR,
            payload: err.response.data
        })
    }
}

export const deleteNote = (noteId) => async (dispatch) => {
    dispatch({ type: NOTE_LOADING })

    setTokenHeader()
    try {
        await axios.delete(`/api/notes/${noteId}`)
        dispatch({ type: REMOVE_NOTE, payload: noteId })

    } catch(err) {
        dispatch({
            type: NOTE_ERROR,
            payload: err.response.data
        })
    }
}

export const updateNote = (noteId, title, description) => async (dispatch) => {
    dispatch({ type: NOTE_LOADING })

    setTokenHeader()
    const requestBody = { noteId, title, description }
    try {
        const res = await axios.put("/api/notes", requestBody)

        dispatch({ type: UPDATE_NOTE, payload: res.data.note })
    } catch(err) {

        dispatch({
            type: NOTE_ERROR,
            payload: err.response.data
        })
    }
}

export const clearNoteError = () => (dispatch) => {
    dispatch({ type: CLEAR_NOTE_ERROR })
}

export const clearNoteSuccess = () => (dispatch) => {
    dispatch({ type: CLEAR_NOTE_SUCCESS })
}