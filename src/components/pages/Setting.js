import React, { useContext, useEffect, Fragment } from "react";
import CoinContext from "../../context/coins/coinsContext";
import styled from "styled-components";
import CoinGrid from "../../components/layout/Setting/CoinGrid";
import Button from "../../components/layout/Button";
import Search from "../layout/Search";
// import { fontSize1, greenBoxShadow, color3 } from "../../utils/Styles";
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 15px;
`;

const Setting = props => {
  const coinContext = useContext(CoinContext);
  const {
    loading,
    coins,
    favoriteCoins,
    filteredCoins,
    getCoins,
    saveFavoriteCoins,
    getFavoriteCoins,
    clearFavoriteCoins
  } = coinContext;

  useEffect(() => {
    getCoins();
    getFavoriteCoins();
    // eslint-disable-next-line
  }, []);

  const saveCoins = () => {
    saveFavoriteCoins();
    props.history.push("/dashboard");
  };

  return coins === null ? null : (
    <Fragment>
      {favoriteCoins.length > 0 ? (
        <CoinGrid selected />
      ) : (
        <h2> Please Select Coins</h2>
      )}
      <Grid>
        <Button handleClick={saveCoins} name="SAVE FAVORITE" />
        {favoriteCoins.length > 0 ? (
          <Button handleClick={clearFavoriteCoins} name="CLEAR" />
        ) : null}
        <Search />
      </Grid>
      {loading ? (
        <h1>Loading</h1>
      ) : filteredCoins ? (
        <CoinGrid filtered />
      ) : (
        <CoinGrid />
      )}
    </Fragment>
  );
};

export default Setting;
