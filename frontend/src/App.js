import "./App.css";
import HeroSection from "./pages/Herosection";
import RegistrationPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// ProtectedRoute component to check authentication
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check for token in localStorage

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for home page */}
          <Route path="/" element={<HeroSection />} />

          {/* Route for registration page */}
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
