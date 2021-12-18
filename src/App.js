import React, { useState } from "react";
import CompanyHeader from "./Components/CompanyHeader";
import Search from "./Components/Search";
import BasicFinancials from "./Components/BasicFinancials";
import StockChart from "./Components/StockChart";
import AnalystRecommendations from "./Components/AnalystRecommendations";
import Newslist from "./Components/Newslist";

function App() {
  //Global state for selected company
  const [company, setCompany] = useState({
    description: "Tesla Inc",
    symbol: "TSLA"
  });

  return (
    <div className="container">
      <div className="App">
        {/* Header here */}
        <div className="row header mx-0">
          <div className="col-7 company-header">
            <CompanyHeader company={company} />
          </div>
          <div className="col-5 search">
            <Search setCompany={setCompany} />
          </div>
        </div>

        {/* Financials here */}
        <div className="row financials mt-2">
          <div className="col-3 basics">
            <BasicFinancials company={company} />
          </div>
          <div className="col-5 stock">
            <StockChart company={company} />
          </div>
          <div className="col-4 recommendation">
            <AnalystRecommendations company={company} />
          </div>
        </div>

        <hr />

        {/* News here */}
        <div className="row news">
          <div className="col-12">
            <Newslist company={company}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
