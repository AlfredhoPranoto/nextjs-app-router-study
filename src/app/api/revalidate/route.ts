import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { jsonResponse } from "@/app/util/response";

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!tag) {
    return jsonResponse(400, "Missing tag param");
  }

  if (secret !== process.env.REVALIDATE_TOKEN) {
    return jsonResponse(401, "Invalid secret token");
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidate: true, now: Date.now() });
}
