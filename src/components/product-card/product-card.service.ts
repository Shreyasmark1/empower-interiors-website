import {
  AddToCartInput,
  AddToCartInputSchema,
  CartItem,
  CartItemSchema,
  Product,
  ProductSchema,
} from "@/lib/schemas";

type MockProductData = Omit<Product, "status"> & { status?: Product["status"] };

const catalogSeed: MockProductData[] = [
  { id: "p1", name: "Arcadia Lounge Chair", category: "Seating", price: 18499, wasPrice: 22999 },
  { id: "p2", name: "Bora Oak Dining Table", category: "Dining", price: 32999, status: "newArrival" },
  { id: "p3", name: "Mira Velvet Sofa", category: "Seating", price: 54999, status: "soldOut" },
  { id: "p4", name: "Lumen Floor Lamp", category: "Lighting", price: 7499 },
];

const catalog: Product[] = catalogSeed.map((product) => ProductSchema.parse(product));

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const cart: CartItem[] = [];
let nextCartId = 1;

export const cartService = {
  async addToCart(input: AddToCartInput): Promise<CartItem> {
    await delay(200);
    const { productId, quantity } = AddToCartInputSchema.parse(input);
    const existing = cart.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity = Math.min(99, existing.quantity + quantity);
      return existing;
    }
    const item = CartItemSchema.parse({
      id: `ci_${nextCartId++}`,
      productId,
      quantity,
    });
    cart.push(item);
    return item;
  },

  async getCartItems(): Promise<CartItem[]> {
    await delay(200);
    return cart.map((item) => CartItemSchema.parse(item));
  },

  async listProducts(): Promise<Product[]> {
    await delay(200);
    return catalog.map((product) => ProductSchema.parse(product));
  },
};

export type { CartItem, Product } from "@/lib/schemas";