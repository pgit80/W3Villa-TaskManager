import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 h-screen flex flex-col items-center justify-center text-white px-6 overflow-hidden">
      {/* Text Section */}
      <div className="max-w-4xl text-center mb-8">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Task Management <span className="text-teal-400">Made Easy</span>
        </h1>
        {/* Subheading / Quote */}
        <p className="text-xl md:text-2xl font-light mb-8 text-gray-300 animate__animated animate__fadeIn animate__delay-2s">
          "Productivity is never an accident. It’s the result of commitment to
          excellence, smart planning, and focused effort."
        </p>
        {/* Get Started Button */}
        <button className="bg-teal-500 text-gray-900 font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-teal-400 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s">
          <Link to="/register">Get Started</Link>{" "}
          {/* Register page ke liye button */}
        </button>
      </div>

      {/* Three Feature Boxes */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1: Track Your Tasks */}
        <div className="p-6 bg-gray-800 bg-opacity-80 rounded-lg hover:bg-opacity-100 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-4s">
          <h3 className="text-2xl font-semibold mb-2 text-teal-400">
            Track Your Tasks
          </h3>
          <p className="text-gray-400">
            Stay on top of your daily tasks with intuitive task management.
          </p>
        </div>
        {/* Feature 2: Collaborate Easily */}
        <div className="p-6 bg-gray-800 bg-opacity-80 rounded-lg hover:bg-opacity-100 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-5s">
          <h3 className="text-2xl font-semibold mb-2 text-teal-400">
            Collaborate Easily
          </h3>
          <p className="text-gray-400">
            Team up, share ideas, and get work done faster together.
          </p>
        </div>
        {/* Feature 3: Achieve Goals */}
        <div className="p-6 bg-gray-800 bg-opacity-80 rounded-lg hover:bg-opacity-100 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-6s">
          <h3 className="text-2xl font-semibold mb-2 text-teal-400">
            Achieve Goals
          </h3>
          <p className="text-gray-400">
            Set goals, track progress, and accomplish more in less time.
          </p>
        </div>
      </div>

      {/* Subtle Wave Effect at Bottom */}
      <div className="absolute bottom-0 right-0 left-0 opacity-50">
        <svg viewBox="0 0 900 300" width="100%" height="200px">
          <path
            fill="#333"
            d="M0,160L40,170C80,180,160,200,240,200C320,200,400,180,480,160C560,140,640,120,720,140C800,160,880,220,960,250C1040,280,1120,280,1200,260C1280,240,1360,200,1400,180L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
