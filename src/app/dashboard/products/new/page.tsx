"use client";

import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
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
import {
  createProduct,
  checkNameExists,
} from "@/lib/features/product-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

const MIN_PRICE_PRODUCT = 500;
const MAX_PRICE_PRODUCT = 500000;

export default function CreateProductPage() {
  const t = useTranslations("Dashboard.ProductsPage");
  const { error } = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);

  const productSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .required(t("Validation.nameRequired"))
          .min(3, t("Validation.lengthName"))
          .max(100, t("Validation.lengthName"))
          .test("uniqueName", t("Validation.existName"), async (value) => {
            return !(await dispatch(checkNameExists(value)));
          }),
        marketPrice: Yup.number()
          .required(t("Validation.marketPriceRequired"))
          .integer(t("Validation.invalidMarketPrice"))
          .positive(t("Validation.invalidMarketPrice"))
          .min(MIN_PRICE_PRODUCT, t("Validation.minMarketPrice"))
          .max(MAX_PRICE_PRODUCT, t("Validation.maxMarketPrice")),
        salePrice: Yup.number()
          .required(t("Validation.salePriceRequired"))
          .integer(t("Validation.invalidMarketPrice"))
          .positive(t("Validation.invalidMarketPrice"))
          .min(MIN_PRICE_PRODUCT, t("Validation.minSalePrice"))
          .max(MAX_PRICE_PRODUCT, t("Validation.maxSalePrice")),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
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

      if (files && files.length > 0) {
        formData.append("image", files[0]);
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

  console.log(values);

  useEffect(() => {
    if (submitCount === 0) return;
    if (!error) {
      toast({
        title: t("Messages.createProductSuccess"),
        variant: "success",
      });
      resetForm();
      setFiles([]);
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
                    Gợi ý điền thông tin
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="flex gap-1">
                    <span className="w-[22px] h-[22px] items-center flex justify-center">
                      <CheckIcon valid={touched.name && !errors.name} />
                    </span>
                    Tên sản phẩm có ít nhất 3~100 kí tự
                  </p>
                  <p className="flex gap-1">
                    <span className="w-[22px] h-[22px] items-center flex justify-center">
                      <CheckIcon
                        valid={touched.marketPrice && !errors.marketPrice}
                      />
                    </span>
                    {`Giá mua có giá từ ${formatCurrency(
                      MIN_PRICE_PRODUCT
                    )}~${formatCurrency(MAX_PRICE_PRODUCT)}`}
                  </p>
                  <p className="flex gap-1">
                    <span className="w-[22px] h-[22px] items-center flex justify-center">
                      <CheckIcon
                        valid={touched.salePrice && !errors.salePrice}
                      />
                    </span>
                    {`Giá bán có giá từ ${formatCurrency(
                      MIN_PRICE_PRODUCT
                    )}~${formatCurrency(MAX_PRICE_PRODUCT)}`}
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
                    value={files}
                    onValueChange={(value) => {
                      setFiles(value);
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
                    onChange={(e) => {
                      setFieldValue("name", e.target.value);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      validateField("name");
                    }}
                    value={values.name}
                    helperText={touched.name && errors.name}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
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
                      if (Number(e.target.value) >= 0) {
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
                      if (Number(e.target.value) >= 0) {
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
