import { BASKET_ADD, BASKET_CLEAR, BASKET_DELETE, BASKET_LIST } from "../constants/basket.constant";


export function basketItemAdded(key, data){
  return {
    type: BASKET_ADD,
    payload: {
      key, data
    }
  }
}

export function basketItemRemoved(key){
  return {
    type: BASKET_DELETE,
    payload: key
  }
}

export function basketList(items){
  return {
    type: BASKET_LIST,
    payload: items
  }
}

export function basketClear(){
  return {
    type: BASKET_CLEAR
  }
}