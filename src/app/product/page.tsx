/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "@/components/fragments/ProductCard";
import { getData } from "../services/products";
import Link from "next/link";

type ProductPageProps = { params: Promise<{ slug: string[] }> };

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await getData("http://localhost:3000/api/product");
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5">
      {products.data.length > 0 &&
        products.data.map((product: any) => (
          <Link key={product.id} href={`product/detail/${product.id}`}>
            <ProductCard>
              <ProductCard.Header imageUrl={product.image} />
              <ProductCard.Body>{product.name}</ProductCard.Body>
              <ProductCard.Footer>
                {product.price.toLocaleString("en", {
                  style: "currency",
                  currency: "USD",
                })}
              </ProductCard.Footer>
            </ProductCard>
          </Link>
        ))}
      {slug && (
        <>
          <p>Category: {slug[0]}</p>
          <p>Gender: {slug[1]}</p>
          <p>Id: {slug[2]}</p>
        </>
      )}
    </div>
  );
}
