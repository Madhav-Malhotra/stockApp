import React, { useState, useEffect } from "react";
import { tickers } from "../data/tickers";

export default function Search(props) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [results, setResults] = useState([{}]);

  //Handles search query inputs
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  //Handles click on search results
  const handleClick = (description, symbol) => {
    props.setCompany({ description, symbol });
  };

  //Whenever search query changes
  useEffect(() => {
    let matches = [];

    for (let i in tickers) {
      //Go through available companies
      const item = tickers[i];
      if (query) {
        if (
          //If query matches current company name / ticker
          item.symbol.includes(query.toUpperCase()) ||
          item.description.includes(query.toUpperCase())
        ) {
          //Add company to search results
          matches.push({ symbol: item.symbol, description: item.description });
        }
      }

      if (matches.length > 2) break; //If you have more than 3 results, stop
    }

    //If you have no results, put in an error message
    if (matches.length === 0) matches.push({ error: "No results found" });

    setResults(matches);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search company name or ticker..."
        onChange={handleChange}
        onFocus={() => setVisible(true)} //When you focus on input, make dropdown visible
        onBlur={() => setTimeout(() => setVisible(false), 100)} //After click on dropdown registered, set it invisible
        value={query}
      />
      <div
        className="search-results mt-0 text-left"
        style={visible ? { display: "block" } : { display: "none" }}
      >
        <ul>
          {results[0].error ? (
            <li>{results[0].error}</li> //If no results, return this
          ) : (
            results.map((
              item //Else, create list items of results
            ) => (
              <li
                key={Math.random()}
                onClick={() => handleClick(item.description, item.symbol)}
              >
                {`${item.description} (${item.symbol})`}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
