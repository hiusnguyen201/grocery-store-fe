import { ProductFilterProps } from "@/types/product";
import { apiInstance } from "@/lib/services";

const PREFIX = "/products";

export const getAllProducts = (filters?: ProductFilterProps) =>
  apiInstance.get(
    PREFIX + `?${new URLSearchParams(filters as Record<string, string>)}`
  );

export const getProduct = (identify: string) =>
  apiInstance.get(PREFIX + `/${identify}`);

export const createProduct = (data: FormData) =>
  apiInstance.post(PREFIX, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (identify: string, data: FormData) =>
  apiInstance.patch(PREFIX + `/${identify}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const removeProduct = (identify: string) =>
  apiInstance.delete(PREFIX + `/${identify}`);

export const checkNameExists = (name: string, skipId?: string) =>
  apiInstance.post(PREFIX + "/is-exist-name", {
    id: name,
    skipId,
  });

export const hideProduct = (identify: string) =>
  apiInstance.patch(PREFIX + `/${identify}/hide`);

export const showProduct = (identify: string) =>
  apiInstance.patch(PREFIX + `/${identify}/show`);

// export const getBoard = (identify: string) =>
//   apiInstance.get(`${PREFIX}/${identify}`);

// export const updateBoard = (identify: string, data: Partial<Product>) =>
//   apiInstance.patch(`${PREFIX}/${identify}`, data);

// export const deleteBoard = (identify: string) =>
//   apiInstance.delete(`${PREFIX}/${identify}`);
