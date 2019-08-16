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
  SET_CURRENT_FAVORITE,
  FETCH_HISTORICAL,
  CHANGE_CHART_SELECT
} from "../types";
import _ from "lodash";
import fuzzy from "fuzzy";
import moment from "moment";

const cc = require("cryptocompare");
const TIME_UNITS = 10;

const CoinState = props => {
  const initialState = {
    loading: true,
    coins: null,
    favoriteCoins: [],
    filteredCoins: "",
    coinPrices: [],
    firstVisit: true,
    currentPage: "",
    currentFavorite: "",
    historical: null,
    timeInterval: "months"
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
    prices = prices.filter(price => Object.keys(price).length);
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

  const fetchHistorical = async () => {
    let results = await historical();

    let historicaldata = [
      {
        name: state.currentFavorite,
        data: results.map((ticker, index) => [
          moment()
            .subtract({ [state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          ticker.USD
        ])
      }
    ];
    dispatch({
      type: FETCH_HISTORICAL,
      payload: historicaldata
    });
  };

  const historical = () => {
    let data = [];

    for (let units = TIME_UNITS; units > 0; units--) {
      data.push(
        cc.priceHistorical(
          state.currentFavorite,
          ["USD"],
          moment()
            .subtract({ [state.timeInterval]: units })
            .toDate()
        )
      );
    }
    return Promise.all(data);
  };

  const changeChartSelect = value => {
    console.log(value);
    dispatch({
      type: CHANGE_CHART_SELECT,
      payload: value
    });
  };

  return (
    <CoinContext.Provider
      value={{
        loading: state.loading,
        coins: state.coins,
        favoriteCoins: state.favoriteCoins,
        filteredCoins: state.filteredCoins,
        coinPrices: state.coinPrices,
        firstVisit: state.firstVisit,
        currentPage: state.currentPage,
        currentFavorite: state.currentFavorite,
        historical: state.historical,
        timeInterval: state.timeInterval,
        getCoins,
        getFavoriteCoins,
        addFavoriteCoin,
        removeFavoriteCoin,
        saveFavoriteCoins,
        clearFavoriteCoins,
        filterCoins,
        fetchCoinPrice,
        setCurrentFavorite,
        fetchHistorical,
        changeChartSelect
      }}
    >
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinState;
