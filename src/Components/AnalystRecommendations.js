import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export default function AnalystRecommendations(props) {
  const [series, setSeries] = useState([]);
  const [times, setTimes] = useState([]);

  //Fetch call
  useEffect(() => {
    //Whenever company changes, get Company profile info
    const query = `https://finnhub.io/api/v1/stock/recommendation?token=btba34f48v6s28kj9760&symbol=${props.company.symbol}`;
    fetch(query)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        else return res;
      })
      .then((response) => response.json())
      .then((data) => {
        let buy = {
          name: "Buy",
          data: []
        };
        let sell = {
          name: "Sell",
          data: []
        };
        let strongBuy = {
          name: "Strong Buy",
          data: []
        };
        let strongSell = {
          name: "Strong Sell",
          data: []
        };
        let hold = {
          name: "Hold",
          data: []
        };
        let timeData = [];

        data.forEach((time) => {
          strongSell.data.push(time.strongSell);
          strongBuy.data.push(time.strongBuy);
          sell.data.push(time.sell);
          buy.data.push(time.buy);
          hold.data.push(time.hold);

          const newDate = `${time.period.slice(5, 7)}/${time.period.slice(
            8,
            10
          )}/${time.period.slice(0, 4)} GMT`;
          timeData.push(newDate);
        });
        setSeries([strongSell, sell, hold, buy, strongBuy]);
        setTimes(timeData);
      })
      .catch((err) => console.error(err));
  }, [props.company]);

  let options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    title: {
      text: `${props.company.description} Recommendation Trends`,
      align: "left"
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
      type: "datetime",
      categories: times //"MM/DD/YYYY GMT"
    },
    legend: {
      position: "top",
      offsetY: -10
    },
    fill: {
      opacity: 1
    }
  };

  return (
    <div className="analyst-container mt-2 mr-3">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}

//'https://finnhub.io/api/v1/stock/recommendation?symbol=AAPL&token=btba34f48v6s28kj9760'
