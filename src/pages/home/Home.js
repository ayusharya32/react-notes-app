import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Navbar from '../../components/navbar/Navbar'
import Note from '../../components/note/Note'
import { clearNoteError, clearNoteSuccess, getUserNotes, searchNotes } from '../../redux/actions/noteActions'
import Loader from '../../components/loader/Loader'

function Home({ location }) {
    const dispatch = useDispatch()
    const noteState = useSelector(state => state.noteState)

    const keyword = location.search !== "" ? new URLSearchParams(location.search).get("keyword") : ""

    const { notes, loading, error, successMessage } = noteState

    useEffect(() => {
        if(keyword === "") {
            dispatch(getUserNotes())
        } else {
            dispatch(searchNotes(keyword))
        }

    }, [dispatch, keyword])

    useEffect(() => {
        if(error !== null) {
            toast.error(error.message)
            dispatch(clearNoteError())
        }
    
        if(successMessage !== "") {
            toast.success(successMessage)
            dispatch(clearNoteSuccess())
        }

    }, [dispatch, error, successMessage])

    const notesMarkup = !loading && notes 
        && notes.map(note => <Note key={note._id} note={note} />)

    return (
        <section className="section-home">
            <Navbar />
            <section className="notes">
                {loading ? <Loader /> : notes && notes.length === 0 ? 
                <h1 className="empty-notes">No Notes</h1> :
                <div className="container">
                    {notesMarkup}
                </div>}
            </section>
        </section>
    )
}

export default Home
