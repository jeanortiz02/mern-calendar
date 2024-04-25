import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';


export const useCalendarStore = () => {


    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar )
    const { user } = useSelector( state => state.auth )

    const setActiveEvent = ( calendarEvent )=> {
      dispatch( onSetActiveEvent( calendarEvent ) )
    }


    const startSavingEvent = async( calendarEvent )=> {

      // TODO: Update Event 
      
      try {
        if ( calendarEvent.id) {

          // TODO: Actualizando
          await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
          dispatch( onUpdateEvent( { ...calendarEvent, user } ) );
          return; 
        }
     
        // Creando 
        const { data } = await calendarApi.post('/events', calendarEvent)
        // console.log( {data} );
        dispatch( onAddNewEvent( {...calendarEvent, id: data.evento.id, user } ) );

      } catch (error) {
        console.log( error );
        Swal.fire('Error al guardar', error.response.data.msg, 'error' );
      }
      
    };


    const startDeletingEvent =  async()=> {


      try {
        if ( activeEvent.id) {

          // TODO: Actualizando
          await calendarApi.delete(`/events/${ activeEvent.id }`);
          await calendarApi.get('/events')
          dispatch( onDeleteEvent() )
          return; 
        }
     

      } catch (error) {
        console.log( error );
        Swal.fire('Error al Eliminar', error.response.data.msg, 'error' );
      }

    }




    const startLoadingEvent = async() => {

      try {
        const { data } = await calendarApi.get('/events');
        const event = convertEventsToDateEvents(data.eventos );
        dispatch( onLoadEvents(event) );

      } catch (error) {
          console.log( 'Error cargar eventos' );
          console.log( error );
      }
    }


  return {

    //* Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvent,

  }
}
