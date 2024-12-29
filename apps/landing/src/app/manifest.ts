import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Highschool - Nền tảng học tập toàn diện cho học sinh trung học",
    short_name: "Highschool",
    description:
      "HighSchool cung cấp một nền tảng học tập toàn diện, giúp học sinh trung học tiếp cận các tài liệu học tập, theo dõi tiến độ và tham gia vào cộng đồng học tập sôi động. Với các tính năng tiên tiến như quản lý kiến thức, lộ trình học tập, và hệ thống trợ giúp thông minh, đây sẽ là người bạn đồng hành đáng tin cậy trên con đường học tập của bạn.",
    icons: [
      //   {
      //     src: 'https://www.goatedu.tech/icons/icon-192x192.png',
      //     sizes: '192x192',
      //     type: 'image/png'
      //   },
      //   {
      //     src: 'https://www.goatedu.tech/icons/icon-512x512.png',
      //     sizes: '512x512',
      //     type: 'image/png'
      //   },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    theme_color: "#ffff",
    background_color: "#1A5FFF",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
  };
}
