import { useEffect, useState } from "react";

import axios from "axios";

import {

  Chart as ChartJS,

  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,

} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(

  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart() {

  const [chartData, setChartData] = useState({
    labels: [],
    sales: [],
  });

  // Fetch Chart Data
  const fetchChartData = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/orders/sales-chart/"
      );

      setChartData(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchChartData();

    // Auto Refresh
    const interval = setInterval(() => {

      fetchChartData();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const data = {

    labels: chartData.labels,

    datasets: [
      {
        label: "Sales",

        data: chartData.sales,

        backgroundColor: "#f97316",
      },
    ],
  };

  return (

    <div
      className="
      bg-white
      dark:bg-[#2c1d14]
      p-8
      rounded-3xl
      shadow-lg
    "
    >

      <h2
        className="
        text-3xl
        font-bold
        text-black
        dark:text-white
        mb-8
      "
      >
        Weekly Sales
      </h2>

      <Bar data={data} />

    </div>
  );
}