import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="container text-light py-5 mt-5">
      <div className="text-light p-5 ">
      <p className="lead text-center">
            Struggling to understand a LeetCode problem? We’ve got you covered.
            Our tool provides concise summaries, real-world applications, and tips to approach each problem efficiently — all powered by cutting-edge AI.
          </p>

          <ul className="mt-4 text-center list-unstyled">
            <li>📌 Problem breakdowns in simple language</li>
            <li>🔧 Associated techniques and algorithms explained</li>
            <li>🚀 Tips for writing efficient solutions</li>
            <li>🌍 Real-world use cases by industry</li>
          </ul>

        <div className="text-center mt-4">
          <Link to="/search" className="btn btn-outline-info">
            🚀 Start Exploring
          </Link>
        </div>
      </div>

      <style>{`
        .gradient-text {
          background: linear-gradient(90deg, #0dcaf0, #6f42c1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
    </> 
  );
};

export default HomePage;
