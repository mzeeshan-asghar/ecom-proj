import { BannerCardProps } from "@/components/showcase/BannerCard";
import { SmartphoneCharging } from "lucide-react";

export const categoryList = Array.from({ length: 10 }).map((_, index) => ({
  label: `Category ${index + 1} `,
  Icon: SmartphoneCharging,
  url: "/",
}));

export const bannerCardsList: BannerCardProps[] = [
  {
    subtitle: "Featured",
    title: "Women’s Collections",
    btnText: "buy Now",
    url: "#",
    imageUrl: "/assets/images/card-banner-1.webp",
  },
  {
    subtitle: "Speakers",
    title: "Amazon wireless speakers",
    btnText: "buy Now",
    url: "#",
    imageUrl: "/assets/images/card-banner-2.webp",
  },
  {
    subtitle: "Perfume",
    title: "GUCCI INTENSE OUD EDP",
    btnText: "buy Now",
    url: "#",
    imageUrl: "/assets/images/card-banner-3.webp",
  },
];
