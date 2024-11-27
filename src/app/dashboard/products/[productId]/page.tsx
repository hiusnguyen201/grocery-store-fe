"use client";

import { memo, useEffect } from "react";
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
import { updateProduct } from "@/lib/features/product-slice";
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
import { CheckProduct } from "@/app/dashboard/products/_components/products-table/check-product";
import { Product } from "@/types/product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageCard } from "@/components/image-card";
import { redirect } from "next/navigation";

export default () => {
  return <CheckProduct children={<EditProductPage />} />;
};

const EditProductPage = memo(({ product }: { product?: Product }) => {
  const t = useTranslations("Dashboard.ProductsPage");
  const { productSchema, minPriceFormat, maxPriceFormat } =
    useProductSchema();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(
    (state: RootState) => state.product
  );

  const formik = useFormik({
    initialValues: {
      image: null,
      uploadedImages: product?.productImage ? [product.productImage] : [],
      name: product?.name || "",
      marketPrice: product?.priceHistories[0].marketPrice || 0,
      salePrice: product?.priceHistories[0].salePrice || 0,
      status: product?.status || ProductStatus.ACTIVE,
      ...(product?._id ? { _id: product._id } : {}),
    },
    onSubmit: async (values, { resetForm }) => {
      const data = await convertObjectToFormData(values);
      if (values._id) {
        const newProduct = await dispatch(
          updateProduct(values?._id, data)
        );

        if (!isLoading && !error) {
          resetForm();
          redirect("/dashboard/products/" + newProduct.slug);
        }
      }
    },
    validationSchema: productSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const {
    handleSubmit,
    values,
    errors,
    isValid,
    touched,
    handleChange,
    setFieldValue,
    validateField,
    handleBlur,
    submitCount,
    dirty,
    setTouched,
  } = formik;

  useEffect(() => {
    setTouched({ name: true, marketPrice: true, salePrice: true });
  }, []);

  useEffect(() => {
    if (submitCount === 0) return;
    if (!error) {
      toast({
        title: t("Messages.updateProductSuccess"),
        variant: "success",
      });
    } else {
      toast({
        title: t("Messages.updateProductFailed"),
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
                  <div className="flex flex-col gap-6">
                    <FileUploader
                      disabled={values.uploadedImages.length > 0}
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
                    {values.uploadedImages.length > 0 && (
                      <ScrollArea className="h-fit w-full px-3">
                        <div className="max-h-48 space-y-4">
                          {values.uploadedImages.map((image, index) => (
                            <ImageCard
                              key={index}
                              id={image._id}
                              name={image.displayName}
                              size={image.bytes}
                              onRemove={(value) => {
                                setFieldValue(
                                  "uploadedImages",
                                  values.uploadedImages.filter(
                                    (item) => item._id !== value
                                  )
                                );
                              }}
                              src={image.originalPath}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </div>

                  {/* Name */}
                  <TextField
                    type="text"
                    placeholder={`${t("nameProductField")}...`}
                    label={t("nameProductField")}
                    error={!!(touched.name && errors.name)}
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      if (values.name !== product?.name) {
                        validateField("name");
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
                        e.target.value = MAX_PRICE_PRODUCT.toString();
                      }
                      handleChange(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                      if (
                        values.marketPrice !==
                        product?.priceHistories[0].marketPrice
                      ) {
                        validateField("marketPrice");
                      }
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
                      handleBlur(e);
                      if (
                        values.salePrice !==
                        product?.priceHistories[0].salePrice
                      ) {
                        validateField("salePrice");
                      }
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
});
