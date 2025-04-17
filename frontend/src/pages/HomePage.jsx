import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"



const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="container text-light py-2 mt-auto">
    <div className="position-relative text-center mt-5 d-none d-md-block" style={{ maxWidth: "800px", margin: "0 auto" }}>
  <img
    src="/images/laptop.png"
    alt="Laptop illustration"
    className="img-fluid"
  />
  <div
    className="position-absolute p-4 laptop-text"
    style={{
      top: "15%",
      left: "10%",
      width: "80%",
      height: "60%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}
  >
    <p className="h4">Struggling to understand a LeetCode problem?</p>
    <p className="lead">You've come to the right place.</p>
    <p className="lead">Get concise insights, real-world uses, and smart tips to solve problems—powered by AI.</p>
    <div className="text-center py-2">
    <Link
      to="/search"
      className="btn btn-md mt-3"
      style={{
        backgroundColor: "black",
        color: "green",
        fontWeight: "bold",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        border: "1px solid limegreen",
        borderRadius: "5px",
      }}
    >
      🚀 Start Exploring
    </Link>
</div>
  </div>
</div>
<hr />

{/* Mobile version */}
<div className="d-block d-md-none text-center mt-5 px-3"  style={{color: "gray"}}>
  <p className="h4">Struggling to understand a LeetCode problem?</p>
  <p className="lead">You've come to the right place.</p>
  <p className="lead">Get concise insights, real-world uses, and smart tips to solve problems—powered by AI.</p>
  <div className="text-center py-2">
    <Link
      to="/search"
      className="btn btn-lg mt-3"
      style={{
        backgroundColor: "black",
        color: "green",
        fontWeight: "bold",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        border: "1px solid limegreen",
        borderRadius: "5px",
      }}
    >
      🚀 Start Exploring
    </Link>
  </div>
  <hr />
</div>

  <div className="text-light mx-auto custom-width px-2">
  {/* Section 1 */}
  <div className="row align-items-center my-5 py-2 flex-column flex-md-row">
    <div className="col-md-6 mb-3 mb-md-0">
    <div className="vscode-window border rounded-3 overflow-hidden mx-auto my-4" style={{ maxWidth: '700px' }}>
  <div className="vscode-topbar d-flex align-items-center px-3 py-2">
    <span className="circle red me-2"></span>
    <span className="circle yellow me-2"></span>
    <span className="circle green"></span>
  </div>
  <img src="/images/problem-solving.png" alt="Inside VS Code" className="img-fluid" />
</div>
    </div>
    <div className="col-md-6 text-center">
      <h4 style={{ color: "#569cd6" }}>📌 Problem Breakdown</h4>
      <p style={{ color: "#9cdcfe" }}>Understand what’s really being asked.</p>
      <p style={{ color: "#ce9178" }}>Each LeetCode problem is broken down into simpler terms, eliminating any technical jargon. Whether it’s array manipulation or dynamic programming, the essence of the problem is explained in an easy-to-understand manner.</p>
    </div>
  </div>

  {/* Section 2 */}
  <div className="row align-items-center my-5 py-2 flex-column-reverse flex-md-row">
    <div className="col-md-6 text-center">
      <h4 style={{ color: "#569cd6" }}>🔧 Techniques & Algorithms</h4>
      <p style={{ color: "#9cdcfe" }}>Know the tools for the job.</p>
      <p style={{ color: "#ce9178" }}>Understand which algorithm or technique is best suited for each problem — whether it's two pointers, recursion, sliding window, or something more advanced. The explanation also covers why a particular technique is used, not just what it is.</p>
    </div>
    <div className="col-md-6 mb-3 mb-md-0">
    <div className="vscode-window border rounded-3 overflow-hidden mx-auto my-4" style={{ maxWidth: '700px' }}>
  <div className="vscode-topbar d-flex align-items-center px-3 py-2">
    <span className="circle red me-2"></span>
    <span className="circle yellow me-2"></span>
    <span className="circle green"></span>
  </div>
  <img src="/images/algorithm-execution.png" alt="Inside VS Code" className="img-fluid" />
</div>
    </div>
  </div>

  {/* Section 3 */}
  <div className="row align-items-center my-5 py-2 flex-column flex-md-row">
    <div className="col-md-6 mb-3 mb-md-0">
    <div className="vscode-window border rounded-3 overflow-hidden mx-auto my-4" style={{ maxWidth: '700px' }}>
  <div className="vscode-topbar d-flex align-items-center px-3 py-2">
    <span className="circle red me-2"></span>
    <span className="circle yellow me-2"></span>
    <span className="circle green"></span>
  </div>
  <img src="/images/hacker-mindset.png" alt="Inside VS Code" className="img-fluid" />
</div>
    </div>
    <div className="col-md-6 text-center">
      <h4 style={{ color: "#569cd6" }}>🚀 Efficiency Tips</h4>
      <p style={{ color: "#9cdcfe" }}>Write smarter, faster code.</p>
      <p style={{ color: "#ce9178" }}>Get optimization tips to improve your code’s time and space complexity. Learn common pitfalls, how to avoid brute-force approaches, and how to move from a naive solution to an optimal one.</p>
    </div>
  </div>

  {/* Section 4 */}
  <div className="row align-items-center my-5 py-2 flex-column-reverse flex-md-row">
    <div className="col-md-6 text-center">
      <h4 style={{ color: "#569cd6" }}>🌍 Real-World Applications</h4>
      <p style={{ color: "#9cdcfe" }}>Bridge theory and practice.</p>
      <p style={{ color: "#ce9178" }}>Discover how similar problems are tackled in tech companies and real-world systems. From backend services to AI pipelines, understand the practical relevance of coding challenges in the industry.</p>
    </div>
    <div className="col-md-6 mb-3 mb-md-0">
    <div className="vscode-window border rounded-3 overflow-hidden mx-auto my-4" style={{ maxWidth: '700px' }}>
  <div className="vscode-topbar d-flex align-items-center px-3 py-2">
    <span className="circle red me-2"></span>
    <span className="circle yellow me-2"></span>
    <span className="circle green"></span>
  </div>
  <img src="/images/the-world.png" alt="Inside VS Code" className="img-fluid" />
</div>
    </div>
  </div>
</div>
      </div>

      <style>{`
        .gradient-text {
          background: linear-gradient(90deg, #0dcaf0, #6f42c1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    
    </> 
  );
};

export default HomePage;
