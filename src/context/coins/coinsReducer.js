import {
  GET_COINS,
  GET_FAVORITE_COINS,
  ADD_FAVORITE_COIN,
  FILTER_COINS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_COINS:
      return { ...state, coins: action.payload };
    case GET_FAVORITE_COINS:
      return state;
    case FILTER_COINS:
      return state;
    case ADD_FAVORITE_COIN:
      return {
        ...state,
        favoriteCoins: [...state.favoriteCoins, action.payload]
      };
    default:
      return state;
  }
};
