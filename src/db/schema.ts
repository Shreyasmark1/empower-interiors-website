import { relations, sql } from "drizzle-orm";
import {
  bigint,
  bigserial,
  boolean,
  check,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

export const categories = pgTable(
  "categories",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    parentId: bigintNumber("parent_id").references(
      (): AnyPgColumn => categories.id,
      { onDelete: "restrict" },
    ),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
    image: text("image"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    unique("categories_parent_id_slug_unique").on(table.parentId, table.slug),
    index("idx_categories_parent_id").on(table.parentId),
  ],
);

export const products = pgTable(
  "products",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    name: varchar("name", { length: 500 }).notNull(),
    slug: varchar("slug", { length: 500 }).notNull().unique(),
    description: text("description"),
    thumbnail: text("thumbnail"),
    minPrice: numeric("min_price", { precision: 12, scale: 2, mode: "number" }),
    specifications: jsonb("specifications")
      .$type<Record<string, unknown>>()
      .notNull()
      .default({}),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
  },
);

export const productCategories = pgTable(
  "product_categories",
  {
    productId: intId("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: intId("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      name: "product_categories_pkey",
      columns: [table.productId, table.categoryId],
    }),
    index("idx_product_categories_category_id").on(table.categoryId),
  ],
);

export const variants = pgTable(
  "variants",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    productId: intId("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    images: text("images").array().notNull().default(sql`'{}'::text[]`),
    price: numeric("price", { precision: 12, scale: 2, mode: "number" }).notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("idx_variants_product_id").on(table.productId)],
);

export const promotions = pgTable(
  "promotions",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    title: varchar("title", { length: 500 }),
    description: text("description"),
    image: text("image"),
    mobileImage: text("mobile_image"),
    linkUrl: text("link_url"),
    buttonText: varchar("button_text", { length: 100 }),
    startsAt: timestamp("starts_at", { withTimezone: true, mode: "date" }),
    endsAt: timestamp("ends_at", { withTimezone: true, mode: "date" }),
    isActive: boolean("is_active").notNull().default(true),
    isDeleted: boolean("is_deleted").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_promotions_active_dates").on(
      table.isActive,
      table.startsAt,
      table.endsAt,
    ),
  ],
);

export const promotionTargets = pgTable(
  "promotion_targets",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    promotionId: intId("promotion_id")
      .notNull()
      .references(() => promotions.id, { onDelete: "cascade" }),
    targetType: varchar("target_type", { length: 30 }).notNull(),
    categoryId: intId("category_id").references(() => categories.id, {
      onDelete: "cascade",
    }),
    productId: intId("product_id").references(() => products.id, {
      onDelete: "cascade",
    }),
    placement: varchar("placement", { length: 50 }).notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    isDeleted: boolean("is_deleted").notNull().default(false),
  },
  (table) => [
    index("idx_promotion_targets_promotion_id").on(table.promotionId),
    index("idx_promotion_targets_category_id").on(table.categoryId),
    index("idx_promotion_targets_product_id").on(table.productId),
    check(
      "promotion_targets_target_type_check",
      sql`${table.targetType} IN ('homepage', 'category', 'product')`,
    ),
    check(
      "promotion_targets_placement_check",
      sql`${table.placement} IN ('hero', 'banner', 'section')`,
    ),
  ],
);

export const users = pgTable(
  "users",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: varchar("role", { length: 30 }).notNull().default("admin"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .notNull()
      .defaultNow(),
  },
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "category_children",
  }),
  children: many(categories, { relationName: "category_children" }),
  productLinks: many(productCategories),
}));

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(variants),
  categoryLinks: many(productCategories),
}));

export const productCategoriesRelations = relations(
  productCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productCategories.productId],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [productCategories.categoryId],
      references: [categories.id],
    }),
  }),
);

export const variantsRelations = relations(variants, ({ one }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
}));

export const promotionsRelations = relations(promotions, ({ many }) => ({
  targets: many(promotionTargets),
}));

export const promotionTargetsRelations = relations(
  promotionTargets,
  ({ one }) => ({
    promotion: one(promotions, {
      fields: [promotionTargets.promotionId],
      references: [promotions.id],
    }),
    category: one(categories, {
      fields: [promotionTargets.categoryId],
      references: [categories.id],
    }),
    product: one(products, {
      fields: [promotionTargets.productId],
      references: [products.id],
    }),
  }),
);

function bigintNumber(name: string) {
  return bigint(name, { mode: "number" });
}

function intId(name: string) {
  return bigint(name, { mode: "number" });
}