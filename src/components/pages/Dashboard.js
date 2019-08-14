import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import CoinContext from "../../context/coins/coinsContext";
import PriceGrid from "../layout/PriceGrid";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 250px));
  grid-gap: 15px;
`;

const Dashboard = () => {
  const coinContext = useContext(CoinContext);
  const { coinPrices, favoriteCoins, fetchCoinPrice } = coinContext;

  useEffect(() => {
    fetchCoinPrice();
    // eslint-disable-next-line
  }, [favoriteCoins.length]);

  // console.log(coinPrices);

  return (
    <Grid>
      {coinPrices.map(price => (
        <PriceGrid price={price} />
      ))}
    </Grid>
  );
};

export default Dashboard;
