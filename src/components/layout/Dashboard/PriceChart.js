import React, { useContext } from "react";
import ReactHighCharts from "react-highcharts";
import chartConfig from "./PriceChartConfig";
import PriceChartTheme from "./PriceChartTheme";
import CoinContext from "../../../context/coins/coinsContext";
import styled from "styled-components";
import { lightBlueBackground, fontSize2 } from "../../../utils/Styles";

ReactHighCharts.Highcharts.setOptions(PriceChartTheme);

const ChartSelect = styled.select`
  ${lightBlueBackground};
  color: white;
  ${fontSize2};
  border:1px solid
  float:right;
`;

const Chart = styled.div`
  ${lightBlueBackground};
  margin-left: 40px;
`;

const PriceChart = () => {
  const coinContext = useContext(CoinContext);
  const { historical, changeChartSelect, fetchHistorical } = coinContext;

  const handleChange = e => {
    changeChartSelect(e.target.value);
    fetchHistorical();
  };

  return (
    <Chart>
      <ChartSelect defaultValue={"months"} onChange={handleChange}>
        <option value="days">Days</option>
        <option value="weeks">Weeks</option>
        <option value="months">Months</option>
      </ChartSelect>
      <ReactHighCharts config={chartConfig(historical)} />
    </Chart>
  );
};

export default PriceChart;
