import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dleptxeoeehmebdojfwj.supabase.co",
      },
      {
        protocol: "https",
        pathname: "/storage/v1/object/public/**",
        hostname: "ihljjqopdutekhxrhyal.supabase.co",
      }
    ],
  },
};

export default nextConfig;
