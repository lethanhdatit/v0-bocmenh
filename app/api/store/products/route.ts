import { NextResponse } from "next/server"
import { getProducts } from "@/lib/products"

export async function GET(request: Request) {
  try {
    // TODO: Implement more sophisticated filtering based on query params
    // For now, just returning all products
    const products = await getProducts()

    // Simulate BFF encryption
    // const encryptedResponse = await encryptData(JSON.stringify({ products }));
    // return NextResponse.json({ data: encryptedResponse });

    // For simplicity in this step, returning directly
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    // const encryptedError = await encryptData(JSON.stringify({ message: 'Failed to fetch products' }));
    // return NextResponse.json({ error: encryptedError }, { status: 500 });
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
  }
}
