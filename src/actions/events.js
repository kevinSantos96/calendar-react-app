import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepararEvents } from "../helpers/prepararEvents";
import { types } from "../types/types";

//add nuevo evento

export const eventStartAddNew = (evento)=>{
    return async (dispatch, getState)=>{

        const {uid, name}= getState().auth
        
        try {
            const resp = await fetchConToken('events',evento,'POST');
            const body = await resp.json();

            if(body.ok){
                evento.id = body.evento.id;
                evento.user={
                    _id: uid, //asignamos el id del usuario
                    name: name
                }
                console.log(evento);
                dispatch(eventAddNew(evento));
                
            }

        } catch (error) {
            console.log(error)
        }
    }
}


 const eventAddNew =(event) =>({
    type: types.eventAddNew,
    payload: event
});

//activar event
export const eventSetActive =(event) =>({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent=()=>({
    type: types.eventClearActiveNow
});

//actualizar evento
export const eventStartUpdate=(event)=>{
    return async(dispatch)=>{

        try {
           
            const resp = await fetchConToken(`events/${event.id}`,event,'PUT')
            const body = await resp.json();

            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}


const eventUpdated=(event)=>({
    type: types.eventUpdate,
    payload: event
});


export const eventStartDelete = ()=>{
    return async( dispatch, getState)=>{

        const {id} = getState().calendar.activeEvent;
        console.log(id)
        try {
           
            const resp = await fetchConToken(`events/${id}`,{},'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDelete());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}

const eventDelete=()=>({
    type: types.eventDeleted
});

export const eventStartLoading = ()=>{
    return async (dispatch) =>{
        try {
            
            const resp = await fetchConToken('events');
            const body = await resp.json();

            const events = prepararEvents(body.eventos);

            dispatch(eventLoaded(events));

        } catch (error) {
            console.log(error)
        }
    }
}

const eventLoaded = (eventos)=>({
    type: types.eventLoaded,
    payload: eventos
})

export const eventLogout =()=>({type: types.eventLogout})