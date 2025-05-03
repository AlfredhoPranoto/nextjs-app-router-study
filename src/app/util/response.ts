import { NextResponse } from "next/server";

export const jsonResponse = (status: number, message: string, data?: object) =>
  NextResponse.json({ status, message, data });
