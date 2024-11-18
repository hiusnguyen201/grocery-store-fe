"use client";

import { DialogForm } from "@/components/ui/form/dialog-form";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Fragment } from "react";
import { FileUploader } from "@/components/ui/file-upload";

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
  });

  const { handleSubmit, values, handleChange, errors, handleReset } =
    formik;

  return (
    <DialogForm
      title="Thêm sản phẩm"
      btnSubmitTitle="Tạo mới"
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
        <FileUploader />
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name" className="text-right">
          Tên sản phẩm
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          className="col-span-3"
          onChange={handleChange}
          value={values.name}
        />
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-4">
        {/* Market Price */}
        <div className="col-6 w-full">
          <Label htmlFor="marketPrice" className="text-right">
            Giá mua
          </Label>
          <Input
            type="number"
            id="marketPrice"
            name="marketPrice"
            className="col-span-3"
            onChange={handleChange}
            value={values.marketPrice}
          />
        </div>

        {/* Sale Price */}
        <div className="col-6 w-full">
          <Label htmlFor="salePrice" className="text-right">
            Giá bán
          </Label>
          <Input
            type="number"
            id="salePrice"
            name="salePrice"
            className="col-span-3"
            onChange={handleChange}
            value={values.salePrice}
          />
        </div>
      </div>
    </DialogForm>
  );
}
