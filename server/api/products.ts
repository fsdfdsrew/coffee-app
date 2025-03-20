import type { Product } from "@/types/Product";

export default defineEventHandler(async (): Promise<Product[]> => {
  const products = await import("./products.json");
  return products.default as Product[];
});
