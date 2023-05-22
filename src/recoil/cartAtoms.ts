import {atom, selector, selectorFamily} from 'recoil';
import {CartItem, NewCartItem, ProductItem} from '../types/types';
import {fetchAddCart, fetchDeleteCart, fetchUpdateCart} from "../api/api.ts";

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const cartCountSelector = selector({
  key: 'cartCountSelector',
  get: ({get}) => {
    const cartList = get(cartState);
    return cartList.length;
  }
});

export const checkedCartSelector = selector({
  key: 'checkedCartSelector',
  get: ({get}) => {
    const cartList = get(cartState);
    const checkedCartLst = cartList.filter((cartItem) => cartItem.checked);
    return checkedCartLst;
  }
});

export const checkedCartCountSelector = selector({
  key: 'checkedCartCountSelector',
  get: ({get}) => {
    const checkedCartList = get(checkedCartSelector);
    return checkedCartList.length;
  }
});

export const allCartCheckedSelector = selector({
  key: 'allCartCheckedSelector',
  get: ({get}) => {
    const cartList = get(cartState);
    const cartCount = get(cartCountSelector);
    if (cartCount > 0) {
      const isAllCartItemChecked = cartList.every((cartItem) => cartItem.checked);
      return isAllCartItemChecked;
    }

    return false;
  }
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({get}) => {
    const checkedCartList = get(checkedCartSelector);
    const totalPrice = checkedCartList.reduce((acc, cartItem) => acc + (cartItem.quantity * cartItem.product.price), 0);
    return totalPrice;
  }
});

export const quantityByProductIdSelector = selectorFamily({
  key: 'quantityByProductIdSelector',
  get: (productId: number) => ({get}) => {
    const cartList = get(cartState);
    const targetCart = cartList.find((cart) => cart.id === productId);
    return targetCart?.quantity ?? 0;
  },
});

export const addCartItemSelector = selectorFamily<ProductItem, undefined>({
  key: 'addCartItemSelector',
  get: () => (): ProductItem => {
    return {id: 0, imageUrl: "", name: "", price: 0};
  },
  set: () => ({get, set}, newProductItem) => {
    const product = newProductItem as ProductItem;
    const cartList = get(cartState);
    const isCartItemExist = cartList.some((cartItem) => cartItem.id === product.id);

    if (!isCartItemExist) {
      const newCartItem: NewCartItem = {
        id: product.id,
        quantity: 1,
        checked: true,
        product
      };
      const updatedCartList = [...cartList, newCartItem];
      set(cartState, updatedCartList);
      fetchAddCart(newCartItem.id);
    }
  }
});

export const removeCartItemSelector = selectorFamily<number, undefined>({
  key: 'removeCartItemSelector',
  get: () => () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set: () => ({get, set}, productId) => {
    const id = productId as number;
    const cartList = get(cartState);
    if (confirm('정말로 삭제하시겠습니까?')) {
      const removedCartList = cartList.filter((cart) => cart.id !== id);
      set(cartState, removedCartList);
      fetchDeleteCart(id);
    }
  },
});

export const updateCartItemQuantitySelector = selectorFamily<number, number>({
  key: 'updateCartItemQuantitySelector',
  get: () => () => {
    // 오류 방지를 위해 아무 값이나 리턴
    return -1;
  },
  set: (productId) => ({get, set}, newQuantity) => {
    const quantity = newQuantity as number;

    if (quantity === 0) {
      const id = productId as number;
      const cartList = get(cartState);
      if (confirm('정말로 삭제하시겠습니까?')) {
        const removedCartList = cartList.filter((cart) => cart.id !== id);
        set(cartState, removedCartList);
        fetchDeleteCart(id);
      }
    } else {
      const cartList = get(cartState);
      const targetIndex = cartList.findIndex((cartItem) => cartItem.id === productId);

      if (targetIndex !== -1) {
        const updatedCartList = [...cartList];
        updatedCartList[targetIndex] = {...updatedCartList[targetIndex], quantity};
        set(cartState, updatedCartList);

        fetchUpdateCart(productId, newQuantity as number);
      }
    }
  },
});
