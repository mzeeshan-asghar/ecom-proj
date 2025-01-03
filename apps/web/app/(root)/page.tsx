import HeroSection from "@/components/showcase/HeroSection";
import CategorySection from "@/components/showcase/CategorySection";
import ProductSection from "@/components/showcase/ProductSection";
import { Separator } from "@workspace/ui/components/separator";
import {
  productList,
  categoryList,
  bannerCardsList,
} from "@/constants/product";
import BannerCardSection from "@/components/showcase/BannerCardSection";

function Home() {
  return (
    <>
      <HeroSection />
      <BannerCardSection items={bannerCardsList} />
      <ProductSection
        items={productList}
        useCarousel={true}
        headerProps={{
          title: "Flash Sale",
          subtitle: { text: "Today's" },
          countdown: {
            startDate: "2024-12-23T00:00:00",
            endDate: "2025-01-03T00:00:00",
          },
        }}
        footerProps={{ linkButtonProps: { href: "/products" } }}
      />
      <Separator />
      <CategorySection
        items={categoryList}
        useCarousel={true}
        headerProps={{
          title: "Browse By Category",
          subtitle: { text: "Categories" },
        }}
      />
      <Separator />
      <ProductSection
        items={productList}
        headerProps={{
          title: "Best Selling Products",
          subtitle: { text: "This Month" },
          linkButtonProps: { href: "/products", variant: "outline" },
        }}
      />
      <ProductSection
        items={productList}
        useCarousel={true}
        headerProps={{
          title: "Explore Our Products",
          subtitle: { text: "Our Products" },
        }}
        footerProps={{ linkButtonProps: { href: "/products" } }}
      />
    </>
  );
}

export default Home;
