"use client";

import { DialogForm } from "@/components/form/dialog-form";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Fragment } from "react";
import { FileUploader } from "@/components/file-upload";
import { productSchema } from "@/app/dashboard/products/schema";
import { TextField } from "@/components/text-field";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function CreateProductForm() {
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
    handleReset,
    isValid,
    handleBlur,
    touched,
  } = formik;

  return (
    <DialogForm
      title="Thêm sản phẩm"
      btnTriggerTitle={
        <Fragment>
          <Plus /> Thêm mới
        </Fragment>
      }
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-4"
      onResetWhenClose={handleReset}
    >
      {/* Image */}
      <div>
        <Label htmlFor="image" className="text-right">
          Hình ảnh
        </Label>
        <FileUploader onUpload={async (files) => {}} />
      </div>

      {/* Name */}
      <TextField
        type="text"
        label="Tên sản phẩm"
        error={!!(touched.name && errors.name)}
        id="name"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        helperText={touched.name && errors.name}
      />

      <div className="flex flex-wrap md:flex-nowrap gap-4">
        {/* Market Price */}
        <div className="col-6 w-full">
          <TextField
            type="number"
            label={
              <>
                Giá bán (
                <span className="text-sm">
                  {formatCurrency(values.marketPrice)}
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
        </div>

        {/* Sale Price */}
        <div className="col-6 w-full">
          <TextField
            type="number"
            label={
              <>
                Giá bán (
                <span className="text-sm">
                  {formatCurrency(values.salePrice)}
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
        </div>
      </div>

      <div className="md:text-end">
        <Button
          className="md:w-auto w-full min-w-[100px]"
          disabled={
            Object.keys(touched).length !==
              Object.keys(formik.initialValues).length || !isValid
          }
          type="submit"
        >
          Tạo mới
        </Button>
      </div>
    </DialogForm>
  );
}
