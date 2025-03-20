<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  console.log("Страница обновлена");

  const authStore = useAuthStore();
  if (!authStore.user) {
    console.log("Данных в Pinia нет. Пытаемся восстановить!");
    authStore.restoreSession();
    console.log(authStore.user);
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
