import React, { useContext } from "react";
import CoinContext from "../../../context/coins/coinsContext";
import styled from "styled-components";
import { blurBackground } from "../../../utils/Styles";
import _ from "lodash";

const GridItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Blurback = styled.div`
  ${blurBackground}
  border: 2px solid white;
  background-color: #808080;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
  border: ;
`;

const Container = styled.div`
  position: relative;
  margin: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const SelectableContainer = styled(Container)`
  :hover {
    box-shadow: inset 0px 0px 15px -2px #35d6b8;
  }
`;

const DeletableContainer = styled(Container)`
  :hover {
    box-shadow: inset 0px 0px 15px -2px #ff92a1;
  }
`;

const DisabledContainer = styled(Container)`
  pointer-events: none;
  opacity: 0.2;
`;

const CoinGridItem = props => {
  const { logo, name, coinkey, selected } = props;

  const coinContext = useContext(CoinContext);
  const { favoriteCoins, addFavoriteCoin, removeFavoriteCoin } = coinContext;

  // const isFavorite = () => {
  //   return _.includes(favoriteCoins, coinkey);
  // };

  const ItemContainer = selected
    ? DeletableContainer
    : _.includes(favoriteCoins, coinkey)
    ? DisabledContainer
    : SelectableContainer;

  return (
    <ItemContainer
      onClick={() =>
        selected ? removeFavoriteCoin(coinkey) : addFavoriteCoin(coinkey)
      }
    >
      <Blurback />
      <GridItemBox>
        <img
          style={{ height: "50px", marginTop: "1em" }}
          src={`https://cryptocompare.com/${logo}`}
          alt="coin logo"
        />
        <p>{name}</p>
      </GridItemBox>
    </ItemContainer>
  );
};

export default CoinGridItem;
