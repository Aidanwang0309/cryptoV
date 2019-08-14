import React, { useReducer } from "react";
import CoinContext from "./coinsContext";
import CoinReducer from "./coinsReducer";
import {
  GET_COINS,
  GET_FAVORITE_COINS,
  ADD_FAVORITE_COIN,
  REMOVE_FAVORITE_COIN,
  SAVE_FAVORITE_COINS,
  CLEAR_FAVORITE_COINS,
  FILTER_COINS,
  FETCH_COINS_PRICES,
  SET_CURRENT_FAVORITE
} from "../types";
import _ from "lodash";
import fuzzy from "fuzzy";

const cc = require("cryptocompare");

const CoinState = props => {
  const initialState = {
    coins: null,
    favoriteCoins: [],
    filteredCoins: "",
    coinPrices: [],
    firstVisit: true,
    currentPage: "",
    currentFavorite: ""
  };

  const [state, dispatch] = useReducer(CoinReducer, initialState);

  const getCoins = async () => {
    try {
      const res = await cc.coinList();
      dispatch({
        type: GET_COINS,
        payload: res.Data
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getFavoriteCoins = () => {
    dispatch({
      type: GET_FAVORITE_COINS
    });
  };

  const addFavoriteCoin = coinKey => {
    dispatch({
      type: ADD_FAVORITE_COIN,
      payload: coinKey
    });
  };

  const removeFavoriteCoin = coinKey => {
    dispatch({
      type: REMOVE_FAVORITE_COIN,
      payload: coinKey
    });
  };

  const saveFavoriteCoins = () => {
    dispatch({
      type: SAVE_FAVORITE_COINS
    });
  };

  const clearFavoriteCoins = () => {
    dispatch({
      type: CLEAR_FAVORITE_COINS
    });
  };

  const handleFilter = _.debounce((inputValue, coins) => {
    let coinSymbols = Object.keys(coins);
    let coinNames = coinSymbols.map(sym => coins[sym].CoinName);
    let allStringToSearch = coinSymbols.concat(coinNames);

    let fuzzyResult = fuzzy
      .filter(inputValue, allStringToSearch, {})
      .map(result => result.string);
    // console.log(fuzzyResult);

    let filteredCoins = _.pickBy(coins, (result, symKey) => {
      let coinName = result.CoinName;
      return (
        _.includes(fuzzyResult, symKey) || _.includes(fuzzyResult, coinName)
      );
    });

    dispatch({
      type: FILTER_COINS,
      payload: filteredCoins
    });
  }, 500);

  const filterCoins = text => {
    handleFilter(text, state.coins);
  };

  const fetchCoinPrice = async () => {
    let prices = [];
    getFavoriteCoins();
    for (let coin of state.favoriteCoins) {
      try {
        const price = await cc.priceFull(coin, "USD");
        prices.push(price);
      } catch (err) {
        console.log(err);
      }
    }
    dispatch({
      type: FETCH_COINS_PRICES,
      payload: prices
    });
  };

  const setCurrentFavorite = index => {
    dispatch({
      type: SET_CURRENT_FAVORITE,
      payload: index
    });
  };

  return (
    <CoinContext.Provider
      value={{
        coins: state.coins,
        favoriteCoins: state.favoriteCoins,
        filteredCoins: state.filteredCoins,
        coinPrices: state.coinPrices,
        firstVisit: state.firstVisit,
        currentPage: state.currentPage,
        currentFavorite: state.currentFavorite,
        getCoins,
        getFavoriteCoins,
        addFavoriteCoin,
        removeFavoriteCoin,
        saveFavoriteCoins,
        clearFavoriteCoins,
        filterCoins,
        fetchCoinPrice,
        setCurrentFavorite
      }}
    >
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinState;
