"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { productSchema } from "@/app/dashboard/products/schema";
import { FileUploader } from "@/components/file-uploader";
import { allowImageMimeTypes, MAX_UPLOAD_FILE_SIZE } from "@/constants";
import { TextField } from "@/components/text-field";
import { FormatCurrency } from "@/lib/utils";
import Actions from "./actions";

export default function CreateProductPage() {
  const t = useTranslations("Dashboard.ProductsPage");

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
  });

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    isValid,
    handleBlur,
    touched,
  } = formik;

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <Tabs defaultValue="basic-info" className="space-y-5">
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
              <CardTitle className="text-2xl">{t("basicInfo")}</CardTitle>
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
              <CardTitle className="text-2xl">{t("saleInfo")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Market Price */}
              <TextField
                type="number"
                label={
                  <>
                    {t("marketPriceField")} (
                    <span className="text-sm">
                      {FormatCurrency(values.marketPrice)}
                    </span>
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
                    <span className="text-sm">
                      {FormatCurrency(values.salePrice)}
                    </span>
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

      <Actions
        disableAction={
          Object.keys(touched).length !==
            Object.keys(formik.initialValues).length || !isValid
        }
      />
    </form>
  );
}
