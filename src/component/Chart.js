import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = ({ targetSheetData }) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={targetSheetData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="名稱" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="國文" stackId="a" fill="#185f99" />
      <Bar dataKey="英文" stackId="a" fill="#277bc0" />
      <Bar dataKey="數學" stackId="a" fill="#ffb200" />
      <Bar dataKey="體育" stackId="a" fill="#ffcb42" />
    </BarChart>
  );
};

export default Chart;
