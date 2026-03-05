import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); // can be email or username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send identifier (email or username) and password to backend
      const { data } = await loginUser({ identifier, password });

      // If login successful, store token and navigate
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      // Show error message from backend
      setError(err.response?.data?.message || "Login failed!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 px-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl space-y-6 transform hover:scale-105 transition-transform duration-300">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo192.png" alt="Logo" className="w-20 h-20 rounded-full shadow-md" />
        </div>

        <h2 className="text-4xl font-extrabold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600 text-lg">Login with email or username</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Identifier Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Email or Username</label>
            <div className="flex items-center border border-gray-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <MdEmail className="text-gray-400 text-xl ml-2" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email or Username"
                className="flex-1 p-3 ml-2 border-none focus:outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <MdLock className="text-gray-400 text-xl ml-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="flex-1 p-3 ml-2 border-none focus:outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 mr-2 focus:outline-none hover:text-gray-600 transition"
              >
                {showPassword ? <MdVisibility size={24} /> : <MdVisibilityOff size={24} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-semibold p-4 rounded-xl hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold text-blue-700 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;