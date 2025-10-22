import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import SignUp from '../pages/Auth/SignUp/SignUp'
import Login from '../pages/Auth/Login/Login'
import VerifyEmail from '../pages/Auth/VerifyEmail/VerifyEmail'
import PageNotFound from '../pages/PageNotFound'
import ClientVsRunner from '../pages/ClientVsRunner/ClientVsRunner'
const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verifyemail' element={<VerifyEmail/>}/>
        <Route path='/clientvsrunner' element={<ClientVsRunner/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Router
