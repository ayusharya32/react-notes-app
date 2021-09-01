import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../../redux/actions/noteActions'
import { EDIT_DIALOG } from '../../utils/Constants'
import NoteDialog from '../notedialog/NoteDialog'
import './Note.scss'

function Note({ note }) {
    const dispatch = useDispatch()

    const title = note.title.length > 10 ? `${note.title.substring(0, 9)}..` : note.title
    const description = note.description.length > 80 ? `${note.description.substring(0, 79)}..` : note.description

    function onDeleteButtonClicked(e) {
        dispatch(deleteNote(note._id))
    }

    return (
        <div className="note">
            <div className="note-header">
                <h2 className="title">{title}</h2>
                <div className="btn-container">
                    <NoteDialog dialogType={EDIT_DIALOG} note={note} />
                    <span 
                        onClick={onDeleteButtonClicked}
                        className="btn-delete">
                        <i className="fas fa-trash-alt"></i>
                    </span>
                </div>
            </div>
            <hr />
            <div className="note-description">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Note
