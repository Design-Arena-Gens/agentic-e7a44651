import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetails } from "@/components/product/product-details";

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
