import { atom, selector } from "recoil";
import type { Sign, User } from "../../types/types.ts";
import { modalRepository } from "./modalAtoms.tsx";
import Login from "../../components/Login";
import { setSessionStorage } from "../utils/storage.ts";
import {
  SESSION_STORAGE_KEY_BASE64,
  SESSION_STORAGE_KEY_CART_ITEMS,
  SESSION_STORAGE_KEY_POINT,
} from "../keys.ts";
import { fetchCartList } from "../api/api.ts";
import { cartState } from "./cartAtoms.ts";
import { serverState } from "./serverAtom.ts";
import { sessionStorageEffect } from "./storageEffect.ts";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects: [sessionStorageEffect<User | null>("user")],
});

export const userRepository = selector({
  key: "userRepository",
  get: ({ getCallback }) => {
    const login = getCallback(({ set, snapshot }) => async (member: User) => {
      const { closeModal } = await snapshot.getPromise(modalRepository);
      const user = await snapshot.getPromise(userState);
      const server = await snapshot.getPromise(serverState);

      if (!user) {
        setSessionStorage(
          SESSION_STORAGE_KEY_BASE64,
          btoa(member.email + ":" + member.password)
        );
        setSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, []);
        setSessionStorage(SESSION_STORAGE_KEY_POINT, {
          pointHistories: [],
          totalPoint: 1000,
        });
        const newCartList = await fetchCartList(server);
        set(cartState, newCartList);
        set(userState, member);
        closeModal();
      }
    });

    const logout = getCallback(({ set }) => async () => {
      setSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
      setSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, []);
      set(userState, null);
      set(cartState, []);
    });

    const loginCheckerCallback = getCallback(
      ({ snapshot }) =>
        async (callback: () => void) => {
          const user = await snapshot.getPromise(userState);
          const { openModal } = await snapshot.getPromise(modalRepository);
          if (user) {
            callback();
          } else if (
            confirm("로그인이 필요한 메뉴입니다. 로그인 하시겠습니까?")
          ) {
            openModal(<Login />);
          }
        }
    );

    return { login, logout, loginCheckerCallback };
  },
});
