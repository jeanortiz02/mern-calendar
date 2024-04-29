
export const events = [
    {
        id: '1',
        start: new Date('2024-04-30 13:00:00'),
        end: new Date('2024-04-30 16:00:00'),
        title: 'My happy birthday',
        notes: 'Cotizar el pastel',
    }, 

    {
        id: '2',
        start: new Date('2024-06-30 13:00:00'),
        end: new Date('2024-06-30 16:00:00'),
        title: 'Happy birthday of my baby',
        notes: 'Hablar con la familia',
    }, 

]

export const initialState = {
    isLoadingEvents: true,
        events: [],
        activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: true,
        events: [ ...events ],
        activeEvent: null
}

export const calendarWithActiveEventsState = {
    isLoadingEvents: true,
        events: [ ...events ],
        activeEvent: { ...events[0] }
}