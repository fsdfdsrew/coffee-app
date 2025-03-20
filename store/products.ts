import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "@/types/Product";

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await $fetch<Product[]>("/api/products");
      products.value = response;
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    }
  };

  return { products, fetchProducts };
});
