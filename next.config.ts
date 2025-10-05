import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'loom-a-like.b-cdn.netmain', protocol: 'https', port: '', pathname: '/**'},
      { hostname: 'lh3.googleusercontent.com', protocol: 'https', port: '', pathname: '/**'},
    ]
  }
};

export default nextConfig;
