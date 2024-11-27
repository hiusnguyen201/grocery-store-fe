"use client";

import NotFound from "@/app/not-found";
import { Spinner } from "@/components/ui/spinner";
import { getProduct } from "@/lib/features/product-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useParams } from "next/navigation";
import { cloneElement, ReactElement, ReactNode, useEffect } from "react";

export function CheckProduct({ children }: { children: ReactNode }) {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, item } = useAppSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (productId) {
      dispatch(getProduct(productId as string));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"large"} />
      </div>
    );
  }

  if (!isLoading && !item) {
    return <NotFound />;
  }

  return cloneElement(children as ReactElement, { product: item });
}
