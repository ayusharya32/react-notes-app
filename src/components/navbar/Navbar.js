import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logOut } from '../../redux/actions/userActions'
import { ADD_DIALOG } from '../../utils/Constants'
import NoteDialog from '../notedialog/NoteDialog'
import './Navbar.scss'

function Navbar() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [keyword, setKeyword] = useState('')

    function onLogoutButtonClicked() {
        dispatch(logOut())
    }

    function onSearchFormSubmitted(e) {
        e.preventDefault()
        
        if(keyword.trim() === "") {
            const isKeywordQuery = new URLSearchParams(window.location.search).get("keyword")

            if(isKeywordQuery !== null) {
                history.push("/")
            }
            return
        }

        history.push(`/?keyword=${keyword}`)
    }

    return (
        <header>
            <nav>
                <div className="nav-left">
                    <h1>Notes App</h1>
                </div>
                <div className="nav-center">
                    <form onSubmit={onSearchFormSubmitted}>
                        <input 
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                            type="text" 
                            placeholder="Search.." 
                        />
                        <button className="btn-primary" type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
                <div className="nav-right">
                    <NoteDialog dialogType={ADD_DIALOG} />
                    <button onClick={onLogoutButtonClicked} className="btn-primary">Log Out</button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
