import React, { useContext, useEffect, Fragment } from "react";
import CoinContext from "../../context/coins/coinsContext";
import styled from "styled-components";
import CoinGrid from "../../components/layout/CoinGrid";
import GridItem from "../../components/layout/GridItem";
// import { fontSize1, greenBoxShadow, color3 } from "../../utils/Styles";

const Setting = () => {
  const coinContext = useContext(CoinContext);
  const { coins, favoriteCoins, getCoins } = coinContext;

  useEffect(() => {
    getCoins();
    // eslint-disable-next-line
  }, []);

  return coins === null ? null : (
    <Fragment>
      <CoinGrid selected />
      <CoinGrid />
    </Fragment>
  );
};

export default Setting;
