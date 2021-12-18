import React, { useEffect, useState } from "react";
import NewsTile from "./NewsTile";

export default function Newslist(props) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const to = new Date().toISOString().slice(0, 10);
    let from = new Date().setFullYear(new Date().getFullYear() - 1);
    from = new Date(from).toISOString().slice(0, 10);

    //Whenever company changes, get Company profile info
    const query = `https://finnhub.io/api/v1/company-news?symbol=${props.company.symbol}&from=${from}&to=${to}&token=btba34f48v6s28kj9760`;
    fetch(query)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        else return res;
      })
      .then((response) => response.json())
      .then((data) => setResults(data.slice(0, 5)))
      .catch((err) => console.error(err));
  }, [props.company]);

  return (
    <div className="newslist-container">
      {results.map((item) => (
        <NewsTile data={item} key={item.url} />
      ))}
    </div>
  );
}
