import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";

import { getAxiosConfig } from "../utils/globals";
import { StoreModel } from "./store";
import { APIv2 } from "../consts";

export interface Domain {
  id: string;
  address: string;
  banned: boolean;
  createdAt: string;
  homepage?: string;
  updatedAt: string;
}

export interface NewDomain {
  address: string;
  homepage?: string;
}

export interface SettingsResp {
  apikey: string;
  email: string;
  domains: Domain[];
}

export interface Settings {
  domains: Array<Domain>;
  email: string;
  fetched: boolean;
  setSettings: Action<Settings, SettingsResp>;
  getSettings: Thunk<Settings, undefined, undefined, StoreModel>;
  addDomain: Action<Settings, Domain>;
  removeDomain: Action<Settings, string>;
  saveDomain: Thunk<Settings, NewDomain>;
  deleteDomain: Thunk<Settings, string>;
}

export const settings: Settings = {
  domains: [],
  email: "",
  fetched: false,
  getSettings: thunk(async (actions, payload, { getStoreActions }) => {
    getStoreActions().loading.show();
    const res = await axios.get(APIv2.Users, getAxiosConfig());
    actions.setSettings(res.data);
    getStoreActions().loading.hide();
  }),
  deleteDomain: thunk(async (actions, id) => {
    await axios.delete(`${APIv2.Domains}/${id}`, getAxiosConfig());
    actions.removeDomain(id);
  }),
  setSettings: action((state, payload) => {
    state.domains = payload.domains;
    state.email = payload.email;
    state.fetched = true;
  }),
  addDomain: action((state, payload) => {
    state.domains.push(payload);
  }),
  removeDomain: action((state, id) => {
    state.domains = state.domains.filter(d => d.id !== id);
  }),
  saveDomain: thunk(async (actions, payload) => {
    const res = await axios.post(APIv2.Domains, payload, getAxiosConfig());
    actions.addDomain(res.data);
  })
};
