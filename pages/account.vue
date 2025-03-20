<template>
  <div class="account-container">
    <header>
      <h1>Добро пожаловать, {{ authStore.user?.name }} ☕</h1>
      <button class="logout-btn" @click="logout">Выход</button>
    </header>

    <div class="filters">
      <input
        type="text"
        v-model="filterName"
        placeholder="Поиск по названию"
        @input="applyFilters"
      />
      <select v-model="filterCategory" @change="applyFilters">
        <option value="">Все категории</option>
        <option
          v-for="category in uniqueCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <select v-model="filterAvailability" @change="applyFilters">
        <option value="">Наличие</option>
        <option :value="true">В наличии</option>
        <option :value="false">Нет в наличии</option>
      </select>
      <input
        type="number"
        min="0"
        v-model.number="filterPrice"
        placeholder="Макс. цена"
        @input="applyFilters"
      />
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Наличие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price }} ₽</td>
            <td>
              <span
                :class="{
                  available: product.status,
                  unavailable: !product.status,
                }"
              >
                {{ product.status ? "В наличии" : "Нет в наличии" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/store/auth";
import { useProductStore } from "@/store/products";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const productStore = useProductStore();
const router = useRouter();

const filterName = ref("");
const filterCategory = ref("");
const filterAvailability = ref<boolean | "">("");
const filterPrice = ref<number | null>(null);

if (!authStore.user) {
  router.push("/login");
}

const logout = () => {
  authStore.logout();
  router.push("/login");
};

onMounted(() => {
  productStore.fetchProducts();
});

const uniqueCategories = computed(() => {
  return [...new Set(productStore.products.map((p) => p.category))];
});

const filteredProducts = computed(() => {
  return productStore.products.filter((product) => {
    const matchesName = filterName.value
      ? product.name.toLowerCase().includes(filterName.value.toLowerCase())
      : true;
    const matchesCategory = filterCategory.value
      ? product.category === filterCategory.value
      : true;
    const matchesAvailability =
      filterAvailability.value !== ""
        ? product.status === filterAvailability.value
        : true;
    const matchesPrice =
      typeof filterPrice.value === "number"
        ? product.price <= filterPrice.value
        : true;
    return (
      matchesName && matchesCategory && matchesAvailability && matchesPrice
    );
  });
});

const applyFilters = () => {
  filteredProducts.value;
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/main.scss";

.account-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: $coffee-dark;
}

.logout-btn {
  position: fixed;
  top: 1%;
  right: 1%;

  &:hover {
    background-color: $coffee-accent;
  }
}

.filters {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  input,
  select {
    padding: 10px;
    border: 1px solid $coffee-light;
    border-radius: 8px;
    font-size: 16px;
  }
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; // Фиксируем ширину столбцов

  thead {
    background: $coffee-light;
  }

  th,
  td {
    border: 1px solid $coffee-brown;
    padding: 12px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    background: $coffee-brown;
    color: white;
  }

  td {
    background: white;
  }
}

.available {
  color: $coffee-dark;
  font-weight: bold;
}

.unavailable {
  color: $coffee-light;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: center;
  }

  table {
    font-size: 14px;
  }
}
</style>
