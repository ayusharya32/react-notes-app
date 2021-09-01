import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { clearUserError, clearUserSuccess, loginUser } from '../../redux/actions/userActions'
import './Login.scss'

function Login({ history }) {
    const dispatch = useDispatch()
    const userState = useSelector(state => state.userState)

    const { isAuthenticated, loading, error, successMessage } = userState

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(isAuthenticated) {
            history.push("/")
        }

        if(error !== null) {
            toast.error(getAuthErrorMessage(error))
            dispatch(clearUserError())
        }

        if(successMessage !== "") {
            toast.success(successMessage)
            dispatch(clearUserSuccess())
        }
    }, [dispatch, isAuthenticated, error, successMessage, history])

    function onLoginFormSubmitted(e) {
        e.preventDefault()

        dispatch(loginUser(email, password))
    }

    function getAuthErrorMessage(err) {
        if('message' in err) {
            return err.message
        } 
        
        return `${err.name || ""} ${err.email || ""} ${err.password || ""}`
    }

    return (
        <div className="login">
            {loading ? <Loader /> :
            (<>
                <div className="login-content">
                    <h1>Notes App</h1>
                    <form onSubmit={onLoginFormSubmitted}>            
                        <input 
                            onChange={(e) => {
                                toast.dismiss()
                                setEmail(e.target.value)
                            }}
                            value={email}
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            required
                            disabled={loading}
                        />                
                        <input
                            onChange={(e) => {
                                toast.dismiss()
                                setPassword(e.target.value)
                            }}
                            value={password} 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            required
                            disabled={loading}
                        />
                        <button disabled={loading} className="btn-primary" type="submit">Log In</button>                
                    </form>
                </div>
                <div className="sign-up">
                    <p>
                        Don't have an account? 
                        <Link disabled={loading} to="/register">Sign up</Link>
                    </p>
                </div>
            </>
            )}
        </div>
    )
}

export default Login
