
import { onCloseDateModal, onOpenDateModal, uiSlice,  } from './../../../src/store/ui/uiSlice';
describe('Pruebas en uiSlice', () => {
    

    test('Debe de regresar el estado por defecto', () => {
        expect(uiSlice.getInitialState().onOpenDateModal ).toBeFalsy();
    });

    test('Debe de cambiar ell estado isModalOpen isModalClosed de manera correca', () => {
        
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onOpenDateModal() )
        // console.log(state);
        expect( state.isDateModalOpen ).toBeTruthy();


        state = uiSlice.reducer( state, onCloseDateModal() )
        // console.log(state);
        expect( state.onCloseDateModal ).toBeFalsy();
    });
});