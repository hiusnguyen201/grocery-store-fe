"use client";

import { memo, useCallback, useState } from "react";
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
import { CheckIcon } from "@/components/check-icon";
import {
  updateProduct,
  hideProduct,
  showProduct,
} from "@/lib/features/product-slice";
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
import { ExistProduct } from "@/app/dashboard/products/_middlewares/exist-product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageCard } from "@/components/image-card";
import { useRouter } from "next/navigation";
import { AppFooter } from "@/components/app-footer";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertRedirectDialog } from "@/app/dashboard/products/_components/alert-redirect-dialog";

export default () => <ExistProduct children={<EditProductPage />} />;

const EditProductPage = memo(() => {
  const t = useTranslations("Dashboard.ProductsPage");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { productSchema, minPriceFormat, maxPriceFormat } =
    useProductSchema();
  const {
    isLoading,
    error,
    item: product,
  } = useAppSelector((state: RootState) => state.product);

  if (!product) return;

  const [action, setAction] = useState<"Hide" | "Show" | "Update" | null>(
    null
  );
  const formik = useFormik({
    initialValues: {
      image: null,
      uploadedImages: product.productImage ? [product.productImage] : [],
      name: product.name || "",
      marketPrice: product.priceHistories[0].marketPrice || 0,
      salePrice: product.priceHistories[0].salePrice || 0,
      status: product.status || null,
      _id: product._id,
    },
    onSubmit: async (values) => {
      setAction("Update");
      const data = await convertObjectToFormData(values);
      toast({
        title: t("Messages.updateProcessing"),
      });
      await dispatch(updateProduct(product._id, data));
      if (!error) {
        router.back();
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
      setAction(null);
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
    handleChange,
    setFieldValue,
    validateField,
    handleBlur,
  } = formik;

  const handleShow = useCallback(async () => {
    setAction("Show");
    await dispatch(showProduct(product._id));
    if (!error) {
      router.back();
      toast({
        title: t("Messages.showProductSuccess"),
        variant: "success",
      });
    } else {
      toast({
        title: t("Messages.showProductFailed"),
        variant: "destructive",
      });
    }
    setAction(null);
  }, [product]);

  const handleHide = useCallback(async () => {
    setAction("Hide");
    await dispatch(hideProduct(product._id));
    if (!error) {
      router.back();
      toast({
        title: t("Messages.hideProductSuccess"),
        variant: "success",
      });
    } else {
      toast({
        title: t("Messages.hideProductFailed"),
        variant: "destructive",
      });
    }
    setAction(null);
  }, [product]);

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
                    <CheckIcon valid={!errors.name} />
                  </span>
                  {t("Validation.lengthName", {
                    min: MIN_LENGTH_NAME_PRODUCT,
                    max: MAX_LENGTH_NAME_PRODUCT,
                  })}
                </p>
                <p className="flex gap-1">
                  <span className="w-[22px] h-[22px] items-center flex justify-center">
                    <CheckIcon valid={!errors.marketPrice} />
                  </span>
                  {t("Validation.minMaxMarketPrice", {
                    min: minPriceFormat,
                    max: maxPriceFormat,
                  })}
                </p>
                <p className="flex gap-1">
                  <span className="w-[22px] h-[22px] items-center flex justify-center">
                    <CheckIcon valid={!errors.salePrice} />
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
                  error={!!errors.name}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={async (e) => {
                    if (values.name !== product?.name) {
                      await validateField("name");
                    }
                    handleBlur(e);
                  }}
                  value={values.name}
                  helperText={errors.name}
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
                  error={!!errors.marketPrice}
                  id="marketPrice"
                  name="marketPrice"
                  onChange={(e) => {
                    if (Number(e.target.value) >= MAX_PRICE_PRODUCT) {
                      e.target.value = MAX_PRICE_PRODUCT.toString();
                    }
                    handleChange(e);
                  }}
                  onBlur={(e) => {
                    if (
                      values.marketPrice !==
                      product?.priceHistories[0].marketPrice
                    ) {
                      validateField("marketPrice");
                    }
                    handleBlur(e);
                  }}
                  value={values.marketPrice}
                  helperText={errors.marketPrice}
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
                  error={!!errors.salePrice}
                  id="salePrice"
                  name="salePrice"
                  onChange={(e) => {
                    if (Number(e.target.value) >= MAX_PRICE_PRODUCT) {
                      e.target.value = MAX_PRICE_PRODUCT.toString();
                    }
                    handleChange(e);
                  }}
                  onBlur={(e) => {
                    if (
                      values.salePrice !==
                      product?.priceHistories[0].salePrice
                    ) {
                      validateField("salePrice");
                    }
                    handleBlur(e);
                  }}
                  value={values.salePrice}
                  helperText={errors.salePrice}
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

        {!product.hiddenAt && (
          <Button
            className="min-w-[120px]"
            disabled={!isValid || isLoading}
            type="button"
            variant="outline"
            onClick={handleHide}
          >
            {isLoading && action === "Hide" && (
              <Spinner className="text-[#fff]" />
            )}
            {t("titleBtnHide")}
          </Button>
        )}

        {product.hiddenAt && (
          <Button
            className="min-w-[120px]"
            disabled={!isValid || isLoading}
            type="button"
            onClick={handleShow}
          >
            {isLoading && action === "Show" && (
              <Spinner className="text-[#fff]" />
            )}
            {t("titleBtnShow")}
          </Button>
        )}

        <Button
          className="min-w-[120px]"
          disabled={!isValid || isLoading}
          type="submit"
        >
          {isLoading && action === "Update" && (
            <Spinner className="text-[#fff]" />
          )}
          {t("titleBtnUpdate")}
        </Button>
      </AppFooter>
    </form>
  );
});
