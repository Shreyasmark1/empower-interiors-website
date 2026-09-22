import { HeroSection } from "@/components/hero";
import { AnnouncementStrip } from "@/components/announcement-strip";
import { PromoTile } from "@/components/promo-tile";
import { Container } from "@/components/ui/container";
import { TextStrip } from "@/components/text-strip";
import { DealsGrid, type DealsProduct } from "@/components/deals";
import { RoomInspiration } from "@/components/room-inspiration";
import { FreshFinds, type DealsProduct as FreshFindsProduct } from "@/components/fresh-finds";
import { mockCatalog } from "@/components/product-listing";

function catalogProduct(slug: string): DealsProduct {
  const product = mockCatalog.find((item) => item.slug === slug);
  if (!product) {
    throw new Error(`Missing mock product: ${slug}`);
  }
  return {
    image: product.image,
    name: product.name,
    price: product.price,
    originalPrice: product.wasPrice ?? product.price,
    ...(product.discountPercent != null
      ? { discountPercent: product.discountPercent }
      : {}),
    href: `/products/${product.slug}`,
  };
}

const freshFindsProducts: FreshFindsProduct[] = [
  catalogProduct("mira-cane-armchair"),
  catalogProduct("ceramic-vase-trio"),
  catalogProduct("sloane-2-seater-sofa"),
  catalogProduct("sloane-sofa-cum-bed"),
  catalogProduct("harlow-fabric-lounge-chair"),
];

const dealsProducts: DealsProduct[] = [
  catalogProduct("lem-velvet-3-seater-sofa"),
  catalogProduct("lennox-l-shaped-sofa"),
  catalogProduct("knox-velvet-recliner"),
  catalogProduct("rustic-wood-dining-table"),
  catalogProduct("ashwood-open-bookshelf"),
];

function HomeSections() {
  return (
    <div className="flex flex-col flex-1">
      <HeroSection />

      <div className="mt-8">
        <Container>
          <AnnouncementStrip
            src="https://picsum.photos/seed/announce/1676/153"
            width={1676}
            height={153}
          />
        </Container>
      </div>

      <div className="mt-8">
        <Container>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <PromoTile
              image="https://picsum.photos/seed/promo-a/550/159"
              headline="New Sofa Collection"
              ctaText="Shop sofas"
              ctaLink="/sofas"
              size="sm"
            />
            <PromoTile
              image="https://picsum.photos/seed/promo-b/550/159"
              headline="Lighting Sale"
              ctaText="Shop lighting"
              ctaLink="/lighting"
              size="sm"
            />
            <PromoTile
              image="https://picsum.photos/seed/promo-c/550/159"
              headline="Decor That Inspires"
              ctaText="Shop decor"
              ctaLink="/decor"
              size="sm"
            />
          </div>
        </Container>
      </div>

      <div className="mt-8">
        <TextStrip
          text="Visit Our Store"
          image={{
            src: "https://picsum.photos/seed/announce/1676/153",
            width: 1676,
            height: 153,
          }}
        />
      </div>

      <div className="mt-8">
        <Container>
          <DealsGrid
            sectionTitle="What The Empower Deals"
            products={dealsProducts}
          />
        </Container>
      </div>

      <div className="mt-8">
        <Container>
          <RoomInspiration title="Room Inspiration" />
        </Container>
      </div>

      <div className="mt-8">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <PromoTile
              image="https://picsum.photos/seed/promo-md-a/831/263"
              headline="Monsoon Sale — Up to 40% Off"
              ctaText="Shop now"
              ctaLink="/sale"
              size="md"
            />
            <PromoTile
              image="https://picsum.photos/seed/promo-md-b/831/263"
              headline="Free Shipping Over ₹999"
              ctaText="Explore"
              ctaLink="/shipping"
              size="md"
            />
          </div>
        </Container>
      </div>

      <div className="mt-8">
        <Container>
          <AnnouncementStrip
            src="https://picsum.photos/seed/announce-bottom/1676/153"
            width={1676}
            height={153}
          />
        </Container>
      </div>

      <div className="mt-8">
        <Container>
          <FreshFinds
            title="Fresh Finds at Empower"
            products={freshFindsProducts}
          />
        </Container>
      </div>

      <div className="mt-8">
        <AnnouncementStrip
          src="https://picsum.photos/seed/announce-bottom/1676/153"
          width={1676}
          height={153}
        />
      </div>
    </div>
  );
}

export { HomeSections };
