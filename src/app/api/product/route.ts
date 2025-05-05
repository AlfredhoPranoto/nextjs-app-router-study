import { jsonResponse } from "@/app/util/response";
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest } from "next/server";

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
