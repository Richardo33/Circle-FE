import { Logo } from "@/assets/image";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleNewPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-">
      <div className="w-full max-w-md space-y-4">
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="w-[108px] h-auto object-contain"
          />
        </div>
        <h1 className="text-3xl font-semibold text-white">Reset Password</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleNewPassword}>
          <input
            type="password"
            placeholder="new password"
            required
            className="px-4 py-2 border text-white border-gray-500 rounded-md"
          />
          <input
            type="password"
            placeholder="confirm new password"
            required
            className="px-4 py-2 border text-white border-gray-500 rounded-md"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 font-semibold text-2xl text-white rounded-4xl"
          >
            Create New Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
