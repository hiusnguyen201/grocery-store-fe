"use client";

import { useMemo } from "react";
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
import { allowImageMimeTypes, MAX_UPLOAD_FILE_SIZE } from "@/constants";
import { TextField } from "@/components/text-field";
import Actions from "./actions";
import { CheckIcon } from "@/components/check-icon";
import { TextFormatter } from "@/components/text-formatter";

export default function CreateProductPage() {
  const t = useTranslations("Dashboard.ProductsPage");
  const productSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .required(t("Validation.nameRequired"))
          .min(3, t("Validation.lengthName"))
          .max(100, t("Validation.lengthName")),
        marketPrice: Yup.number()
          .required(t("Validation.marketPriceRequired"))
          .positive(t("Validation.invalidMarketPrice"))
          .integer(t("Validation.invalidMarketPrice"))
          .min(500, t("Validation.minMarketPrice")),
        salePrice: Yup.number()
          .required(t("Validation.salePriceRequired"))
          .positive(t("Validation.invalidSalePrice"))
          .integer(t("Validation.invalidSalePrice"))
          .min(500, t("Validation.minSalePrice")),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      marketPrice: 0,
      salePrice: 0,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: productSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    isValid,
    touched,
  } = formik;

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
                  Giá mua có giá thấp nhất là{" "}
                  <TextFormatter type="currency" value={500} />
                </p>
                <p className="flex gap-1">
                  <span className="w-[22px] h-[22px] items-center flex justify-center">
                    <CheckIcon
                      valid={touched.salePrice && !errors.salePrice}
                    />
                  </span>
                  Giá bán có giá thấp nhất là{" "}
                  <TextFormatter type="currency" value={500} />
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Tabs
          defaultValue="basic-info"
          className="space-y-5 flex-1 max-w-[800px]"
        >
          {/* <TabsList className="sticky top-16 grid w-full grid-cols-2 z-50">
          <Link href={"#basic-info"}>
            <TabsTrigger className="w-full" value="basic-info">
              {t("basicInfo")}
            </TabsTrigger>
          </Link>
          <Link href={"#sale-info"}>
            <TabsTrigger className="w-full" value="sale-info">
              {t("saleInfo")}
            </TabsTrigger>
          </Link>
        </TabsList> */}

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
                  name="image"
                  id="image"
                  maxSize={MAX_UPLOAD_FILE_SIZE}
                  maxFiles={1}
                  multiple={false}
                  accept={{ "image/*": allowImageMimeTypes }}
                />

                {/* Name */}
                <TextField
                  type="text"
                  label={t("nameProductField")}
                  error={!!(touched.name && errors.name)}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  label={
                    <>
                      {t("marketPriceField")} (
                      <TextFormatter
                        type="currency"
                        className="text-sm"
                        value={values.marketPrice}
                      />
                      )
                    </>
                  }
                  error={!!(touched.marketPrice && errors.marketPrice)}
                  id="marketPrice"
                  name="marketPrice"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.marketPrice}
                  helperText={touched.marketPrice && errors.marketPrice}
                />

                {/* Sale Price */}
                <TextField
                  type="number"
                  label={
                    <>
                      {t("salePriceField")} (
                      <TextFormatter
                        type="currency"
                        className="text-sm"
                        value={values.salePrice}
                      />
                      )
                    </>
                  }
                  error={!!(touched.salePrice && errors.salePrice)}
                  id="salePrice"
                  name="salePrice"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.salePrice}
                  helperText={touched.salePrice && errors.salePrice}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Actions
        disableAction={
          Object.keys(touched).length !==
            Object.keys(formik.initialValues).length || !isValid
        }
      />
    </form>
  );
}
