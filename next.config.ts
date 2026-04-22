import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: false,
  },

  async headers() {
    return [
      {
        source: '/guns/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],

      },
       {
        source: '/medieval-village/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],

      },
      {
        source: '/3d-resources/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],

      },
       {
        source: '/monsters/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],

      },
    ];
  },
};

export default nextConfig;
