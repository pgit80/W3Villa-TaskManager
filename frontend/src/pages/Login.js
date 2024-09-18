import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const response = await fetch(
        "https://w3villa-taskmanager-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 text-white px-6 relative">
      <div className="relative z-20 bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-500 opacity-30 blur-3xl rounded-2xl"></div>

        <h2 className="text-3xl font-extrabold text-center text-teal-400 mb-6 relative z-20">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-2 p-4 bg-gray-800 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-500 text-white placeholder-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-2 p-4 bg-gray-800 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-500 text-white placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-teal-400 transition duration-300 transform hover:scale-105 relative z-20"
            >
              Log In
            </button>
          </div>
        </form>
      </div>

      <div className="absolute bottom-0 right-0 left-0 opacity-70 z-10">
        <svg viewBox="0 0 900 300" width="100%" height="150px">
          <path
            fill="teal"
            fillOpacity="0.5"
            d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,224C672,224,768,160,864,122.7C960,85,1056,75,1152,96C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default LoginPage;
