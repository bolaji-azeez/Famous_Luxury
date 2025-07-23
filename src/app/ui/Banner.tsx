"use client";

import Image from "next/image";
import Link from "next/link";

interface BannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
  backgroundImage?: string;
  titleColor?: string;
}

const Banner = ({
  title,
  subtitle,
  breadcrumbs = [],
  backgroundImage = "/images/black.jpeg",
  titleColor = "#a77354",
}: BannerProps) => {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <Image
        src={backgroundImage}
        alt="Banner Hero"
        fill
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        priority
      />
      <div className="relative z-10 w-[85%] gap-5 flex items-center flex-col justify-center h-full px-6 md:px-12 text-white">
        <h2 className="text-6xl" style={{ color: titleColor }}>
          {title}
        </h2>
        {subtitle && <p className="text-xl">{subtitle}</p>}
        {breadcrumbs.length > 0 && (
          <div className="items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                <Link
                  href={crumb.href}
                  className="hover:underline text-[16px]"
                >
                  {crumb.label}
                </Link>
                {index < breadcrumbs.length - 1 && <span>/</span>}
              </span>
            ))}
            <span className="font-semibold text-[16px]">{title}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;