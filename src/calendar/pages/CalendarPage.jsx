import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { useCalendarStore, useUiStore } from '../../hooks';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers';
import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from '../'


export const CalendarPage = () => {


  const { events, setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore()
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');


  const eventStyleGetter = ( event, start, end, isSelected )=> {
    // console.log( { event, start, end, isSelected })

    const style = {
      backgroundColor: '#347CD7',
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


    </>
  )
}
