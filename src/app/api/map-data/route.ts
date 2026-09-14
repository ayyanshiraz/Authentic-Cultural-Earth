import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET() {
  try {
    const locations = await prisma.order.findMany({
      select: { city: true, country: true },
      distinct: ["city", "country"],
      take: 5
    });
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch map data" }, { status: 500 });
  }
}