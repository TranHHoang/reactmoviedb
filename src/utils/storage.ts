import { User } from "~/types/user";

const prefix = "react_app_";

class Storage {
  getUser() {
    return JSON.parse(window.localStorage.getItem(`${prefix}active_user`) ?? "null") as User | null;
  }

  setUser(user: User) {
    window.localStorage.setItem(`${prefix}active_user`, JSON.stringify(user));
  }

  clearUser() {
    window.localStorage.removeItem(`${prefix}active_user`);
  }
}

export const storage = new Storage();
