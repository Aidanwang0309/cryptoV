import React, { useContext } from "react";
import styled from "styled-components";
import CoinContext from "../../context/coins/coinsContext";
import GridItem from "./GridItem";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const CoinGrid = ({ selected }) => {
  const coinContext = useContext(CoinContext);
  const { coins, favoriteCoins, getCoins } = coinContext;

  const showCoins = cs => {
    const coinKeys = selected ? favoriteCoins : Object.keys(cs).splice(0, 30);
    return coinKeys.map(coinKey => (
      <GridItem
        key={coins[coinKey].Id}
        coinkey={coins[coinKey].Name}
        name={coins[coinKey].CoinName}
        logo={coins[coinKey].ImageUrl}
      />
    ));
  };
  return <Grid>{showCoins(coins)}</Grid>;
};

export default CoinGrid;
