import { jsonResponse } from "@/app/util/response";
import { register } from "@/lib/firebase/service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = await register(req);
  if (res) {
    return jsonResponse(res.statusCode, res.message);
  }
  return jsonResponse(500, "Server Error");
}
