import { useState, useEffect } from 'react';
import { Calendar } from 'react-big-calendar';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers';
import { CalendarEvent, CalendarModal, FabAddNew, Navbar, FabDelete } from '../'


export const CalendarPage = () => {


  const { user  } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();
  const { openDateModal, isDateModalOpen } = useUiStore()
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');


  const eventStyleGetter = ( event, start, end, isSelected )=> {
    // console.log( { event, start, end, isSelected })

    const isMyEvent = ( user.uid === event.user._id) || (user.uid === event.user.uid )

    // console.log( event );
    const style = {
      backgroundColor: isMyEvent? '#347CD7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }


    return {
      style
    }
  }

  const onDoubleClick = ( event )=> {
    // console.log( { doubleClick: event } )
    openDateModal()
  }
  const onSelect = ( event )=> {
    // console.log( { click: event } )
    setActiveEvent(event)
  }
  const onViewChanged = ( event )=> {
    localStorage.setItem('lastView', event);
    // console.log( { viewChanged: event } )
  }


  useEffect(() => {
    startLoadingEvent()
  }, [])
  

  return (
    <>

    <Navbar/>

    <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={ lastView }
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={ getMessagesES() }
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={ onDoubleClick}
      onSelectEvent={ onSelect}
      onView={ onViewChanged}

      />

    
      <CalendarModal/>

      <FabAddNew/>
      {isDateModalOpen? '' : <FabDelete/>}


    </>
  )
}
