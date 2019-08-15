import React, { useContext } from "react";
import styled from "styled-components";
import CoinContext from "../../../context/coins/coinsContext";
import CoinGridItem from "./CoinGridItem";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
  grid-gap: 15px;
`;

const CoinGrid = ({ selected, filtered }) => {
  const coinContext = useContext(CoinContext);
  const { coins, favoriteCoins, filteredCoins } = coinContext;

  const showCoins = cs => {
    let coinsKeys = Object.keys(cs).splice(0, 30);

    if (selected) {
      coinsKeys = favoriteCoins;
    }
    if (filtered) {
      // console.log(filteredCoins);
      coinsKeys = Object.keys(filteredCoins).splice(0, 30);
    }

    return coinsKeys.map(coinKey => (
      <CoinGridItem
        selected={selected}
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
