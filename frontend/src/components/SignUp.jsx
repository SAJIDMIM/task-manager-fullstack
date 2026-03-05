import { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../services/api";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

const SignUp = () => {
  const [form, setForm] = useState({ identifier: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // optional success message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.identifier || !form.password || !form.confirmPassword) {
      setError("All fields are required!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await signupUser({
        identifier: form.identifier,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      localStorage.setItem("token", data.token);
      setSuccess("Account created successfully! You can now log in."); // show success instead of navigating
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed!");
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

        <h2 className="text-4xl font-extrabold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-600 text-lg">Sign up with email or username</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center font-medium">
            {success}
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
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
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
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="flex-1 p-3 ml-2 border-none focus:outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 mr-2 focus:outline-none hover:text-gray-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <MdVisibility size={24} /> : <MdVisibilityOff size={24} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <MdLock className="text-gray-400 text-xl ml-2" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="flex-1 p-3 ml-2 border-none focus:outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-400 mr-2 focus:outline-none hover:text-gray-600 transition"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <MdVisibility size={24} /> : <MdVisibilityOff size={24} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-semibold p-4 rounded-xl hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-blue-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;