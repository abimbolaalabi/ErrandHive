import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage/LandingPage'
import SignUp from '../pages/Auth/SignUp/SignUp'
import Login from '../pages/Auth/Login/Login'
import VerifyEmail from '../pages/Auth/VerifyEmail/VerifyEmail'
import PageNotFound from '../pages/PageNotFound'
import ClientVsRunner from '../pages/ClientVsRunner/ClientVsRunner'
import ForgotPassword from "../pages/Auth/Forgotpassword/Forget"
import ResetPassword from "../pages/Auth/Reset/ResetPassword"
import SignUpRunner from '../pages/Auth/SignUpRunner/SignUpRunner'
const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signupclient' element={<SignUp/>}/>
        <Route path='/signuprunner' element={<SignUpRunner/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verifyemail' element={<VerifyEmail/>}/>
        <Route path='/clientvsrunner' element={<ClientVsRunner/>}/>
       <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Router
