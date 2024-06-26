import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import currencyContext from "../../../contexts/currency-context";
import CoinDataTabs from "../coin-data-tabs/coin-data-tabs";
import TimeframeTabs from "../timeframe-tabs/timeframe-tabs";
import PriceChanges from "../price-changes/price-changes";
import "./coin-charts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

//############################################################################

function CoinCharts({ coinID, coinName, priceChangesData }) {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [currencyName] = useContext(currencyContext);
  const [allHistoricData, setAllHistoricData] = useState({});
  const [specificHistoricData, setSpecificHistoricData] = useState([]);
  const [datatype, setDatatype] = useState("prices");
  const [timeframe, setTimeframe] = useState(1);
  const [loading, setLoading] = useState(false);

  //############################################################################

  // Fetch chart data for a specific coin.
  useEffect(() => {
    coinID && fetchChartData("prices", 1).then();
  }, [coinID, currencyName]);

  //############################################################################

  // Fetch chart data based on chosen data type (prices, market cap, volume).
  async function fetchChartData(newDataType, newTimeframe) {
    try {
      console.log("Sending request for fetchChartData");
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currencyName}&days=${newTimeframe}?x_cg_demo_api_key=${API_KEY}`
      );
      setAllHistoricData(response.data);
      setSpecificHistoricData(response.data[datatype]);
      setDatatype(newDataType);
      setTimeframe(newTimeframe);
      if (response) {
        setLoading(false);
      }
      return response;
    } catch (err) {
      if (err.response.status === 404) {
        console.log("ERROR 404 FOUND");
        setLoading(false);
        throw new Response("Not Found", { status: 404 });
      } else {
        console.log("NETWORK ERROR FOUND");
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return await fetchChartData(newDataType, newTimeframe);
      }
    }
  }

  // Update chart data when user clicks on a different data type button.
  // This method was added so that we don't use fetchChartData method
  // therefore preventing us from making additional costly API calls.
  function updateChartData(newDataType) {
    setSpecificHistoricData(allHistoricData[newDataType]);
    setDatatype(newDataType);
  }

  //############################################################################

  const labels = {
    prices: "Prices",
    market_caps: "Market Caps",
    total_volumes: "Total Volumes",
  };

  const options = {
    locale: "en-US",
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        ticks: { padding: 10, color: "rgba(255,255,255,0.4)" },
        grid: {
          display: false,
          drawBorder: true,
          borderColor: "rgba(255, 255, 255, 0.6)",
          borderWidth: 2,
          tickBorderDashOffset: 50,
        },
      },
      y: {
        ticks: {
          padding: 10,
          color: "rgba(255,255,255,0.4)",
        },
        grid: {
          drawBorder: false,
          borderDash: [3, 3],
          drawTicks: false,
          color: "rgba(255,255,255,0.2)",
        },
      },
    },
    responsive: true,
  };

  // https://stackoverflow.com/questions/72998998/how-to-make-vertical-line-when-hovering-cursor-chart-js
  const plugins = [
    {
      afterDraw: (chart) => {
        if (chart.tooltip?._active?.length) {
          let x = chart.tooltip._active[0].element.x;
          let yAxis = chart.scales.y;
          let ctx = chart.ctx;
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([3, 3]);
          ctx.moveTo(x, yAxis.top);
          ctx.lineTo(x, yAxis.bottom);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(255,255,255,0.4)";
          ctx.stroke();
          ctx.restore();
        }
      },
    },
  ];

  const data = {
    labels: specificHistoricData.map((coin) => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()
            } PM`
          : `${date.getHours()}:${
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()
            } AM`;
      return timeframe == 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: specificHistoricData.map((coin) => coin[1]),
        label: ` ${currencyName.toUpperCase()}`,
        pointRadius: 0.5,
        tension: 0.7,
        fill: {
          target: "origin",
        },
        borderColor: ["#64efdf"],
        borderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 130, 0, 330);
          gradient.addColorStop(1, "rgba(52,151,149,0)");
          gradient.addColorStop(0, "rgba(52,151,149,100)");
          return gradient;
        },
      },
    ],
  };

  //############################################################################

  return (
    <div className="coin-charts-outer-container">
      <CoinDataTabs updateChartData={updateChartData} timeframe={timeframe} />
      <div className="coin-charts-inner-container">
        <div className="coin-charts-price-data">
          <p className="coin-charts-heading">
            {coinName} {labels[datatype]} Chart ({currencyName.toUpperCase()})
          </p>
          <TimeframeTabs fetchChartData={fetchChartData} datatype={datatype} />
        </div>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.6rem",
            }}
          >
            <CircularProgress
              style={{ color: "#b84dc3" }}
              size={450}
              thickness={1}
            />
            <Typography
              variant="caption"
              component="div"
              color="#dc7be7"
              fontSize="2rem"
            >{`Network Error - Data Will Load Soon!`}</Typography>
          </Box>
        ) : (
          <Line data={data} plugins={plugins} options={options} />
        )}
      </div>
      <PriceChanges priceChangesData={priceChangesData}></PriceChanges>
    </div>
  );
}

export default CoinCharts;
