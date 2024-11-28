"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { FileUploader } from "@/components/file-uploader";
import {
  allowImageMimeTypes,
  MAX_UPLOAD_FILE_SIZE,
  ProductStatus,
} from "@/constants";
import { TextField } from "@/components/text-field";
import { CheckIcon } from "@/components/check-icon";
import { createProduct } from "@/lib/features/product-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/lib/store";
import { convertObjectToFormData, formatCurrency } from "@/lib/utils";
import {
  MAX_LENGTH_NAME_PRODUCT,
  MAX_PRICE_PRODUCT,
  MIN_LENGTH_NAME_PRODUCT,
  MIN_PRICE_PRODUCT,
  useProductSchema,
} from "@/app/dashboard/products/_hooks/use-product-schema";
import { useRouter } from "next/navigation";
import { AppFooter } from "@/components/app-footer";
import { AlertRedirectDialog } from "@/app/dashboard/products/_components/alert-redirect-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function CreateProductPage() {
  const t = useTranslations("Dashboard.ProductsPage");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { productSchema, minPriceFormat, maxPriceFormat } =
    useProductSchema();
  const { error, isLoading } = useAppSelector(
    (state: RootState) => state.product
  );

  const formik = useFormik({
    initialValues: {
      image: null,
      name: "",
      marketPrice: 0,
      salePrice: 0,
      status: null,
    },
    onSubmit: async (values, { resetForm }) => {
      const data = await convertObjectToFormData(values);

      toast({
        title: t("Messages.createProcessing"),
      });

      await dispatch(createProduct(data));

      if (!error) {
        router.back();
        toast({
          title: t("Messages.createProductSuccess"),
          variant: "success",
        });
        resetForm();
      } else {
        toast({
          title: t("Messages.createProductFailed"),
          variant: "destructive",
        });
      }
    },
    validationSchema: productSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: true,
  });

  const {
    values,
    errors,
    isValid,
    touched,
    handleChange,
    setFieldValue,
    validateField,
    handleBlur,
    handleSubmit,
    dirty,
  } = formik;

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center md:flex-row gap-5 md:px-6 p-4">
        <Tabs defaultValue="hint" className="md:max-w-[300px] w-full">
          <TabsContent
            forceMount
            data-state={true}
            value="hint"
            className="sticky top-20 transition-[top] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:top-16"
          >
            <Card>
              <CardHeader className="border-blue-400 border-t-4 rounded-lg">
                <CardTitle className="text-base">
                  {t("CreatePage.hintFillInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="flex gap-1">
                  <span className="w-[22px] h-[22px] items-center flex justify-center">
                    <CheckIcon valid={touched.name && !errors.name} />
                  </span>
                  {t("Validation.lengthName", {
                    min: MIN_LENGTH_NAME_PRODUCT,
                    max: MAX_LENGTH_NAME_PRODUCT,
                  })}
                </p>
                <p className="flex gap-1">
                  <span className="w-[22px] h-[22px] items-center flex justify-center">
                    <CheckIcon
                      valid={touched.marketPrice && !errors.marketPrice}
                    />
                  </span>
                  {t("Validation.minMaxMarketPrice", {
                    min: minPriceFormat,
                    max: maxPriceFormat,
                  })}
                </p>
                <p className="flex gap-1">
                  <span className="w-[22px] h-[22px] items-center flex justify-center">
                    <CheckIcon
                      valid={touched.salePrice && !errors.salePrice}
                    />
                  </span>
                  {t("Validation.minMaxSalePrice", {
                    min: minPriceFormat,
                    max: maxPriceFormat,
                  })}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Tabs
          defaultValue="basic-info"
          className="space-y-5 flex-1 max-w-[800px]"
        >
          <TabsContent
            id="basic-info"
            forceMount
            data-state={true}
            value="basic-info"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {t("CreatePage.basicInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Image */}
                <FileUploader
                  label={t("imageField")}
                  maxSize={MAX_UPLOAD_FILE_SIZE}
                  maxFiles={1}
                  multiple={false}
                  accept={{ "image/*": allowImageMimeTypes }}
                  value={values.image ? [values.image] : []}
                  onValueChange={(files: File[]) => {
                    setFieldValue("image", files[0]);
                  }}
                />

                {/* Name */}
                <TextField
                  type="text"
                  placeholder={`${t("nameProductField")}...`}
                  label={t("nameProductField")}
                  autoComplete="off"
                  error={!!(touched.name && errors.name)}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={async (e) => {
                    await validateField("name");
                    handleBlur(e);
                  }}
                  value={values.name}
                  helperText={touched.name && errors.name}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            tabIndex={-1}
            id="sale-info"
            forceMount
            data-state={true}
            value="sale-info"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {t("CreatePage.saleInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Market Price */}
                <TextField
                  type="number"
                  placeholder={`${t("marketPriceField")}...`}
                  label={`${t("marketPriceField")} (${formatCurrency(
                    values.marketPrice
                  )})`}
                  min={MIN_PRICE_PRODUCT}
                  max={MAX_PRICE_PRODUCT}
                  error={!!(touched.marketPrice && errors.marketPrice)}
                  id="marketPrice"
                  name="marketPrice"
                  onChange={(e) => {
                    if (Number(e.target.value) >= MAX_PRICE_PRODUCT) {
                      e.target.value = MAX_PRICE_PRODUCT.toString();
                    }
                    handleChange(e);
                  }}
                  onBlur={(e) => {
                    validateField("marketPrice");
                    handleBlur(e);
                  }}
                  value={values.marketPrice}
                  helperText={touched.marketPrice && errors.marketPrice}
                />

                {/* Sale Price */}
                <TextField
                  type="number"
                  placeholder={`${t("salePriceField")}...`}
                  label={`${t("salePriceField")} (${formatCurrency(
                    values.salePrice
                  )})`}
                  min={MIN_PRICE_PRODUCT}
                  max={MAX_PRICE_PRODUCT}
                  error={!!(touched.salePrice && errors.salePrice)}
                  id="salePrice"
                  name="salePrice"
                  onChange={(e) => {
                    if (Number(e.target.value) >= MAX_PRICE_PRODUCT) {
                      e.target.value = MAX_PRICE_PRODUCT.toString();
                    }
                    handleChange(e);
                  }}
                  onBlur={(e) => {
                    validateField("salePrice");
                    handleBlur(e);
                  }}
                  value={values.salePrice}
                  helperText={touched.salePrice && errors.salePrice}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AppFooter className="justify-end">
        <AlertRedirectDialog>
          <Button
            className="min-w-[120px]"
            disabled={isLoading}
            type="button"
            variant="outline"
          >
            {t("titleBtnCancel")}
          </Button>
        </AlertRedirectDialog>

        <Button
          className="min-w-[120px]"
          disabled={!isValid || !dirty || isLoading}
          type="submit"
          variant="outline"
          onClick={() => {
            setFieldValue("status", ProductStatus.INACTIVE);
          }}
        >
          {values.status === ProductStatus.INACTIVE && isLoading && (
            <Spinner />
          )}
          {t("titleBtnSaveAndHide")}
        </Button>

        <Button
          className="min-w-[120px]"
          disabled={!isValid || !dirty || isLoading}
          type="submit"
          onClick={() => {
            setFieldValue("status", ProductStatus.ACTIVE);
          }}
        >
          {values.status === ProductStatus.ACTIVE && isLoading && (
            <Spinner className="text-[#fff]" />
          )}
          {t("titleBtnSaveAndShow")}
        </Button>
      </AppFooter>
    </form>
  );
}
