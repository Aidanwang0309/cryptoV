import React, { useEffect, useContext, Fragment } from "react";
import styled from "styled-components";
import CoinContext from "../../context/coins/coinsContext";
import PriceGrid from "../layout/Dashboard/PriceGrid";
import PriceProfile from "../layout/Dashboard/PriceProfile";
import PriceChart from "../layout/Dashboard/PriceChart";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 250px));
  grid-gap: 15px;
  padding: 40px;
`;

const Info = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const Dashboard = () => {
  const coinContext = useContext(CoinContext);
  const {
    coins,
    getCoins,
    coinPrices,
    favoriteCoins,
    fetchCoinPrice,
    currentFavorite
  } = coinContext;

  useEffect(() => {
    getCoins();
    fetchCoinPrice();

    // eslint-disable-next-line
  }, [favoriteCoins.length]);

  return (
    <Fragment>
      <Grid>
        {coinPrices.map(price => (
          <PriceGrid key={Object.keys(price)[0]} price={price} />
        ))}
      </Grid>

      {coins && currentFavorite ? (
        <Info>
          <PriceProfile coin={coins[currentFavorite]} />
          <PriceChart />
        </Info>
      ) : null}
    </Fragment>
  );
};

export default Dashboard;
