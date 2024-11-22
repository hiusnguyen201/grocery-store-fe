import { Product } from "@/types/product";
import { apiInstance } from "@/lib/services";

export const createProduct = (data: Partial<Product>) =>
  apiInstance.post("/products", data);

export const getBoard = (identify: string) =>
  apiInstance.get(`/products/${identify}`);

export const getAllProducts = () => apiInstance.get(`/products`);

export const updateBoard = (identify: string, data: Partial<Product>) =>
  apiInstance.patch(`/products/${identify}`, data);

export const deleteBoard = (identify: string) =>
  apiInstance.delete(`/products/${identify}`);
