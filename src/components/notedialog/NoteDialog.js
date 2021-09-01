import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addNote, clearNoteError, updateNote } from '../../redux/actions/noteActions'
import { ADD_DIALOG } from '../../utils/Constants'
import './NoteDialog.scss'

function NoteDialog({ dialogType, note }) {
    const dispatch = useDispatch()
    const noteState = useSelector(state => state.noteState)

    const { loading, error } = noteState

    const [showDialog, setShowDialog] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if(note !== undefined) {
            setTitle(note.title)
            setDescription(note.description)
        }

        if(error !== null) {
            toast.error(error.message)
            dispatch(clearNoteError())
        }

    }, [dispatch, error, note])

    function handleModalClose(e) {
        if(e.target.className === "modal-overlay") {
            setShowDialog(false)
        }
    }

    function onNoteFormSubmitted(e) {
        e.preventDefault()
        console.log("Note form Submitted");

        if(title.trim() === "" || description.trim() === "") {
            return
        }

        if(note !== undefined && 
            title.trim() === note.title.trim() && 
            description.trim() === note.description.trim()
        ) {
            setShowDialog(false)
            return
        }

        if(dialogType === ADD_DIALOG) {
            dispatch(addNote(title, description))
        } else {
            dispatch(updateNote(note._id, title, description))
        }

        setTitle("")
        setDescription("")
        setShowDialog(false)
    }

    const createdAtMarkup = note 
       && <p className="note-created"><strong>
                Created</strong>: {dayjs(note.createdAt).format('MMMM DD, YYYY hh:mm:ss A')} </p>

    return (
        <>
            {(dialogType === ADD_DIALOG) 
                ? <button onClick={() => setShowDialog(true)} className="btn-primary">Add Note</button>
                : <span onClick={() => setShowDialog(true)} className="btn-edit">
                    <i className="fas fa-edit"></i>
                  </span>}

            {showDialog &&
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="note-dialog">
                        <form onSubmit={onNoteFormSubmitted}>
                            { createdAtMarkup }
                            <input 
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                className="title-input" 
                                type="text" 
                                placeholder="Enter Note Title.." 
                                required
                            />
                            <textarea 
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                className="description-input" 
                                placeholder="Enter Note Description.."
                                required
                            >
                            </textarea>
                            <button 
                                className="btn-save-note btn-primary"
                                type="submit"
                                disabled={loading}
                            >
                                Save Note
                            </button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default NoteDialog
