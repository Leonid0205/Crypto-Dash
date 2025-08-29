const API_URl = import.meta.env.VITE_COIN_API_URL;
import {
  Chart as CharJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

type CoinChartProps = {
  coinId: string;
};

type ChartData = {
  datasets: {
    label: string;
    data: { x: number; y: number }[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    pointRadius: number;
    tension: number;
  }[];
};

CharJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const CoinChart = ({ coinId }: CoinChartProps) => {
  const [chartData, setChartData] = useState<ChartData>({
    datasets: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch(
        `${API_URl}/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      const data = await res.json();
      const prices = data.prices.map((price: number[]) => ({
        x: price[0],
        y: price[1],
      }));
      setChartData({
        datasets: [
          {
            label: "Price (USD)",
            data: prices,
            fill: true,
            backgroundColor: "#007bff",
            borderColor: "rgba(0,123,255,0.7)",
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });
      setLoading(false);
    };
    fetchPrices();
  }, [coinId]);
  if (loading) {
    return <p>Loading Chart...</p>;
  }
  return (
    <div className=".coinChart-container">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              type: "time",
              time: { unit: "day" },
              ticks: { autoSkip: true, maxTicksLimit: 7 },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString("en-US")}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;
