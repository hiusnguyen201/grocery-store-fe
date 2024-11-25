import { Product, ProductFilterProps } from "@/types/product";
import { apiInstance } from "@/lib/services";

const PREFIX = "/products";

export const createProduct = (data: FormData) =>
  apiInstance.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getBoard = (identify: string) =>
  apiInstance.get(`${PREFIX}/${identify}`);

export const getAllProducts = (filters?: ProductFilterProps) =>
  apiInstance.get(
    `${PREFIX}?${new URLSearchParams(filters as Record<string, string>)}`
  );

export const updateBoard = (identify: string, data: Partial<Product>) =>
  apiInstance.patch(`${PREFIX}/${identify}`, data);

export const deleteBoard = (identify: string) =>
  apiInstance.delete(`${PREFIX}/${identify}`);

export const checkNameExists = (identify: string) =>
  apiInstance.post(`${PREFIX}/is-exist`, {
    id: identify,
  });
