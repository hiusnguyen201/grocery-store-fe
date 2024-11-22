import { useTranslations } from "next-intl";
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

export const getProductSchema = () => {
  const t = useTranslations("Dashboard.ProductsPage.Validation");
  return object({
    name: string()
      .required(t("nameRequired"))
      .min(3, t("lengthName"))
      .max(100, t("lengthName")),
    marketPrice: number()
      .required(t("marketPriceRequired"))
      .positive(t("invalidMarketPrice"))
      .integer(t("invalidMarketPrice"))
      .min(500, t("minMarketPrice")),
    salePrice: number()
      .required(t("salePriceRequired"))
      .positive(t("invalidSalePrice"))
      .integer(t("invalidSalePrice"))
      .min(500, t("minSalePrice")),
  });
};
