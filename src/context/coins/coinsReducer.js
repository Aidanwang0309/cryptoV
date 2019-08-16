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

export default (state, action) => {
  switch (action.type) {
    case GET_COINS:
      return { ...state, coins: action.payload, loading: false };
    case GET_FAVORITE_COINS:
      let crypto = JSON.parse(localStorage.getItem("crypto"));
      if (!crypto) {
        return { ...state, firstVisit: true };
      }
      let { favoriteCoins } = crypto;
      return {
        ...state,
        favoriteCoins: favoriteCoins,
        firstVisit: false,
        currentFavorite: favoriteCoins[0]
      };
    case ADD_FAVORITE_COIN:
      return {
        ...state,
        favoriteCoins: [...state.favoriteCoins, action.payload],
        firstVisit: false
      };
    case REMOVE_FAVORITE_COIN:
      return {
        ...state,
        favoriteCoins: state.favoriteCoins.filter(
          favoriteCoin => favoriteCoin !== action.payload
        )
      };
    case SAVE_FAVORITE_COINS:
      localStorage.setItem(
        "crypto",
        JSON.stringify({
          favoriteCoins: state.favoriteCoins
        })
      );
      return { ...state, firstVisit: false };
    case CLEAR_FAVORITE_COINS:
      localStorage.removeItem("crypto");
      return { ...state, favoriteCoins: [] };
    case FILTER_COINS:
      return { ...state, filteredCoins: action.payload };
    case FETCH_COINS_PRICES:
      return { ...state, coinPrices: action.payload, loading: false };
    case SET_CURRENT_FAVORITE:
      return { ...state, currentFavorite: action.payload };
    case FETCH_HISTORICAL:
      return { ...state, historical: action.payload };
    case CHANGE_CHART_SELECT:
      return { ...state, timeInterval: action.payload };
    default:
      return state;
  }
};
