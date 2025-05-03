import { getData } from "@/app/services/products";
import Modal from "@/components/fragments/Modal";
import Image from "next/image";

/* eslint-disable @typescript-eslint/no-explicit-any */
type ProductDetailProps = {
  params: any;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { data } = await getData(
    `http://localhost:3000/api/product?id=${params.id}`
  );
  return (
    <Modal>
      <div className="w-full mx-auto">
        <Image
          width={300}
          height={300}
          src={data.image}
          alt="image"
          className="w-full object-cover aspect-square col-span-2"
        />
        <div className="bg-white p-4 px-6">
          <h3>{data.name}</h3>
          <p>Price: {data.price}</p>
        </div>
      </div>
    </Modal>
  );
}
