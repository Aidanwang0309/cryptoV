import React, { Fragment } from "react";
import styled from "styled-components";

const PriceProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2a2e49;
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
      <img src={`https://cryptocompare.com/${coin.ImageUrl}`} />
    </PriceProfileContainer>
  );
};

export default PriceProfile;
