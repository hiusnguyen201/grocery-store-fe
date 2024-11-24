import { Product } from "@/types/product";
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

export const getAllProducts = () => apiInstance.get(`${PREFIX}`);

export const updateBoard = (identify: string, data: Partial<Product>) =>
  apiInstance.patch(`${PREFIX}/${identify}`, data);

export const deleteBoard = (identify: string) =>
  apiInstance.delete(`${PREFIX}/${identify}`);

export const checkNameExists = (identify: string) =>
  apiInstance.head(`${PREFIX}/${identify}`);
