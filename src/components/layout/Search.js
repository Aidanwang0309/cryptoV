import React, { useContext, useState } from "react";
import CoinContext from "../../context/coins/coinsContext";
import styled from "styled-components";

const Input = styled.input`
  margin: 10px;
  padding: 20px;
`;

const Search = () => {
  const coinContext = useContext(CoinContext);
  const { filterCoins } = coinContext;

  const [text, setText] = useState("");

  //   const handleFilter = _.debounce((text, coins) => {
  //     let coinSymbols = Object.keys(coins);
  //     let coinNames = coinSymbols.map(sym => coins[sym].CoinName);
  //     let allStringToSearch = coinSymbols.concat(coinNames);
  //     filterCoins(text, allStringToSearch);
  //   }, 500);

  const handleChange = e => {
    setText(e.target.value);
    filterCoins(text);
  };
  return <Input onChange={handleChange} />;
};

export default Search;
