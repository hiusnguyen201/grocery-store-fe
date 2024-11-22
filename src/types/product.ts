import { ProductStatus } from "@/constants";

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
