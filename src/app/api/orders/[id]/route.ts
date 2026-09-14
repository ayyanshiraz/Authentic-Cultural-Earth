import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const order = await prisma.order.findUnique({
      where: { id: resolvedParams.id },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Server processing error" }, { status: 500 });
  }
}