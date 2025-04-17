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
      const response = await fetch(`https://leet-insights.onrender.com/leetcode/${query}`);
      const data = await response.json();
      const fullContent = data.insights || "No insights available.";

      const parts = fullContent.split("## Efficient Approach Overview");
      setInsights(parts[0].trim());

      if (parts.length > 1) {
        setApproachSection("## Efficient Approach Overview" + parts[1]);
      }

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
    <div className="container mt-5">
      {/* Search Bar */}
      <div className="input-group mb-4">
      <input
  type="text"
  className="form-control bg-dark text-light border-secondary"
  placeholder="Enter problem number"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleSearch();
  }}
/>

        <button className="btn btn-outline-success" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Terminal Style Output */}
      {loading && (
        <div className="terminal-box mt-4">
          <div className="terminal-bar">
            <span className="circle red" />
            <span className="circle yellow" />
            <span className="circle green" />
            <span className="terminal-title">Loading...</span>
          </div>
          <div className="terminal-content">
            <p>Talking to Gemini... <br />
            Please note that the process may take a little longer as we fetch the results.</p>
          </div>
        </div>
      )}

      {insights && !loading && (
        <div className="terminal-box mt-4">
          <div className="terminal-bar">
            <span className="circle red" />
            <span className="circle yellow" />
            <span className="circle green" />
            <span className="terminal-title">Problem #{query}</span>
          </div>
          <div className="terminal-content">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h3 className="text-highlight">📌 {children}</h3>,
                h2: ({ children }) => <h4 className="text-highlight">{children}</h4>,
                h3: ({ children }) => <h5 className="text-highlight">💡 {children}</h5>,
                p: ({ children }) => <p>{children}</p>,
                strong: ({ children }) => <strong className="text-highlight">{children}</strong>,
                li: ({ children }) => <li>{children}</li>,
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
                    <code className="bg-dark text-highlight px-1 rounded">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {insights}
            </ReactMarkdown>

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
                    h2: ({ children }) => <h4 className="text-highlight">🚀 {children}</h4>,
                    p: ({ children }) => <p>{children}</p>,
                  }}
                >
                  {approachSection}
                </ReactMarkdown>
              </div>
            )}

            {resourceLinks.length > 0 && (
              <div className="mt-5">
                <h5 className="text-highlight mb-3">📚 Learn More</h5>
                <ul>
                  {resourceLinks.map((link, idx) => (
                    <li key={idx}>
                      <a href={link.url} className="text-success" target="_blank" rel="noopener noreferrer">
                        {link.title} 🔗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .terminal-box {
          background-color: #111111;
          color: #0f0;
          border-radius: 10px;
          border: 0.1px solid white;
          font-family: 'Courier New', Courier, monospace;

        }
        .terminal-bar {
          background-color: #222;
          border-radius: 10px 10px 0 0;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .circle {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }
        .red { background-color: #f55; }
        .yellow { background-color: #ff5; }
        .green { background-color: #5f5; }
        .terminal-title {
          margin-left: auto;
          font-weight: bold;
          color: #ccc;
        }
        .terminal-content {
          padding: 2rem;
        }
        .text-highlight {
          color: #0ff;
        }
      `}</style>
    </div>
  );
}

export default SearchComponent;
