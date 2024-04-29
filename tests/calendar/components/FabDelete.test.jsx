import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../src/store';
import { FabDelete } from '../../../src/calendar/components/FabDelete';



describe('Pruebas en FabDelete', () => {
    
    test('Debe de mostrar el componete correctamente', () => {
        
        render(
            <Provider store={ store }>
                <FabDelete/>
            </Provider>
        )

        screen.debug();
    });
});