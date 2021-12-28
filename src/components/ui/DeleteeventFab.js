import React from 'react'
import { useDispatch } from 'react-redux';//nos importa un hook
import {  eventStartDelete } from '../../actions/events';
import Swal from 'sweetalert2'

export const DeleteeventFab = () => {

    const dispatch = useDispatch()

    const handleDelete = ()=>{
        dispatch(eventStartDelete());
        Swal.fire('Eliminado','','success');
    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDelete}
        >
            <i className='fas fa-trash'></i>
            <span> Borrar Evento </span>
        </button>
    )
}
