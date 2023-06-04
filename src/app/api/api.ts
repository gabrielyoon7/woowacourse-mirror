import {
  CartItem,
  ProductItem,
  ReceivedCartItem,
  Sign,
  User,
} from "../../types/types.ts";
import { url } from "./url.ts";
import { getSessionStorage } from "../utils/storage.ts";
import { SESSION_STORAGE_KEY_BASE64 } from "../keys.ts";

const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
export const fetchAddCart = async (server: string, id: number) => {
  const response = await fetch(`${url[server]}/cart-items`, {
    method: "POST",
    body: JSON.stringify({
      productId: id,
    }),
    headers: {
      Authorization: `Basic ${base64}`,
      "Content-Type": "application/json",
    },
  });
  console.log(response.ok);
};

export const fetchDeleteCart = async (server: string, id: number) => {
  const response = await fetch(`${url[server]}/cart-items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${base64}`,
    },
  });
  console.log(response);
};

export const fetchUpdateCart = async (
  server: string,
  id: number,
  quantity: number
) => {
  const response = await fetch(`${url[server]}/cart-items/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
    headers: {
      Authorization: `Basic ${base64}`,
      "Content-Type": "application/json",
    },
  });
  console.log(response.ok);
};

export const fetchCartList = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/cart-items`, {
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const data = await response.json();
    console.log("cart-list");
    console.log(data);
    const checkedCartItems: CartItem[] = data.cartItems.map(
      (cartItem: ReceivedCartItem) => ({
        ...cartItem,
        checked: true,
      })
    );
    return checkedCartItems;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchProductList = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/products`);
    const data: ProductItem[] = await response.json();
    console.log("product-list");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const fetchMembers = async (server: string) => {
  try {
    const response = await fetch(`${url[server]}/members`);
    if (response.ok) {
      const data: User[] = await response.json();
      return data;
    } else {
      throw new Error();
      return [];
    }
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
