// import  { useContext } from 'react'
import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../auth/authContext'

export const PublicRoute = ({isAuth,children}) => {
    // const{user} = useContext(AuthContext);

    return isAuth? <Navigate to="/"/>: children
}
