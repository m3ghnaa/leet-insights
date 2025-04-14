import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [insights, setInsights] = useState("");
  const [approachSection, setApproachSection] = useState("");
  const [resourceLinks, setResourceLinks] = useState([]);
  const [showApproach, setShowApproach] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractLinksFromMarkdown = (markdown) => {
    const linkRegex = /\[(.*?)\]\((https?:\/\/.*?)\)/g;
    const links = [];
    let match;
    while ((match = linkRegex.exec(markdown)) !== null) {
      links.push({ title: match[1], url: match[2] });
    }
    return links;
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setInsights("");
    setApproachSection("");
    setResourceLinks([]);
    setShowApproach(false);

    try {
      const response = await fetch(`http://localhost:8080/leetcode/${query}`);
      const data = await response.json();
      const fullContent = data.insights || "No insights available.";

      const parts = fullContent.split("## Efficient Approach Overview");
      setInsights(parts[0].trim());

      if (parts.length > 1) {
        setApproachSection("## Efficient Approach Overview" + parts[1]);
      }

      // Extract links from the full markdown response
      const links = extractLinksFromMarkdown(fullContent);
      setResourceLinks(links);

  
    } catch (error) {
      console.error("Error fetching insights:", error);
      setInsights("⚠️ Failed to fetch insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="container mt-5 text-light p-5">

        {/* Search Bar */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Enter problem number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-info" onClick={handleSearch}>
            🔍 Search
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center mt-4">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Talking to Gemini...</p>
          </div>
        )}

        {/* Display Result */}
        {insights && !loading && (
          <div className="card bg-secondary text-light p-4 shadow-lg mt-4">
            <h4 className="border-bottom pb-2 text-warning">
              🧠 Insights for #{query}
            </h4>


            {/* Markdown Render */}
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h3 className="mt-4 text-warning">📌 {children}</h3>
                ),
                h2: ({ children }) => (
                  <h4 className="mt-3 text-info">🔧 {children}</h4>
                ),
                h3: ({ children }) => (
                  <h5 className="text-success">💡 {children}</h5>
                ),
                p: ({ children }) => <p className="mt-2">{children}</p>,
                strong: ({ children }) => (
                  <strong className="text-warning">{children}</strong>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-dark text-warning px-1 rounded">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {insights}
            </ReactMarkdown>

            {/* Show Efficient Approach */}
            {approachSection && !showApproach && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-light"
                  onClick={() => setShowApproach(true)}
                >
                  💡 Show Efficient Approach
                </button>
              </div>
            )}

            {showApproach && (
              <div className="mt-5 border-top pt-4">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h4 className="mt-3 text-info">🚀 {children}</h4>
                    ),
                    p: ({ children }) => <p className="mt-2">{children}</p>,
                  }}
                >
                  {approachSection}
                </ReactMarkdown>
              </div>
            )}

            {/* Resources Section */}
            {resourceLinks.length > 0 && (
              <div className="mt-5">
                <h5 className="text-info mb-3">📚 Learn More</h5>
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  {resourceLinks.map((link, idx) => (
                    <div className="col" key={idx}>
                      <div className="card bg-dark text-light h-100 border border-info">
                        <div className="card-body">
                          <h6 className="card-title text-info">{link.title}</h6>
                          <a
                            href={link.url}
                            className="btn btn-sm btn-outline-info mt-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            🌐 Visit Resource
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
  {/* Gradient Text Style */}
  <style>{`
        .gradient-text {
          background: linear-gradient(90deg, #0dcaf0, #6f42c1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      </div>

    

  );
}

export default SearchComponent;
