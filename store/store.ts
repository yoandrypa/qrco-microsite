import { Action, createStore, createTypedHooks, action } from "easy-peasy";

import { settings, Settings } from "./settings";
import { loading, Loading } from "./loading";
import { links, Links } from "./links";

export interface StoreModel {
  links: Links;
  loading: Loading;
  settings: Settings;
  reset: Action<StoreModel>;
}

let initState: any = {};

export const store: StoreModel = {
  links,
  loading,
  settings,
  reset: action(() => initState)
};

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export const initializeStore = (initialState?: StoreModel) => {
  initState = initialState;
  return createStore(store, { initialState });
};
