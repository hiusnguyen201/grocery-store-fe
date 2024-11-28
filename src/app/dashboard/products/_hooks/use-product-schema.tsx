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
  const t = useTranslations("Dashboard.ProductsPage.Validation");
  const dispatch = useAppDispatch();
  const minPriceFormat = formatCurrency(MIN_PRICE_PRODUCT);
  const maxPriceFormat = formatCurrency(MAX_PRICE_PRODUCT);

  const productSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().test(
          "is-unique",
          t("existName"),
          async function (value) {
            if (!value) {
              return this.createError({ message: t("nameRequired") });
            }

            if (
              !(
                value.length >= MIN_LENGTH_NAME_PRODUCT &&
                value.length <= MAX_LENGTH_NAME_PRODUCT
              )
            ) {
              return this.createError({
                message: t("lengthName", {
                  min: MIN_LENGTH_NAME_PRODUCT,
                  max: MAX_LENGTH_NAME_PRODUCT,
                }),
              });
            }

            const nameExists = await dispatch(
              checkNameExists(value, this.parent?._id)
            );
            return !nameExists;
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
    [t]
  );
  return { productSchema, minPriceFormat, maxPriceFormat };
}
