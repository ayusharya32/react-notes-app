import { ADD_NOTE, CLEAR_NOTE_ERROR, CLEAR_NOTE_SUCCESS, NOTE_ERROR, NOTE_LOADING, REMOVE_NOTE, SET_NOTES, UPDATE_NOTE } from "../types"

const noteInitialState = {
    notes: [],
    loading: false,
    successMessage: "",
    error: null
}

export default function noteReducer(state = { ...noteInitialState }, action) {
    switch(action.type) {
        case NOTE_LOADING: 
            return {
                ...state,
                loading: true
            }

        case SET_NOTES:
            return {
                ...state,
                loading: false,
                notes: action.payload
            }

        case ADD_NOTE:
            return {
                ...state,
                notes: [action.payload.note, ...state.notes],
                loading: false,
                successMessage: "Note Added Successfully"
            }

        case REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload),
                loading: false,
                successMessage: "Note Deleted Successfully"
            }
        
        case UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note => {
                    if(note._id === action.payload._id) {
                        return action.payload
                    }
                    return note
                }),
                loading: false,
                successMessage: "Note Updated Successfully"
            }

        case NOTE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_NOTE_ERROR:
            return {
                ...state,
                error: null
            }

        case CLEAR_NOTE_SUCCESS:
            return {
                ...state,
                successMessage: ""
            }
        default:
            return state
    }
}