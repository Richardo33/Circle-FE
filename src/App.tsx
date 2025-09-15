import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./lib/privateRoutes";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import Thread from "./pages/thread";
import Search from "./pages/search";
import Follows from "./pages/follows";
import Profile from "./pages/profile";

function App() {
  return (
    <div className="bg-[#1D1D1D] h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/thread" element={<Thread />} />
            <Route path="/search" element={<Search />} />
            <Route path="/follows" element={<Follows />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
