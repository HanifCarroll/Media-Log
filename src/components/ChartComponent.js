import React from "react";
import ReactChartkick, { PieChart } from "react-chartkick";
import Chart from "chart.js";

ReactChartkick.addAdapter(Chart);
const options = {
  legend: {
    labels: {
      fontColor: "black",
      fontStyle: "bold"
    }
  }
};

const ChartComponent = ({ chartData }) => (
  <div>
    <PieChart data={chartData} library={options} />
  </div>
);

export default ChartComponent;
