import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';//nos importa un hook
import { uiCloseModal } from '../../actions/ui';
import {  eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';
//para centrar el modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');//nuestro elemento del index


  const now = moment().minutes(0).second(0).add(1,'hours');//nos da una hora exacta mas de la actua;
  const ending = now.clone().add(1,'hours');

  const initevent={
    title:'',
    notes:'',
    start: now.toDate(),
    end: ending.toDate()
}

export const CalendarModal = () => {
    
    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar);

 
    const [dateStart, setdateStart] = useState(now.toDate());//hora inicio
    const [dateEnd, setdateEnd] = useState(ending.toDate());//hora fin
    const [titleValid, settitleValid] = useState(true)

    const [formValues, setformValues] = useState(initevent);

    const { notes, title, start, end } = formValues;


    useEffect(() => {//para seleccionar el efectyo de la nota actual
        if(activeEvent){
            setformValues(activeEvent);
        }else{
            setformValues(initevent);
        }

    }, [activeEvent,setformValues])
    


    const handleInputChange = ({target})=>{
        setformValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = ()=>{
       
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setformValues(initevent);
       
    }

    const handleStarDateChange =(e)=>{
        setdateStart(e);
        setformValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e)=>{
        setdateEnd(e);
        setformValues({
            ...formValues,
            end: e
        })
    }
    //enviar el formulario a la base
    const handleSubmitForm = (e)=>{
            e.preventDefault();
           
            //comparacion de fechas
            const momentStar = moment(start);
            const momentEnd = moment(end);

            if( momentStar.isSameOrAfter(momentEnd)){
               Swal.fire('Oops','La fecha de fin debe ser mayor a la fecha de inicio','error');
                return;
            }

            if(title.trim().length<2){
                return settitleValid(false);
            }
            if (activeEvent){
                dispatch(eventStartUpdate(formValues))
            }else{
                dispatch(eventStartAddNew(formValues));
            }
            
            settitleValid(true);
            closeModal();

        }

    return (
        <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
        >
            {
                (activeEvent)?(<h1>Editar Evento</h1>):(<h1>Nuevo Evento</h1>)
            }
            <hr />
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                    onChange={handleStarDateChange}
                    value={dateStart}
                    className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                    onChange={handleEndDateChange}
                    value={dateEnd}
                    minDate={dateStart}
                    className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
