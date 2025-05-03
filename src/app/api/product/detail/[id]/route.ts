import { jsonResponse } from "@/app/util/response";
import { retrieveDataById } from "@/lib/firebase/service";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const detailProduct = await retrieveDataById("products", id);

  if (!detailProduct) return jsonResponse(404, "Product not found");

  return jsonResponse(200, "Success get detail product", detailProduct);
}
