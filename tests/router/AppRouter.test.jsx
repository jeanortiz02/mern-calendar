import { render, screen } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar';

jest.mock('../../src/hooks/useAuthStore');


jest.mock( '../../src/calendar' , () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))

jest.mock("react-modal", () => ({
    ...jest.requireActual("react-modal"),
    setAppElement: () => {},
}));

describe('Pruebas en AppRouter', () => {
    
    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {

       
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkingAuthToken: mockCheckAuthToken, 

        });

        render( <AppRouter/>)

        // screen.debug();
        expect ( screen.getByText('Cargando....') ).toBeTruthy();
        expect ( mockCheckAuthToken ).toHaveBeenCalled();

    });

    test('debe de mostrar el login en caso de no estar autenticado', () => {
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkingAuthToken: mockCheckAuthToken, 

        });

        const { container } = render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        )

        expect ( screen.getByText('Ingreso') ).toBeTruthy();
        expect ( container ).toMatchSnapshot();
    });

    test('debe de mostrar el calendario si estamos autenticados', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkingAuthToken: mockCheckAuthToken, 

        });

        const { container } = render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        )
        expect ( screen.getByText('CalendarPage') ).toBeTruthy();
        // screen.debug(); 
    });
});