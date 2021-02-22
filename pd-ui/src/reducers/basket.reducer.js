import { BASKET_ADD, BASKET_CLEAR, BASKET_DELETE, BASKET_LIST } from "../constants/basket.constant";

const intiailState = {
  items: [],
};

export default function basketReducer(state = intiailState, { type, payload }) {
  switch (type) {
    case BASKET_ADD:
      let items = [...state.items, payload.data];
      return {
        items
      }
    case BASKET_DELETE:
      delete state.items[payload];
      return {...state}
    case BASKET_CLEAR:
      state.items = [];
      return {...state}
    case BASKET_LIST:
      state.items = payload;
      return {...state};
    default:
      return state;
  }
}
