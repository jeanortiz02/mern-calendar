

export const CalendarEvent = ({ event }) => {


    const { title, user } = event;
    // console.log(name);

  return (
    <>
        <strong>{ title }</strong>
        <span> - { user.name }</span>
    
    </>
  )
}
