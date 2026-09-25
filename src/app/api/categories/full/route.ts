import { handleErrors, ok } from "@/lib/api/http";
import * as queries from "@/lib/queries/categories";

export async function GET() {
  return handleErrors(() => _getCategoryTree());
}

async function _getCategoryTree() {
  const items = await queries.getCategoryTree();
  return ok({ items });
}
