import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { clearUserError, clearUserSuccess, registerUser } from '../../redux/actions/userActions'
import './Register.scss'

function Register({ history }) {
    const dispatch = useDispatch()
    const userState = useSelector(state => state.userState)

    const { isAuthenticated, loading, error, successMessage } = userState

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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

    function onRegisterFormSubmitted(e) {
        e.preventDefault()

        if(password !== confirmPassword) {
            toast.dismiss()
            toast.error("Passwords do not match")
            return
        }

        dispatch(registerUser(name, email, password))
    }

    function getAuthErrorMessage(err) {
        if('message' in err) {
            return err.message
        }
        return `${err.name || ""} ${err.email || ""} ${err.password || ""}`
    }

    return (
        <div className="register">
            {loading ? <Loader /> :
                <div className="register-content">
                    <h1>Notes App</h1>
                    <form onSubmit={onRegisterFormSubmitted}>
                        <input 
                            onChange={(e) => {
                                setName(e.target.value)
                            }} 
                            value={name} 
                            type="text" 
                            name="name" 
                            required
                            placeholder="Name" 
                        />                
                        <input 
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                            type="email" 
                            name="email" 
                            required
                            placeholder="Email" 
                        />                
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password} 
                            type="password" 
                            name="password" 
                            required
                            placeholder="Password" 
                        />
                        <input 
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}
                            value={confirmPassword}
                            type="password" 
                            name="confirmPassword"
                            required
                            placeholder="Confirm Password" 
                        />
                        <button disabled={loading} className="btn-primary" type="submit">Register</button>                
                    </form>
                </div>
            }
        </div>
    )
}

export default Register
