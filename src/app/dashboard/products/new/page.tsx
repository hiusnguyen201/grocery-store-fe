"use client";

import { useEffect, useRef, useState } from "react";
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
import Actions from "./actions";
import { CheckIcon } from "@/components/check-icon";
import { createProduct } from "@/lib/features/product-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import {
  MAX_LENGTH_NAME_PRODUCT,
  MAX_PRICE_PRODUCT,
  MIN_LENGTH_NAME_PRODUCT,
  MIN_PRICE_PRODUCT,
  useProductSchema,
} from "./use-product-schema";

export default function CreateProductPage() {
  const { productSchema, minPriceFormat, maxPriceFormat } =
    useProductSchema();
  const t = useTranslations("Dashboard.ProductsPage");
  const { error } = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const [nameChanged, setNameChanged] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: [] as File[],
      name: "",
      marketPrice: 0,
      salePrice: 0,
      status: ProductStatus.ACTIVE,
    },
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("marketPrice", values.marketPrice.toString());
      formData.append("salePrice", values.salePrice.toString());
      formData.append("status", values.status);

      if (values.image.length > 0) {
        formData.append("image", values.image[0]);
      }

      dispatch(createProduct(formData));
    },
    validationSchema: productSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: true,
  });

  const {
    handleSubmit,
    values,
    errors,
    isValid,
    touched,
    resetForm,
    submitCount,
    setFieldValue,
    validateField,
    handleBlur,
    dirty,
  } = formik;

  useEffect(() => {
    if (submitCount === 0) return;
    if (!error) {
      toast({
        title: t("Messages.createProductSuccess"),
        variant: "success",
      });
      resetForm();
      setFieldValue("image", []);
    } else {
      toast({
        title: t("Messages.createProductFailed"),
        variant: "destructive",
      });
    }
  }, [error, submitCount]);

  return (
    <>
      <form
        className="md:px-6 p-4"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center md:flex-row gap-5">
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
                    value={values.image}
                    onValueChange={(value) => {
                      setFieldValue("image", value);
                    }}
                  />

                  {/* Name */}
                  <TextField
                    type="text"
                    placeholder={`${t("nameProductField")}...`}
                    label={t("nameProductField")}
                    error={!!(touched.name && errors.name)}
                    id="name"
                    name="name"
                    onChange={async (e) => {
                      setNameChanged(true);
                      setFieldValue("name", e.target.value);
                    }}
                    onBlur={(e) => {
                      if (nameChanged || !values.name) {
                        handleBlur(e);
                        validateField("name");
                        setNameChanged(false);
                      }
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
                        setFieldValue("marketPrice", MAX_PRICE_PRODUCT);
                      } else if (Number(e.target.value) >= 0) {
                        setFieldValue("marketPrice", +e.target.value);
                      }
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      validateField("marketPrice");
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
                        setFieldValue("salePrice", MAX_PRICE_PRODUCT);
                      } else if (Number(e.target.value) >= 0) {
                        setFieldValue("salePrice", +e.target.value);
                      }
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      validateField("salePrice");
                    }}
                    value={values.salePrice}
                    helperText={touched.salePrice && errors.salePrice}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </form>
      <Actions
        disableAction={!dirty || !isValid}
        onStatusChange={(value) => {
          formik.setFieldValue("status", value);
          formik.submitForm();
        }}
      />
    </>
  );
}
