const BASKET_KEY = "basket";

const addToBasket = (item) => {
  let items = localStorage.getItem(BASKET_KEY);

  if (items == null){
    items = [];
  }
  items.push(item);

  localStorage.setItem(BASKET_KEY, items);
}