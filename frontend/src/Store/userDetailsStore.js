import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

function userStore(set) {
  return {
    user: null,
    setUser: function (userDetailsObject) {
      set((_set) => {
        return { user: userDetailsObject };
      });
    },
    logout: function () {
      set((_set) => {
        return { user: null };
      });
    },
  };
}

const userDetailsStore = create(
  devtools(persist(userStore, { name: "user-details" })),
);

export default userDetailsStore;
