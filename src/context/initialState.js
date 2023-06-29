import { fetchCart, fetchLocalStorage } from '../utils/fetchLocalStorage';

const userInfo = fetchLocalStorage();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo ? userInfo : null,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
