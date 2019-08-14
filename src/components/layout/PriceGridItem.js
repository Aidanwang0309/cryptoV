import React, { useContext } from "react";
import CoinContext from "../../context/coins/coinsContext";
import styled, { css } from "styled-components";
import { blurBackground } from "../../utils/Styles";
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
  ${props =>
    props.current &&
    css`
      box-shadow: inset 0px 0px 15px -2px #35d6b8;
    `}
`;

const Percentage = styled.p`
  color: green;
  ${props =>
    props.drop &&
    css`
      color: red;
    `}
`;

const PriceGridItem = props => {
  const { name, changeRate, price } = props;

  const coinContext = useContext(CoinContext);
  const { currentFavorite, setCurrentFavorite } = coinContext;

  const formatNumber = num => {
    return num.toFixed(3);
  };

  return (
    <SelectableContainer
      current={currentFavorite === name}
      onClick={() => setCurrentFavorite(name)}
    >
      <Blurback />
      <GridItemBox>
        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between"
          }}
        >
          {/* <img
            style={{ height: "50px", marginTop: "1em" }}
            src={`https://cryptocompare.com/${logo}`}
            alt="coin logo"
          /> */}
          <p>{name}</p>
          <Percentage drop={changeRate < 0}>
            {formatNumber(changeRate)}
          </Percentage>
        </div>
        <h2>${formatNumber(price)}</h2>
      </GridItemBox>
    </SelectableContainer>
  );
};

export default PriceGridItem;
