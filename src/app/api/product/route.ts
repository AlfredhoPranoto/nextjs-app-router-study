import { jsonResponse } from "@/app/util/response";
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest } from "next/server";

// type Data = {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
// };

// const data: Data[] = [
//   {
//     id: 1,
//     title: "Sepatu baru",
//     price: 100000,
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d130fcfa-7169-4172-8955-bf39cc544527/NIKE+VOMERO+18.png",
//   },
//   {
//     id: 2,
//     title: "Sepatu baru 2",
//     price: 200000,
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/88c35e4e-9a89-4ced-8247-c194da41b173/NIKE+VOMERO+18.png",
//   },
//   {
//     id: 3,
//     title: "Sepatu baru 3",
//     price: 300000,
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/14a27a5c-33ef-4f9e-bff8-5f7111ddb8fd/NIKE+VOMERO+18.png",
//   },
//   {
//     id: 4,
//     title: "Sepatu baru 4",
//     price: 300000,
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/14a27a5c-33ef-4f9e-bff8-5f7111ddb8fd/NIKE+VOMERO+18.png",
//   },
//   {
//     id: 5,
//     title: "Sepatu baru 5",
//     price: 350000,
//     image:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/14a27a5c-33ef-4f9e-bff8-5f7111ddb8fd/NIKE+VOMERO+18.png",
//   },
// ];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if ([...searchParams.keys()].some((key) => key !== "id") || id === "") {
    return jsonResponse(400, "Invalid query parameter");
  }

  if (id) {
    // const detailProduct = data.find((item) => item.id === Number(id));
    const detailProduct = await retrieveDataById('products',id);
    if (!detailProduct) return jsonResponse(404, "Product not found");

    return jsonResponse(200, "Success get detail product", detailProduct);
  }
  const products = await retrieveData('products');

  return jsonResponse(200, "Success get all product", products);
}
