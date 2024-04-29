import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

jest.mock('../../../src/hooks/useCalendarStore')


describe('Pruebas en FabDelete', () => {

    const mockStartDeletingEvent = jest.fn();

    beforeAll( () => { jest.clearAllMocks() })
    
    test('Debe de mostrar el componete correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false, 
        })
        
        render(<FabDelete/>)

        const btn = screen.getByTestId('btn-delete');
        // screen.debug();


        expect ( btn.classList ).toContain('btn');
        expect ( btn.classList ).toContain('btn-danger');
        expect ( btn.classList ).toContain('fab-danger');
        expect ( btn.style.display ).toBe('none');
    });

    test('Debe de mostrar el boton si hay un evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
        })
        
        render(<FabDelete/>)

        const btn = screen.getByTestId('btn-delete');
        screen.debug();


        expect ( btn.classList ).toContain('btn');
        expect ( btn.classList ).toContain('btn-danger');
        expect ( btn.classList ).toContain('fab-danger');
        expect ( btn.style.display ).not.toContain('none');
        expect ( btn.style.display ).toBe('');
    });

    test('Debe de llamar startDeletingEvent si hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent,
        })
        
        render(<FabDelete/>)

        const btn = screen.getByTestId('btn-delete');
        
        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalled()
    });
});