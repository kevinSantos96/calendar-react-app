import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { starChecking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { PrivateRouter } from './PrivateRouter'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
    
    const dispatch = useDispatch();
    const {checking, uid } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(starChecking());//saber si la persona sigue autenticada
    }, [dispatch])
//Proteger Rutas
    if(checking){
        return (<h5>Espere...</h5>)
    }


    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/login" element={<PublicRoute isAuth={!!uid}>
                    <LoginScreen/>
                </PublicRoute>
                }/>
                <Route path="/" element={<PrivateRouter isAuth={!!uid}>
                   < CalendarScreen/> 
                </PrivateRouter>
                }/>

                <Route path ="*" element= {<h1>Error 404</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}
