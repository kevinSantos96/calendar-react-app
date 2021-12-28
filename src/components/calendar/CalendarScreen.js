import React, { useEffect, useState } from 'react';
import {Calendar,momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';//nos importa un hook


import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteeventFab } from '../ui/DeleteeventFab';


const localizer = momentLocalizer(moment); 
moment.locale('es');




export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);// tomamos el valor desde nuestro store
    const {uid} = useSelector(state => state.auth);

    const [lastView, setlastView] = useState(localStorage.getItem('lastView')|| 'month')

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

    const onDoubleClick=(e)=>{//para realizar un modal y se muestren los eventos
        dispatch(uiOpenModal());//llamamos el dispatch de nuestra accion para abrir el modal
    }

    // ABRIR Y SELECCIONAR EL EVENTO
    const onSelectEvent=(e)=>{//un click normal y poder borrarlo
        dispatch(eventSetActive(e));
        
    }
    const onViewChange = (e)=>{ //grabar en el localstorage el ultimo lugar
        setlastView(e);
        localStorage.setItem('lastView',e);
    }
    const onSelecSlot = (e)=>{
        dispatch(eventClearActiveEvent())
    }

    const eventsrylesGetter =(event, start, end, isSelected)=>{// tomamos los eventos para su personalizacion

        console.log(event)
        const style ={
            backgroundColor:(uid === event.user._id)? '#068DFF':'#FA7783', //si es distiento muestra de otro color
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
          
        }

        return{
            style
        }
    };
    return (
        <div className='calendar-screen'>
           <Navbar/>


           <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventsrylesGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            onSelectSlot={ onSelecSlot }
            selectable={true}
            view={lastView}
            components={{
                event: CalendarEvent
            }}
            />
            <AddNewFab />

            {
                (activeEvent) && (<DeleteeventFab/>) // si no esta en null muestra el boton
            }
           
            <CalendarModal />

            
        </div>
    )
}
