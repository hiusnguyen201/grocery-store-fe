import { object, string, number } from "yup";

export enum ProductStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export type Product = {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
  marketPrice: number;
  salePrice: number;
  status: ProductStatus;
  createdAt: Date;
};

export const productSchema = object({
  name: string().required("Vui lòng nhập tên sản phẩm"),
  marketPrice: number().required().positive().integer().min(500),
  salePrice: number().required().positive().integer().min(500),
});
