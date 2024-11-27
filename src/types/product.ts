import { ProductStatus } from "@/constants";

export type Product = {
  _id: string;
  name: string;
  slug: string;
  productImage?: ProductImage;
  normalizeName: string;
  priceHistories: PriceHistory[];
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
  hiddenAt?: Date;
};

export type ProductImage = {
  _id: string;
  product: string;
  originalPath: string;
  mediumPath: string;
  smallPath: string;
  displayName: string;
  bytes: number;
  format: string;
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

export type ProductFilterProps = {
  page?: number;
  limit?: number;
  status?: string;
  name?: string;
};
