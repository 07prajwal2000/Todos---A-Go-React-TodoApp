import { create } from "zustand";
import { UserProfile } from "../types/auth";
import { GetProfile } from "../api/auth";

export type GlobalStoreType = {
	Tokens: { Access: string; Refresh: string };
	SetTokens: (access: string, refresh: string) => void;
  LoggedIn: boolean;
  SetLoggedIn: (loggedIn: boolean) => void;
  Logout: () => void;
  Profile: UserProfile | undefined;
  LoadProfile: (token: string) => Promise<boolean>;
};

const ACCESS_STORAGE_KEY = "access";
const REFRESH_STORAGE_KEY = "access";

const globalStore = create<GlobalStoreType>((set) => ({
  Profile: undefined,
  async LoadProfile(token: string) {
    try {
      const response = await GetProfile(token);
      set((s) => ({...s, Profile: response!}));
      return true;
    } catch (error) {
      return false;
    }
  },
  LoggedIn: false,
  SetLoggedIn(loggedIn: boolean) {
    set((s) => ({...s, LoggedIn: loggedIn}));
  },
  Logout() {
    set((s) => ({
      ...s,
      Tokens: {Access: "", Refresh: ""},
      LoggedIn: false,
    }));
    localStorage.removeItem(ACCESS_STORAGE_KEY);
    localStorage.removeItem(REFRESH_STORAGE_KEY);
  },
	Tokens: {
		Access: localStorage.getItem(ACCESS_STORAGE_KEY) || "",
		Refresh: localStorage.getItem(REFRESH_STORAGE_KEY) || "",
	},
	SetTokens(access, refresh) {
		set((state) => {
			localStorage.setItem(ACCESS_STORAGE_KEY, access);
			localStorage.setItem(REFRESH_STORAGE_KEY, refresh);
			return {
				...state,
				Tokens: { Access: access, Refresh: refresh },
			};
		});
	},
}));

const useGlobalStore = globalStore;

export default useGlobalStore;
