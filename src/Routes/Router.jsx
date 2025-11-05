import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../Components/Dashboard/DashboardLayout'
import RunnerLayout from '../Components/RunerDashboardLayout/RunnerLayout'
import RunnerDashboard from '../pages/Auth/RunnerDashboard/RunnerDashboard'
import KycModal from  "../Components/RunnerModal/KycVerifiedStatus"
import RunnerEarning from '../pages/Auth/RunnerDashboard/RunnerEarning'
import ActiveJob from '../pages/Auth/RunnerDashboard/ActiveJob'
import RunnerProfile from '../pages/Auth/RunnerDashboard/RunnerProfile'
import RunnerMessage from "../pages/Auth/RunnerDashboard/RunnerMessage"
import ForgotPassword from "../pages/Auth/Forgotpassword/Forget"
import Login from '../pages/Auth/Login/Login'
import ResetPassword from "../pages/Auth/Reset/ResetPassword"
import SignUp from '../pages/Auth/SignUp/SignUp'
import VerifyEmail from '../pages/Auth/VerifyEmail/VerifyEmail'
import DashboardPage from '../pages/Dashboard/DashboardPage/DashboardPage'
import MessagesPage from '../pages/Dashboard/MessagesPage'
import MyErrandsPage from '../pages/Dashboard/MyErrandsPage'
import PaymentsPage from '../pages/Dashboard/PaymentsPage'
import ProfilePage from '../pages/Dashboard/ProfilePage'
import LandingPage from '../pages/LandingPage/LandingPage'
import PageNotFound from '../pages/PageNotFound'
import ClientVsRunner from '../pages/ClientVsRunner/ClientVsRunner'
import PrivateRoute from './PrivateRoute'
import MyErrandsDetails from '../pages/Dashboard/MyErrandsDetails'
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'

const Router = () => {
  return (
    <BrowserRouter>
  <Routes>
        {/* Public routes */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/clientvsrunner" element={<ClientVsRunner />} />
        <Route path="/signup/:role" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/*  Client Dashboard */}
        {/* <Route element={<PrivateRoute allowedRole="Client" />}> */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="my-errands" element={<MyErrandsPage />} />
            <Route path="my-errands/:errandId" element={<MyErrandsDetails />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        {/* </Route> */}

        {/*  Runner Dashboard */}
        <Route element={<PrivateRoute allowedRole="Runner" />}>
          <Route path="/runnerlayout" element={<RunnerLayout />}>
            <Route index element={<RunnerDashboard />} />
            <Route path="runneractive" element={<ActiveJob />} />
            <Route path="runnerearning" element={<RunnerEarning />} />
            <Route path="runnermessage" element={<RunnerMessage />} />
            <Route path="runnerprofile" element={<RunnerProfile />} />
          </Route>
        </Route>

        {/* Admin dashboard */}
        <Route path='/admindash' element={<AdminDashboard/>}> 
          
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default Router
