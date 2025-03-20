import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Если пользователь зашел на "/", перенаправляем на /login
  if (to.path === "/") {
    return navigateTo("/login");
  }
});
