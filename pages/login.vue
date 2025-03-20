<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Вход в аккаунт</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" type="text" placeholder="Логин" required />
        <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          required
        />
        <button type="submit">Войти</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <div class="demo-credentials">
        <p><strong>Тестовые аккаунты:</strong></p>
        <ul>
          <li>
            <b>Логин:</b> david.jones@creds.com / <b>Пароль:</b> 8u3&s-1uda
          </li>
          <li>
            <b>Логин:</b> sam.robertson@creds.com / <b>Пароль:</b> 0k91sa639
          </li>
          <li><b>Логин:</b> nic.crew@creds.com / <b>Пароль:</b> 1atr48asf03</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  const success = await authStore.login(username.value, password.value);
  console.log("Проверка: " + success);
  if (success) {
    router.push("/account");
  } else {
    error.value = "Введены неверные данные. Попробуйте ещё раз";
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/main.scss";

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.5s ease-in-out;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input {
  padding: 10px;
}

.error {
  color: $coffee-accent;
  margin-top: 10px;
}

.demo-credentials {
  margin-top: 15px;
  text-align: left;
  font-size: 14px;
}

.demo-credentials ul {
  padding: 0;
  list-style: none;
}

.demo-credentials li {
  margin-bottom: 5px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
