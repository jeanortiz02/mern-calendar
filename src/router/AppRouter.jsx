import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './../auth';
import { CalendarPage } from './../calendar';
import { useEffect } from 'react';
import { useAuthStore } from '../hooks';
// import { getEnvVariables } from '../helpers';


export const AppRouter = () => {


   const { status, checkingAuthToken } = useAuthStore()

    // const authStatus = 'not-authenticated';
    useEffect(() => {
      checkingAuthToken()
    }, [])
    
    if ( status === 'checking' ){
      return (
        <h3>Cargando....</h3>
      )
    }

    // console.log( getEnvVariables() )

  return (
    <Routes>
        TODO: {
            (status === 'not-authenticated')
            ? (
              <>
                <Route path='auth/*' element={ <LoginPage/> }/>
                <Route path='/*' element={ <Navigate to='/auth/login' />}/>
              </>
            )
            : (
              <>
                <Route path='/' element={ <CalendarPage/> }/>
              <Route path='/*' element={ <Navigate to='/' />}/>
              </>
            )
        }

    </Routes>
  )
}
