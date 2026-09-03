import { NextResponse } from "next/server";

import { heroService } from "@/lib/services/hero.service";

export async function GET() {
  const heroData = await heroService.getHeroData();
  return NextResponse.json(heroData);
}
