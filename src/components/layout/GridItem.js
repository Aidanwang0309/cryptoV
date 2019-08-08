import React, { useContext } from "react";
import CoinContext from "../../context/coins/coinsContext";
import styled from "styled-components";
import { blurBackground } from "../../utils/Styles";

const GridItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Blurback = styled.div`
  ${blurBackground}
  ${"" /* ${lightBlueBackground} */}
  background-color: #808080;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const GridItem = props => {
  const { logo, name, coinkey } = props;

  const coinContext = useContext(CoinContext);
  const { addFavoriteCoin } = coinContext;

  return (
    <div
      onClick={() => addFavoriteCoin(coinkey)}
      style={{ position: "relative", margin: "10px", overflow: "hidden" }}
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
    </div>
  );
};

export default GridItem;
