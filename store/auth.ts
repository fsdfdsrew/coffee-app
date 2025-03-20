import { defineStore } from "pinia";
import md5 from "md5";
import type { User } from "@/types/User";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),
  actions: {
    async login(username: string, password: string): Promise<boolean> {
      const users: User[] = await $fetch("/api/users");
      const hashedPassword = md5(password);
      const user = users.find(
        (u: User) =>
          u.credentials.username === username &&
          u.credentials.passphrase === hashedPassword
      );
      if (user) {
        this.user = user;
        this.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(user));
        console.log(this.user);
        return true;
      }
      return false;
    },
    logout(): void {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("user");
      navigateTo("/login");
    },
    restoreSession(): void {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser) as User;
        this.isAuthenticated = true;
        navigateTo("/account");
      } else {
        navigateTo("/login");
      }
    },
  },
});
