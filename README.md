# empower-interiors-website

table strcuture:

CREATE TABLE categories (
    id              BIGSERIAL PRIMARY KEY,
    parent_id       BIGINT REFERENCES categories(id) ON DELETE RESTRICT,

    name            VARCHAR(255) NOT NULL,
    slug            VARCHAR(255) NOT NULL,
    description     TEXT,
    image           TEXT,

    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,

    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(parent_id, slug)
);

CREATE INDEX idx_categories_parent_id
    ON categories(parent_id);


CREATE TABLE products (
    id              BIGSERIAL PRIMARY KEY,

    name            VARCHAR(500) NOT NULL,
    slug            VARCHAR(500) NOT NULL UNIQUE,
    description     TEXT,
    thumbnail       TEXT,
    min_price       NUMERIC(12, 2),

    specifications  JSONB NOT NULL DEFAULT '{}',

    is_active       BOOLEAN NOT NULL DEFAULT TRUE,

    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE product_categories (
    product_id      BIGINT NOT NULL
        REFERENCES products(id) ON DELETE CASCADE,

    category_id     BIGINT NOT NULL
        REFERENCES categories(id) ON DELETE CASCADE,

    PRIMARY KEY (product_id, category_id)
);

CREATE INDEX idx_product_categories_category_id
    ON product_categories(category_id);


CREATE TABLE variants (
    id              BIGSERIAL PRIMARY KEY,

    product_id      BIGINT NOT NULL
        REFERENCES products(id) ON DELETE CASCADE,

    name            VARCHAR(255) NOT NULL,
    images          TEXT[] NOT NULL DEFAULT '{}',
    price           NUMERIC(12, 2) NOT NULL,

    sort_order      INTEGER NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,

    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_variants_product_id
    ON variants(product_id);


CREATE TABLE promotions (
    id              BIGSERIAL PRIMARY KEY,

    name            VARCHAR(255) NOT NULL,

    title           VARCHAR(500),
    description     TEXT,

    image           TEXT,
    mobile_image    TEXT,

    link_url        TEXT,
    button_text     VARCHAR(100),

    starts_at       TIMESTAMPTZ,
    ends_at         TIMESTAMPTZ,

    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order      INTEGER NOT NULL DEFAULT 0,

    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_promotions_active_dates
    ON promotions(is_active, starts_at, ends_at);


CREATE TABLE promotion_targets (
    id              BIGSERIAL PRIMARY KEY,

    promotion_id    BIGINT NOT NULL
        REFERENCES promotions(id) ON DELETE CASCADE,

    target_type     VARCHAR(30) NOT NULL,

    category_id     BIGINT
        REFERENCES categories(id) ON DELETE CASCADE,

    product_id      BIGINT
        REFERENCES products(id) ON DELETE CASCADE,

    placement       VARCHAR(50) NOT NULL,

    sort_order      INTEGER NOT NULL DEFAULT 0,

    CHECK (
        target_type IN ('homepage', 'category', 'product')
    ),

    CHECK (
        placement IN ('hero', 'banner', 'section')
    )
);

CREATE INDEX idx_promotion_targets_promotion_id
    ON promotion_targets(promotion_id);

CREATE INDEX idx_promotion_targets_category_id
    ON promotion_targets(category_id);

CREATE INDEX idx_promotion_targets_product_id
    ON promotion_targets(product_id);
