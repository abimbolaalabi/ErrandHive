import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../Components/Dashboard/DashboardLayout'
import ForgotPassword from "../pages/Auth/Forgotpassword/Forget"
import Login from '../pages/Auth/Login/Login'
import ResetPassword from "../pages/Auth/Reset/ResetPassword"
import SignUp from '../pages/Auth/SignUp/SignUp'
import VerifyEmail from '../pages/Auth/VerifyEmail/VerifyEmail'
import DashboardPage from '../pages/Dashboard/DashboardPage'
import MessagesPage from '../pages/Dashboard/MessagesPage'
import MyErrandsPage from '../pages/Dashboard/MyErrandsPage'
import PaymentsPage from '../pages/Dashboard/PaymentsPage'
import ProfilePage from '../pages/Dashboard/ProfilePage'
import LandingPage from '../pages/LandingPage/LandingPage'
import PageNotFound from '../pages/PageNotFound'
import ClientVsRunner from '../pages/ClientVsRunner/ClientVsRunner'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/' element={<LandingPage />} />
           <Route path='/clientvsrunner' element={<ClientVsRunner/>}/>
        <Route path='/signup/:role' element={<SignUp />} />
        {/* <Route path='/signup/:role' element={<SignUpRunner/>}/> */}
        <Route path='/login' element={<Login />} />
        <Route path='/verifyemail' element={<VerifyEmail />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/reset' element={<ResetPassword />} />
        
        {/* Dashboard Routes */}
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path='my-errands' element={<MyErrandsPage />} />
          <Route path='active-jobs' element={<MyErrandsPage />} />
          <Route path='payments' element={<PaymentsPage />} />
          <Route path='my-earnings' element={<PaymentsPage />} />
          <Route path='messages' element={<MessagesPage />} />
          <Route path='profile' element={<ProfilePage />} />
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default Router
