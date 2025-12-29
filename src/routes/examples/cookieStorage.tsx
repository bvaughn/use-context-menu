import { useDefaultLayout } from "use-context-menu";

// <begin>

import { type LayoutStorage } from "use-context-menu";

const cookieStorage: LayoutStorage = {
  getItem(key: string) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === key) {
        return value;
      }
    }
    return null;
  },
  setItem(key: string, value: string) {
    document.cookie = `${key}=${value}`;
  }
};

// eslint-disable-next-line react-hooks/rules-of-hooks
useDefaultLayout({
  id: "unique-layout-id",
  storage: cookieStorage
});

// <end>

export { cookieStorage };
