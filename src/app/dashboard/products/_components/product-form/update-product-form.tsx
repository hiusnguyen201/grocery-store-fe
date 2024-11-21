// "use client";

// import { DialogForm } from "@/components/form/dialog-form";
// import { Label } from "@/components/ui/label";
// import { useFormik } from "formik";
// import {
//   cloneElement,
//   ReactElement,
//   ReactNode,
//   useEffect,
//   useState,
// } from "react";
// import { FileUploader } from "@/components/file-uploader";
// import { Product, productSchema } from "@/app/dashboard/products/schema";
// import { TextField } from "@/components/text-field";
// import { Button } from "@/components/ui/button";
// import { formatCurrency } from "@/lib/utils";
// import { useTranslations } from "next-intl";
// import { allowImageMimeTypes, MAX_UPLOAD_FILE_SIZE } from "@/constants";

// export function UpdateProductForm({
//   trigger,
//   data,
// }: {
//   data: Product;
//   trigger: ReactNode | string;
// }) {
//   const [openDialogForm, setOpenDialogForm] = useState(false);

//   const t = useTranslations("Dashboard.ProductsPage");
//   const formik = useFormik({
//     initialValues: {
//       name: data.name,
//       marketPrice: data.marketPrice,
//       salePrice: data.salePrice,
//     },
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//     validationSchema: productSchema,
//   });

//   const {
//     handleSubmit,
//     values,
//     handleChange,
//     errors,
//     handleReset,
//     isValid,
//     handleBlur,
//     touched,
//   } = formik;

//   useEffect(() => {
//     (async () => {
//       if (!openDialogForm) return;
//       if (data.image) {
//         const response = await fetch(data.image);
//         console.log(response);
//       }
//     })();
//   }, []);

//   const triggerWrapper = cloneElement(trigger as ReactElement, {
//     onClick: (e: Event) => {
//       e.preventDefault();
//     },
//   });

//   return (
//     <>
//       <button
//         className="w-full"
//         onClick={() => {
//           setOpenDialogForm(true);
//         }}
//       >
//         {triggerWrapper}
//       </button>
//       <DialogForm
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         className="space-y-4"
//         onResetWhenClose={handleReset}
//       >
//         {/* Image */}
//         <div>
//           <Label htmlFor="image" className="text-right">
//             {t("imageField")}
//           </Label>
//           <FileUploader
//             maxSize={MAX_UPLOAD_FILE_SIZE}
//             maxFiles={1}
//             multiple={false}
//             accept={{ "image/*": allowImageMimeTypes }}
//           />
//         </div>

//         {/* Name */}
//         <TextField
//           type="text"
//           label={t("nameProductField")}
//           error={!!(touched.name && errors.name)}
//           id="name"
//           name="name"
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.name}
//           helperText={touched.name && errors.name}
//         />

//         <div className="flex flex-wrap md:flex-nowrap gap-4">
//           {/* Market Price */}
//           <div className="col-6 w-full">
//             <TextField
//               type="number"
//               label={
//                 <>
//                   {t("marketPriceField")} (
//                   <span className="text-sm">
//                     {formatCurrency(values.marketPrice)}
//                   </span>
//                   )
//                 </>
//               }
//               error={!!(touched.marketPrice && errors.marketPrice)}
//               id="marketPrice"
//               name="marketPrice"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={values.marketPrice}
//               helperText={touched.marketPrice && errors.marketPrice}
//             />
//           </div>

//           {/* Sale Price */}
//           <div className="col-6 w-full">
//             <TextField
//               type="number"
//               label={
//                 <>
//                   {t("salePriceField")} (
//                   <span className="text-sm">
//                     {formatCurrency(values.salePrice)}
//                   </span>
//                   )
//                 </>
//               }
//               error={!!(touched.salePrice && errors.salePrice)}
//               id="salePrice"
//               name="salePrice"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={values.salePrice}
//               helperText={touched.salePrice && errors.salePrice}
//             />
//           </div>
//         </div>

//         <div className="md:text-end">
//           <Button
//             className="md:w-auto w-full min-w-[100px]"
//             disabled={
//               Object.keys(touched).length !==
//                 Object.keys(formik.initialValues).length || !isValid
//             }
//             type="submit"
//           ></Button>
//         </div>
//       </DialogForm>
//     </>
//   );
// }
