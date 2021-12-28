// import { useContext } from "react"
import { Navigate } from "react-router-dom"
// import { AuthContext } from "../auth/authContext"



export const PrivateRouter = ({isAuth ,children}) => {

//     const{user}=useContext(AuthContext)
    
//    const location = useLocation();
//    const {pathname, search} = location

//    localStorage.setItem('lastPath',pathname + search); //guardar la ruta actual en el lcoalStorage


    // return user.logged ? children: <Navigate to="/login"/>
    if(isAuth){
        return children;
    }else{
        return  <Navigate to="/login"/>
        
    }
}
