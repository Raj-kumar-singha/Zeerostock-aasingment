import { NextRequest, NextResponse } from "next/server";
import { inventory } from "@/data/inventory";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q")?.toLowerCase() || "";
    const category = searchParams.get("category") || "";
    // Parse and handle invalid numeric inputs
    const minPrice = parseFloat(searchParams.get("minPrice") || "0") || 0;
    const maxVal = searchParams.get("maxPrice");
    const maxPrice = maxVal ? parseFloat(maxVal) : Infinity;

    // Edge Case: Invalid price range (min > max)
    if (maxPrice !== Infinity && minPrice > maxPrice) {
        return NextResponse.json([]);
    }

    const results = inventory.filter((item) => {
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = category ? item.category === category : true;
        const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
        return matchesName && matchesCategory && matchesPrice;
    });

    return NextResponse.json(results);
}
