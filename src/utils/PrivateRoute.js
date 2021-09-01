import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"

function PrivateRoute({ component: Component, ...rest }) {
    const userState = useSelector(state => state.userState)
    const { isAuthenticated, loading } = userState

    return (
        <Route
            {...rest}
            render={ props => {
                return (isAuthenticated && !loading) ? <Component {...props} /> : <Redirect to="/login" />
            }}
        />
    )
}

export default PrivateRoute
