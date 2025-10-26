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
import UserDashboard from '../pages/UserDashboard/UserDashboard'
import Account from '../Components/dashLayout/Account'
import Dashboard from '../Components/dashLayout/Dashboard'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup/:role' element={<SignUp />} />
        {/* <Route path='/signup/:role' element={<SignUpRunner/>}/> */}
        <Route path='/login' element={<Login />} />
        <Route path='/verifyemail' element={<VerifyEmail />} />
        <Route path='/clientvsrunner' element={<ClientVsRunner />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/reset' element={<ResetPassword />} />

        <Route path='/userdashboard' element={<UserDashboard />}>
           <Route path='account' element={<Account/>}/>
           <Route path='' element={ <Dashboard/>}/>
           <Route path='date' element={ <Date/>}/>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default Router
