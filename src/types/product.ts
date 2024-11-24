import { ProductStatus } from "@/constants";

export type Product = {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
  priceHistories: PriceHistory[];
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type PriceHistory = {
  _id: string;
  product: string;
  marketPrice: number;
  salePrice: number;
  valuationAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
