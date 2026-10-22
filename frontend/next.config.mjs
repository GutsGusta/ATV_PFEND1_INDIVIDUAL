const urlApi = process.env.API_URL || "http://localhost:3001";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:caminho*",
        destination: `${urlApi}/api/:caminho*`,
      },
    ];
  },
};

export default nextConfig;
