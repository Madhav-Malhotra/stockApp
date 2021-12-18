import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export default function StockChart(props) {
  const [series, setSeries] = useState([]);

  const options = {
    chart: {
      type: "candlestick",
      height: 350
    },
    title: {
      text: `${props.company.description} (${props.company.symbol}) - 1 year`,
      align: "left"
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  //Fetch call
  useEffect(() => {
    //Whenever company changes, get Company profile info
    const query = `https://finnhub.io/api/v1/stock/candle?symbol=${props.company.symbol}&resolution=D&count=540&token=btba34f48v6s28kj9760`;
    fetch(query)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        else return res;
      })
      .then((response) => response.json())
      .then((data) => {
        const length = data.c.length - 1;

        let newInput = [];
        for (let i = 0; i < length; i++) {
          newInput[i] = {
            x: new Date(0).setUTCSeconds(data.t[i]),
            y: [
              data.o[i].toFixed(2),
              data.h[i].toFixed(2),
              data.l[i].toFixed(2),
              data.c[i].toFixed(2)
            ]
          };
        }

        setSeries(newInput);
      })
      .catch((err) => console.error(err));
  }, [props.company]);

  return (
    <div className="stock-chart mt-2">
      {series ? (
        <ReactApexChart
          options={options}
          series={[{ data: series }]}
          type="candlestick"
          height={350}
        />
      ) : (
        "Loading data..."
      )}
    </div>
  );
}

// https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1572651390&to=1572910590&token=btba34f48v6s28kj9760
//y format for Apexcharts is ohlc
