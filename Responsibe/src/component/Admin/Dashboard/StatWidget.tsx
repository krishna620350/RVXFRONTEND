import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import type { ReactNode } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatWidgetProps {
  title: string;
  value: number | ReactNode;
  color: string;
  data: number[];
  labels: string[];
  startLabel?: string;
  endLabel?: string;
}

const StatWidget: React.FC<StatWidgetProps> = ({ title, value, color, data, labels, startLabel, endLabel }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: "#fff",
        backgroundColor: color,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: true, ticks: { color: '#ccc', font: { size: 10 } } },
      y: { display: false },
    },
  };
  return (
    <div className={`rounded-lg shadow-lg p-6 flex flex-col items-center ${color} text-white`}>
      <span className="text-lg font-semibold mb-2">{title}</span>
      <span className="text-3xl font-bold mb-2">{value}</span>
      <div className="w-full h-16">
        <Line data={chartData} options={options} height={64} />
      </div>
      {/* Show only start and end month labels if provided */}
      {startLabel && endLabel && (
        <div className="flex justify-between w-full mt-2 px-1">
          <span className="text-xs text-gray-300 font-mono">{startLabel}</span>
          <span className="text-xs text-gray-300 font-mono">{endLabel}</span>
        </div>
      )}
    </div>
  );
};

export default StatWidget;
