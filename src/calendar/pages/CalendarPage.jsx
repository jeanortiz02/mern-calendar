import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer, getMessagesES } from '../../helpers';
import { addHours } from 'date-fns';
import { Navbar } from '../'


const events = [{
  title: 'Happy birthay of the boss',
  notes: 'There that buy the cookies',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#FFFFFF',
  user: {
    _id: '123',
    name: 'Jean Carlos'
  }
}]


export const CalendarPage = () => {


  const eventStyleGetter = ( event, start, end, isSelected )=> {
    console.log( { event, start, end, isSelected })

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

  return (
    <>

    <Navbar/>

    <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={ getMessagesES() }
      eventPropGetter={ eventStyleGetter }
    />



    </>
  )
}
