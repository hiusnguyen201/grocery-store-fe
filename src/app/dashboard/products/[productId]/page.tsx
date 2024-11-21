type DetailsProductPage = { params: { productId: string } };

export default async function DetailsProductPage({
  params,
}: DetailsProductPage) {
  const product = await params;

  return <>{product.productId}</>;
}
