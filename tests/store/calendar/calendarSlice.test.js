
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarState';
import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from './../../../src/store/calendar/calendarSlice';

describe('Pruebas en el calendarSlice', () => {
    

    test('Debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();

        expect( state ).toEqual(
            initialState
        )
    });


    test('onSetActiveEvent debe de activar el evento', () => {
        
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0]) );
        expect( state.activeEvent ).toEqual( events[0] );
    });


    test('onAddNewEvent debe agregar un nuevo evento', () => {
        
        const newEvent = {
            id: '3',
            start: new Date('2024-07-30 13:00:00'),
            end: new Date('2024-07-30 16:00:00'),
            title: 'Insertando un nuevo evento',
            notes: 'Probando las notas',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent) );
        expect( state.events ).toEqual( [ ...events, newEvent ]);
    });

    test('onUpdatedEvent debe actualizar el evento', () => {
        
        const updateEvent = {
            id: '1',
            start: new Date('2024-06-31 13:00:00'),
            end: new Date('2024-06-31 16:00:00'),
            title: 'Actualizando el evento',
            notes: 'Probando las notas nuevas',
        }

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updateEvent) );
        expect( state.events ).toContain( updateEvent );
        // console.log( state );
    });

    test('onDeleteEvent debe de borrar el elemento Activo', () => {
        
        const state = calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent( ) );
        // console.log( state );
        expect( state.activeEvent ).toBe( null );
        expect( state.events ).not.toContain( events[0] );
    });


    test('onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer( initialState, onLoadEvents( events ));
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual( events);
    });


    test('onLogoutCalendar debe Limpiar el estado', () => {
        let state = calendarSlice.reducer( calendarWithActiveEventsState, onLogoutCalendar( ) );

        // console.log( state );
        expect( state ).toEqual( initialState );
    });
});