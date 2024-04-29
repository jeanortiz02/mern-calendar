import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";


describe('Pruebas en authSlice', () => {
    
    test('Debe de regresar el estado inicial', () => {
        expect( authSlice.getInitialState() ).toEqual( initialState );
    });

    test('Debe de realizar un login', () => {
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        // console.log( state );
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    });

    test('Debe de realizar un logout', () => {
        const state = authSlice.reducer( authenticatedState, onLogout() );
        expect( state ).toEqual( {
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        } );
    });

    test('Debe de realizar el Logout con un mensaje', () => {
        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
        expect( state ).toEqual( {
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        } );
    });

    test('Debe de limpiar el mensaje de erro', () => {
        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );
        const newState = authSlice.reducer( state, clearErrorMessage() );
        expect( newState.errorMessage ).toBe( undefined );
    });

    test('Debe de realizar el checking', () => {
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        const newState = authSlice.reducer( state, onChecking() );
        // console.log( newState );
        expect( newState ).toEqual( {
            status: 'checking',
            user: {},
            errorMessage: undefined
        })
    });
});