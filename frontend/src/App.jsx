import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  // Check if user is logged in (token exists)
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Default "/" path goes to Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard is protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* SignUp route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Any unknown path redirects to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;