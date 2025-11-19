import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "../Components/Dashboard/DashboardLayout";
import RunnerLayout from "../Components/RunerDashboardLayout/RunnerLayout";
import RunnerDashboard from "../pages/Auth/RunnerDashboard/RunnerDashboard";
import ResetOtp from "../pages/Auth/ResetOtp/ResetOtp";
import CounterSuccess from "../Components/RunnerModal/CounterSucces";
import EditProfile from "../Components/EditProfile.jsx/EditProfile";
import KycModal from "../Components/RunnerModal/KycVerifiedStatus";
import RunnerEarning from "../pages/Auth/RunnerDashboard/RunnerEarning";
import ActiveJob from "../pages/Auth/RunnerDashboard/ActiveJob";
import RunnerProfile from "../pages/Auth/RunnerDashboard/RunnerProfile";
import ForgotPassword from "../pages/Auth/Forgotpassword/Forget";
import Login from "../pages/Auth/Login/Login";
import ResetPassword from "../pages/Auth/Reset/ResetPassword";
import SignUp from "../pages/Auth/SignUp/SignUp";
import VerifyEmail from "../pages/Auth/VerifyEmail/VerifyEmail";
import DashboardPage from "../pages/Dashboard/DashboardPage/DashboardPage";
import MessagesPage from "../pages/Dashboard/MessagePage/MessagesPage";
import MyErrandsPage from "../pages/Dashboard/MyErrandsPage";
import PaymentsPage from "../pages/Dashboard/PaymentsPage";
import ProfilePage from "../pages/Dashboard/ProfilePage";
import LandingPage from "../pages/LandingPage/LandingPage";
import PageNotFound from "../pages/PageNotFound";
import ClientVsRunner from "../pages/ClientVsRunner/ClientVsRunner";
import PrivateRoute from "./PrivateRoute";
import MyErrandsDetails from "../pages/Dashboard/MyErrandsDetails";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ProfileDetailSetting from "../pages/Dashboard/ProfileDetailSetting";
import ErrandDeliveryTrack from "../pages/Dashboard/ErrandDeliveryTrack";
import Negotiation from "../Components/RunnerModal/Negotiation";
import KycPopModel from "../Components/RunnerModal/KycPopupModel";
import ErrandLive from "../pages/Auth/RunnerDashboard/ErrandLive";
import SuccessPage from "../Components/ModalSuccess/SuccessPage";
import RunnerMessage from "../pages/Auth/RunnerDashboard/RunnerMessage";
import RunnerDetailPage from "../pages/Auth/RunnerDashboard/RunnerDetailPage";
import UnifiedChat from "../pages/Chat/UnifiedChat";
import AddBankDeal from "../pages/Auth/RunnerDashboard/AddBankDeal";
import Notification from "../pages/Dashboard/Notification";
import RunnerNotification from "../pages/Auth/RunnerDashboard/RunnerNotification";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/clientvsrunner" element={<ClientVsRunner />} />
        <Route path="/signup/:role" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/reset-otp" element={<ResetOtp />} />
        <Route path="/kycmod" element={<KycPopModel />} />
        <Route path="/errandlive" element={<ErrandLive />} />

   <Route path="/chat/:id" element={<UnifiedChat />} />
        {/*  Client Dashboard */}
        <Route element={<PrivateRoute allowedRole="Client" />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="my-errands" element={<MyErrandsPage />} />
            <Route path="notification" element={<Notification />} />
            <Route path="my-errands/:errandId" element={<MyErrandsDetails />} />
          
            <Route path="success" element={<SuccessPage />} />
            <Route path="payments" element={<PaymentsPage />} />
         
            {/* Client Messages (chat with runner) */}
            <Route path="messages/:id" element={<MessagesPage />} />
              <Route
              path="messages/:id/status"
              element={<ErrandDeliveryTrack />}
            />
            <Route path="profile" element={<ProfilePage />} />
            <Route
              path="profile/:profileId"
              element={<ProfileDetailSetting />}
            />
          </Route>
        </Route>
 
        {/*  Runner Dashboard */}
        <Route element={<PrivateRoute allowedRole="Runner" />}>
          <Route path="/runnerlayout" element={<RunnerLayout />}>
            <Route index element={<RunnerDashboard />} />
              <Route path="rnotification" element={<RunnerNotification />} />
            <Route path="runneractive" element={<ActiveJob />} />
            <Route path="runnerearning" element={<RunnerEarning />} />
            <Route path="runnerprofile" element={<RunnerProfile />} />
            <Route
              path="runnerprofile/runnerprofile/:profileid"
              element={<EditProfile />} />
            <Route
              path="runnerprofile/:bank" element={<AddBankDeal />}/>
            {/* Runner Message */}
              {/* <Route path="runnermessage" element={<RunnerMessage />} /> */}
            <Route path="runnermessage/:id" element={<RunnerMessage />} />
            <Route path="runnermessage/:id/status" element={< RunnerDetailPage/>} />
            <Route path="runnertrack/:id" element={<RunnerDetailPage />} />
          </Route>
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admindash" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
