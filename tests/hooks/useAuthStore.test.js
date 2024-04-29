import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../src/store';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { Provider } from 'react-redux';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from './../fixtures/testUser';
import calendarApi from '../../src/api/calendarApi';


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
}

describe('Probando el hook useAuthStore', () => {

    beforeEach( () => localStorage.clear() );
    
    test('Debe de regresar los valores por defecto', () => {
        
        const mockStore = getMockStore( {...initialState} );
        
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );

        // console.log( result.current );

        expect( result.current ).toEqual({
            checkingAuthToken: expect.any(Function),
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
            status: 'checking', 
            user: {},
        })
    });


    test('startLogin debe de realizar el login correctamente', async() => {
        // Limpiar el localStorage para evitar cualquier falso positivo

        // Crear mockStore 
        const mockStore = getMockStore( { ...notAuthenticatedState } );
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );

        await act( async() => {
            await result.current.startLogin(testUserCredentials);
        })

        // console.log( result.current );
        const { errorMessage, status, user } = result.current;

        expect( { errorMessage, status, user } ).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Testing-user', uid: '662bc3aec62358d813331494' },
        }) 

        expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );

    });

    test('startLogin debe de fallar la autenticacion', async() => {
        const mockStore = getMockStore( { ...notAuthenticatedState } );
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );

        await act( async() => {
            await result.current.startLogin({email: 'algo@correo.com', password: '215161561'} );

        })

        const { errorMessage, status, user } = result.current;
        expect( localStorage.getItem('token') ).toBeNull();
        expect( { errorMessage, status, user } ).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: {},
        });


        await waitFor( () => {
            expect( result.current.errorMessage ).toBeUndefined()
        })
    });

    test('startRegister debe de crear un usuario nuevo', async() => {

        const newUser = {email: 'algo@correo.com', password: '215161561', name: 'Test-User-Create'}
        
        const mockStore = getMockStore( { ...notAuthenticatedState } );
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );


        const spy = jest.spyOn( calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: '123456789',
                name: 'test user',
                token: 'Algun token',
            }
        })

        await act( async() => {
            await result.current.startRegister( newUser )
        })

        const { errorMessage, status, user } = result.current;
        expect( { errorMessage, status, user } ).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'test user', uid: '123456789' }
          });


        spy.mockRestore();
    });

    test('startRegister debe de fallar la creacion', async() => {        
        const mockStore = getMockStore( { ...notAuthenticatedState } );
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );

        await act( async() => {
            await result.current.startRegister( testUserCredentials )
        })

        const { errorMessage, status, user } = result.current;
        expect( { errorMessage, status, user } ).toEqual({
            errorMessage: 'Ya existe un usuario con ese correo',
            status: 'not-authenticated',
            user: { }
          });
    });

    test('checkAuthToken debe de fallar si no hay token', async() => {
        const mockStore = getMockStore( { ...initialState } );
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );

        await act( async() => {
            await result.current.checkingAuthToken( testUserCredentials )
        })

        const { errorMessage, status, user } = result.current;
        expect ( { errorMessage, status, user } ).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}, 
        })
    });

    test('checkAuthToken debe de autenticar el usuario si hay un token', async() => {
        
        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem('token', data.token);


        const mockStore = getMockStore( { ...initialState } );
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ( { children } ) => <Provider store={ mockStore }> { children } </Provider>
        } );

        await act( async() => {
            await result.current.checkingAuthToken( testUserCredentials )
        })

        const { errorMessage, status, user } = result.current;
        // console.log( { errorMessage, status, user} );
        expect ( { errorMessage, status, user } ).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Testing-user', uid: '662bc3aec62358d813331494' }
          })


    });
});