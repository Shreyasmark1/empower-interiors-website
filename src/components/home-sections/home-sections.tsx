import { HeroSection } from "@/components/hero";
import { AnnouncementStrip } from "@/components/announcement-strip";
import { PromoTile } from "@/components/promo-tile";
import { Container } from "@/components/ui/container";
import { TextStrip } from "@/components/text-strip";
import { DealsGrid, type DealsProduct } from "@/components/deals";
import { RoomInspiration } from "@/components/room-inspiration";
import { FreshFinds, type DealsProduct as FreshFindsProduct } from "@/components/fresh-finds";

const freshFindsProducts: FreshFindsProduct[] = [
  {
    image: "https://picsum.photos/seed/fresh-1/370/370",
    name: "Bamboo Planter",
    price: 349,
    originalPrice: 499,
  },
  {
    image: "https://picsum.photos/seed/fresh-2/370/370",
    name: "Linen Cushion Cover",
    price: 299,
    originalPrice: 399,
  },
  {
    image: "https://picsum.photos/seed/fresh-3/370/370",
    name: "Brass Table Lamp",
    price: 1199,
    originalPrice: 1799,
    discountPercent: 33,
  },
  {
    image: "https://picsum.photos/seed/fresh-4/370/370",
    name: "Ceramic Diffuser",
    price: 550,
    originalPrice: 750,
  },
  {
    image: "https://picsum.photos/seed/fresh-5/370/370",
    name: "Oak Wall Shelf",
    price: 899,
    originalPrice: 1200,
  },
];

const dealsProducts: DealsProduct[] = [
  {
    image: "https://picsum.photos/seed/deal-1/370/370",
    name: "Linen Armchair",
    price: 1299,
    originalPrice: 1899,
  },
  {
    image: "https://picsum.photos/seed/deal-2/370/370",
    name: "Walnut Coffee Table",
    price: 899,
    originalPrice: 1599,
    discountPercent: 44,
  },
  {
    image: "https://picsum.photos/seed/deal-3/370/370",
    name: "Pendant Lamp",
    price: 345,
    originalPrice: 1499,
    discountPercent: 77,
  },
  {
    image: "https://picsum.photos/seed/deal-4/370/370",
    name: "Accent Stool",
    price: 640,
    originalPrice: 1099,
  },
  {
    image: "https://picsum.photos/seed/deal-5/370/370",
    name: "Ceramic Vase Set",
    price: 460,
    originalPrice: 560,
  },
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
