import React, { useState, useEffect } from "react";

export default function BasicFinancials(props) {
  const [financialData, setFinancialData] = useState(initialState);
  const [quoteData, setQuoteData] = useState(init2);

  useEffect(() => {
    //Whenever company changes, get Company profile info
    const query = `https://finnhub.io/api/v1/stock/metric?symbol=${props.company.symbol}&metric=all&token=btba34f48v6s28kj9760`;
    fetch(query)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        else return res;
      })
      .then((response) => response.json())
      .then((data) => setFinancialData(data))
      .catch((err) => console.error(err));

    const query2 = `https://finnhub.io/api/v1/quote?symbol=${props.company.symbol}&token=btba34f48v6s28kj9760`;
    fetch(query2)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        else return res;
      })
      .then((response) => response.json())
      .then((data) => setQuoteData(data))
      .catch((err) => console.error(err));
  }, [props.company]);

  const percentChange = (
    ((parseFloat(quoteData.c) - parseFloat(quoteData.pc)) /
      parseFloat(quoteData.c)) *
    100
  ).toFixed(2);

  return (
    <div className="basic-financials text-left">
      <p className="mb-0 ml-4 mt-2">Current price</p>
      <h1 className="ml-4 mb-0">{"$" + parseFloat(quoteData.c).toFixed(2)}</h1>
      <p className="ml-4">
        Since last close: {percentChange}%
        <span
          style={
            percentChange >= 0 ? { color: "#188811" } : { color: "#FF0000" }
          }
        >
          {" "}
          {percentChange >= 0 ? "▲" : "▼"}
        </span>
      </p>

      <hr className="ml-3" />

      <div className="row ml-4 mt-3">
        <div className="metric-entry col-6">
          <p className="mb-0">Daily high</p>
          <h5 className="mb-0">{"$" + parseFloat(quoteData.h).toFixed(2)}</h5>
        </div>
        <div className="metric-entry col-6">
          <p className="mb-0">Daily low</p>
          <h5 className="mb-0">{"$" + parseFloat(quoteData.l).toFixed(2)}</h5>
        </div>
      </div>

      <div className="row ml-4 mt-3">
        <div className="metric-entry col-6">
          <p className="mb-0">52-week high</p>
          <h5 className="mb-0">
            {"$" + parseFloat(financialData.metric["52WeekHigh"]).toFixed(2)}
          </h5>
          <p>({financialData.metric["52WeekHighDate"]})</p>
        </div>
        <div className="metric-entry col-6">
          <p className="mb-0">52-week low</p>
          <h5 className="mb-0">
            {"$" + parseFloat(financialData.metric["52WeekLow"]).toFixed(2)}
          </h5>
          <p>({financialData.metric["52WeekLowDate"]})</p>
        </div>
      </div>

      <div className="row ml-4">
        <div className="metric-entry col-6">
          <p className="mb-0">Market Cap</p>
          <h5>
            {"$" +
              (
                parseFloat(financialData.metric["marketCapitalization"]) / 1000
              ).toFixed(2) +
              " B"}
          </h5>
        </div>
        <div className="metric-entry col-6">
          <p className="mb-0">EPS (TTM)</p>
          <h5>
            {"$" +
              parseFloat(
                financialData.metric["epsBasicExclExtraItemsTTM"]
              ).toFixed(2)}
          </h5>
        </div>
      </div>
    </div>
  );
}

//'https://finnhub.io/api/v1/quote?symbol=AAPL&token=btba34f48v6s28kj9760'
//https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=btba34f48v6s28kj9760
const initialState = {
  metric: {
    "52WeekHigh": null,
    "52WeekLow": null
  }
};
const init2 = {
  c: "",
  h: "",
  l: "",
  pc: ""
};
