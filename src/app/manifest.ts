export default function manifest() {
  return {
    name: "Mỹ phẩm Khánh Diễm",
    short_name: "KD Cosmetics",
    description: "Mỹ phẩm chính hãng – Khánh Diễm",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f43f5e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      // Add more icon sizes when you have them
      // {
      //   src: '/icon-192.png',
      //   sizes: '192x192',
      //   type: 'image/png',
      // },
      // {
      //   src: '/icon-512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      // },
    ],
  };
}
