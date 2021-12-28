
import {combineReducers} from 'redux';

import { authReducer } from './authReducer';
import { calendarReducer } from './calendarReducer';
import { uiReducer } from './uiReducer';
//va ser la combinacion de todos los reducers

export  const rootReducer = combineReducers({ // va recibir un objeto
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})