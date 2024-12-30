import { ButtonProps } from "@workspace/ui/components/button";
import { LucideIcon } from "lucide-react";
 import React from "react";

declare global {
  interface SegmentParams {
    [key: string]: string;
  }

  interface PageParams {
    params: Promise<SegmentParams>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }

  type DivProps = React.HTMLAttributes<HTMLDivElement>;

  type SVGIconProps = React.SVGProps<SVGSVGElement>;

  interface CSSCustomProperties extends React.CSSProperties {
    [key: string]: string | number | undefined;
  }

  interface BadgeProps {
    count: number | string;
    className?: string;
    children?: React.ReactNode;
  }

  interface LogoProps extends SVGIconProps {
    variant?: "full" | "mini";
  }

  interface LinkButtonProps extends ButtonProps {
    text?: string;
    href: string;
    children?: React.ReactNode;
  }

  interface CountdownTimerProps {
    startDate: string;
    endDate: string;
  }

  interface HeaderProps {
    currentUser: DefaultSession["user"];
  }

  interface ProductCardProps {
    id?: number;
    name?: string;
    price?: {
      original: number;
      sale: number;
    };
    imageUrl: string;
    category?: string;
    rating?: number;
    reviews?: number;
    inStock?: boolean;
    className?: string;
  }

  interface CategoryCardProps {
    label: string;
    Icon: LucideIcon;
    url: string;
    className?: string;
  }

  interface FeatureCardProps {
    className?: string;
    index?: number;
    title: string;
    desc: string;
    url: string;
    imageUrl: string;
  }

  interface ShowcaseSectionProps {
    className?: string;
    useCarousel?: boolean;
    headerProps?: SectionHeaderProps;
    footerProps?: SectionFooterProps;
  }

  interface SectionHeaderProps {
    className?: string;
    title?: string;
    subtitle?: {
      text: string;
      showBefore?: boolean;
    };
    countdown?: CountdownData;
    linkButtonProps?: LinkButtonProps;
    useCarousel?: boolean;
  }

  interface SectionFooterProps {
    className?: string;
    linkButtonProps: LinkButtonProps;
    useCarousel?: boolean;
  }

  interface ProductSectionProps extends ShowcaseSectionProps {
    items: ProductCardProps[];
  }

  interface CategorySectionProps extends ShowcaseSectionProps {
    items: CategoryCardProps[];
  }

  interface FeatureSectionProps extends ShowcaseSectionProps {
    items: FeatureCardProps[];
  }
}

export {};