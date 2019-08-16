import React from "react";
import styled from "styled-components";
import { lightBlueBackground } from "../../../utils/Styles";

const PriceProfileContainer = styled.div`
  ${lightBlueBackground}
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px;
`;

const PriceProfile = props => {
  const { coin } = props;

  //   const GetCoinImage = coinPrice.map(coinsPrice => {
  //     if (coinsPrice[currentFavorite]) {
  //       console.log(coinsPrice[currentFavorite]["USD"].IMAGEURL);
  //       return coinsPrice[currentFavorite]["USD"].IMAGEURL;
  //     }
  //   });

  return (
    <PriceProfileContainer>
      <h1>{coin.CoinName}</h1>
      <img src={`https://cryptocompare.com/${coin.ImageUrl}`} alt="coin logo" />
    </PriceProfileContainer>
  );
};

export default PriceProfile;
