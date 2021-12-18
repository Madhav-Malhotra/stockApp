import React, { useState, useEffect } from "react";
import { tickers } from "../data/tickers";

export default function CompanyHeader(props) {
  const [companyData, setCompanyData] = useState({
    name: "",
    ticker: "",
    logo: "",
    weburl: ""
  });
  const [relatedCompanies, setRelatedCompanies] = useState([]);

  useEffect(() => {
    //Whenever company changes, get Company profile info
    const query = `https://finnhub.io/api/v1/stock/profile2?symbol=${props.company.symbol}&token=btba34f48v6s28kj9760`;
    fetch(query)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        else return res;
      })
      .then((response) => response.json())
      .then((data) => setCompanyData(data))
      .catch((err) => console.error(err));

    const query2 = `https://finnhub.io/api/v1/stock/peers?symbol=${props.company.symbol}&token=btba34f48v6s28kj9760`;
    fetch(query2)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        else return res;
      })
      .then((response) => response.json())
      .then((data) => setRelatedCompanies(data))
      .catch((err) => console.error(err));
  }, [props.company]);

  let logo = companyData.logo ? companyData.logo : "../../Images/notFound.jpg";

  const related = relatedCompanies.slice(1, 4).map((co) => {
    let name;
    tickers.forEach((item) => {
      if (item.symbol === co) name = item.description;
    });
    if (!name) name = "Company not on NYSE";
    return <li key={co}>{`${name} (${co})`}</li>;
  });

  return (
    <div className="row">
      <div className="col-4 company-logo">
        <a href={companyData.weburl} target="_blank">
          <img src={logo} alt="company logo" />
        </a>
      </div>
      <div className="col-8 company-info text-left">
        <a href={companyData.weburl} target="_blank">
          <h1>{`${props.company.description} (${props.company.symbol})`}</h1>
        </a>
        <h5>Related companies:</h5>
        <ul>{related}</ul>
      </div>
    </div>
  );
}
