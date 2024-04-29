import { renderHook, act } from '@testing-library/react';
import { useUiStore } from '../../src/hooks/useUiStore';
import { Provider } from 'react-redux';
import { store, uiSlice } from '../../src/store';
import { configureStore } from '@reduxjs/toolkit';
// import { act } from 'react-dom/test-utils';


describe('Pruebas en useUiStore', () => {

    const getMockStore = ( initialState ) => {
        return configureStore({
            reducer: {
                ui: uiSlice.reducer
            },
            preloadedState: {
                ui: {...initialState}
            }
        })
    }

    test('Debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore( { isDateModalOpen: false } );
        
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );

        expect( result.current ).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
        })
    });

    test('openDateModal debe de colocar en true el isDateModal ', () => {
        const mockStore = getMockStore( { isDateModalOpen: false } );
        
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );

        const { openDateModal } = result.current;

        act( () => {
            openDateModal();
        })

        expect(result.current.isDateModalOpen ).toBeTruthy();
    });


    test('onCloseModal debe de colocar isDateModal en false ', () => {
        const mockStore = getMockStore( { isDateModalOpen: true } );
        
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );

        

        act( () => {
            result.current.closeDateModal();
        })

        expect ( result.current.isDateModalOpen ).toBeFalsy();
    });
});