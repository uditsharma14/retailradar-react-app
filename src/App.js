import React, { useState } from "react";

function App() {
  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "",
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = async () => {
    setError(""); // Clear previous errors
    try {
      if (!searchParams.query) {
        setError("Query cannot be empty");
        return;
      }

      const response = await fetch(
        `http://127.0.01:5000/search?query=${encodeURIComponent(
          searchParams.query
        )}&category=${encodeURIComponent(searchParams.category)}`,
        {
          mode: "cors", // Ensure CORS mode is enabled
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      console.log(data)
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError("An error occurred while fetching results. Please try again.");
      setResults([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Page</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Query:
          <input
            type="text"
            name="query"
            value={searchParams.query}
            onChange={handleInputChange}
            placeholder="Enter search term"
            style={{ margin: "0 10px" }}
          />
        </label>

        <button onClick={handleSearch} style={{ padding: "5px 15px" }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h2>Results:</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>Title:</strong> {result.product_title} <br />
                <strong>Review:</strong> {result.Popular_Review} <br />
                <strong>Rating:</strong> {result.star_rating}/5
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default App;