import React, { useReducer } from "react";
import CoinContext from "./coinsContext";
import CoinReducer from "./coinsReducer";
import {
  GET_COINS,
  GET_FAVORITE_COINS,
  ADD_FAVORITE_COIN,
  FILTER_COINS
} from "../types";

const cc = require("cryptocompare");

const CoinState = props => {
  const initialState = {
    coins: null,
    favoriteCoins: [],
    filtered: ""
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
    // console.log(coinKey);
    dispatch({
      type: ADD_FAVORITE_COIN,
      payload: coinKey
    });
  };

  return (
    <CoinContext.Provider
      value={{
        coins: state.coins,
        favoriteCoins: state.favoriteCoins,
        filtered: state.filtered,
        getCoins,
        getFavoriteCoins,
        addFavoriteCoin
      }}
    >
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinState;
