import { NextResponse } from "next/server";

import { navigationService } from "@/lib/services/navigation.service";

export async function GET() {
  const navigation = await navigationService.getNavigation();
  return NextResponse.json(navigation);
}
