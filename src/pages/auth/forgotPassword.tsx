import { Logo } from "@/assets/image";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSendInstruction = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/resetPassword");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-8">
      <div className="w-full max-w-md space-y-4">
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="w-[108px] h-auto object-contain"
          />
        </div>
        <h1 className="text-3xl font-semibold text-white">Forgot Password</h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSendInstruction}
        >
          <input
            type="text"
            placeholder="Email"
            required
            className="px-4 py-2 border text-white border-gray-500 rounded-md"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 font-semibold text-2xl text-white rounded-4xl"
          >
            Send Instruction
          </button>
        </form>

        <p className="text-left text-sm text-white">
          Already have account?{" "}
          <Link to="/" className="text-green-600 hover:underline font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
