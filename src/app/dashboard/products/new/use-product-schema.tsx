import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import * as Yup from "yup";
import { checkNameExists } from "@/lib/features/product-slice";
import { useAppDispatch } from "@/lib/hooks";

export const MIN_PRICE_PRODUCT = 500;
export const MAX_PRICE_PRODUCT = 500000;
export const MIN_LENGTH_NAME_PRODUCT = 4;
export const MAX_LENGTH_NAME_PRODUCT = 100;

export function useProductSchema() {
  const dispatch = useAppDispatch();
  const t = useTranslations("Dashboard.ProductsPage.Validation");
  const { minPriceFormat, maxPriceFormat } = useMemo(
    () => ({
      minPriceFormat: formatCurrency(MIN_PRICE_PRODUCT),
      maxPriceFormat: formatCurrency(MAX_PRICE_PRODUCT),
    }),
    []
  );

  const productSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .required(t("nameRequired"))
          .min(
            MIN_LENGTH_NAME_PRODUCT,
            t("lengthName", {
              min: MIN_LENGTH_NAME_PRODUCT,
              max: MAX_LENGTH_NAME_PRODUCT,
            })
          )
          .max(
            MAX_LENGTH_NAME_PRODUCT,
            t("lengthName", {
              min: MIN_LENGTH_NAME_PRODUCT,
              max: MAX_LENGTH_NAME_PRODUCT,
            })
          )
          .test(
            "uniqueName",
            t("existName"),
            async function (val: string) {
              if (!val) {
                return this.createError({ message: t("nameRequired") });
              }

              if (
                !(
                  this.parent.name.length >= MIN_LENGTH_NAME_PRODUCT &&
                  this.parent.name.length <= MAX_LENGTH_NAME_PRODUCT
                )
              ) {
                return this.createError({
                  message: t("lengthName", {
                    min: MIN_LENGTH_NAME_PRODUCT,
                    max: MAX_LENGTH_NAME_PRODUCT,
                  }),
                });
              }
              return !(await dispatch(checkNameExists(val)));
            }
          ),
        marketPrice: Yup.number()
          .required(t("marketPriceRequired"))
          .integer(t("invalidMarketPrice"))
          .positive(t("invalidMarketPrice"))
          .min(
            MIN_PRICE_PRODUCT,
            t("minMaxMarketPrice", {
              min: minPriceFormat,
              max: maxPriceFormat,
            })
          )
          .max(
            MAX_PRICE_PRODUCT,
            t("minMaxMarketPrice", {
              min: minPriceFormat,
              max: maxPriceFormat,
            })
          ),
        salePrice: Yup.number()
          .required(t("salePriceRequired"))
          .integer(t("invalidSalePrice"))
          .positive(t("invalidSalePrice"))
          .min(
            MIN_PRICE_PRODUCT,
            t("minMaxSalePrice", {
              min: minPriceFormat,
              max: maxPriceFormat,
            })
          )
          .max(
            MAX_PRICE_PRODUCT,
            t("minMaxSalePrice", {
              min: minPriceFormat,
              max: maxPriceFormat,
            })
          ),
      }),
    []
  );
  return { productSchema, minPriceFormat, maxPriceFormat };
}
