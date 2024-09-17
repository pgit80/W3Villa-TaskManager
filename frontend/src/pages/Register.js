import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required.");
      return;
    }

    const apiUrl = "http://localhost:5000/api/auth/register"; // Replace with your actual endpoint

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        alert("Registration successful!");
        navigate("/login"); // Redirect to the login page
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.message);
        alert(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirects to the login page
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-700 to-indigo-900 text-white px-6 py-8">
      <div className="relative z-20 bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-800 p-8 rounded-3xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-8">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-2 p-4 bg-indigo-900 border border-indigo-600 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-500 text-white placeholder-gray-300"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-2 p-4 bg-indigo-900 border border-indigo-600 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-500 text-white placeholder-gray-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-2 p-4 bg-indigo-900 border border-indigo-600 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-500 text-white placeholder-gray-300"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105 relative z-30"
            >
              Register
            </button>
          </div>
        </form>

        {/* Already a user section */}
        <div className="mt-6 text-center text-gray-200 relative z-30">
          <span>Already have an account? </span>
          <button
            onClick={handleLoginRedirect}
            className="text-yellow-400 underline hover:text-yellow-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50 blur-2xl rounded-3xl"></div>

      <div className="absolute bottom-0 right-0 left-0 opacity-60 z-0">
        <svg viewBox="0 0 900 300" width="100%" height="150px">
          <path
            fill="purple"
            fillOpacity="0.5"
            d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,224C672,224,768,160,864,122.7C960,85,1056,75,1152,96C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default RegisterPage;
