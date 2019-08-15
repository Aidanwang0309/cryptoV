import React from "react";
import ReactHighCharts from "react-highcharts";
import chartConfig from "./PriceChartConfig";
import PriceChartTheme from "./PriceChartTheme";

ReactHighCharts.Highcharts.setOptions(PriceChartTheme);

const PriceChart = props => {
  const { coin } = props;

  return (
    <div style={{ marginLeft: "40px" }}>
      <ReactHighCharts config={chartConfig()} />
    </div>
  );
};

export default PriceChart;
