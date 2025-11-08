import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "@/lib/privateRoutes";
import Landing from "@/pages/landing";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ForgotPassword from "@/pages/auth/forgotPassword";
import ResetPassword from "@/pages/auth/resetPassword";
import Thread from "@/pages/thread";
import Search from "@/pages/search";
import Follows from "@/pages/follows";
import Profile from "@/pages/profile";
import Logout from "@/pages/auth/logout";
import ThreadDetail from "@/pages/threadDetail";
import ProfileByUsername from "./pages/profileUser";
import Terms from "@/pages/legal/terms";
import Privacy from "@/pages/legal/privacy";
import NotFound from "@/pages/notFound";

function App() {
  return (
    <div className="bg-[#111] min-h-screen text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route element={<PrivateRoute />}>
            <Route path="/thread" element={<Thread />} />
            <Route path="/thread/:id" element={<ThreadDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/follows" element={<Follows />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile/:username" element={<ProfileByUsername />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
