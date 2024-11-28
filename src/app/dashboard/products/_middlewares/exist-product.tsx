"use client";

import NotFound from "@/app/not-found";
import { Spinner } from "@/components/ui/spinner";
import { getProduct } from "@/lib/features/product-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function ExistProduct({ children }: { children: ReactNode }) {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { item } = useAppSelector((state: RootState) => state.product);
  const [loadingGetProduct, setLoadingGetProduct] = useState(false);

  // Cannot use isLoading from product slice, it duplicate state in children
  useEffect(() => {
    if (!productId) return;
    async function fetchProduct() {
      setLoadingGetProduct(true);
      await dispatch(getProduct(productId as string));
      setLoadingGetProduct(false);
    }
    fetchProduct();
  }, []);

  if (loadingGetProduct) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="large" className="text-[#1890ff]" />
      </div>
    );
  }

  if (!loadingGetProduct && !item) {
    return <NotFound />;
  }

  return children;
}
