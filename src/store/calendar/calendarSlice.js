

import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = 
{
    _id: new Date().getTime(),
    title: 'Happy birthay of the boss',
    notes: 'There that buy the cookies',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#FFFFFF',
    user: {
      _id: '123',
      name: 'Jean Carlos'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: ( state, { payload } )=> {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload } )=> {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload } )=> {
            state.events = state.events.map( event => {
                    if ( event._id === payload._id ) {
                        return payload;
                    }
                return event;
            })
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } = calendarSlice.actions;