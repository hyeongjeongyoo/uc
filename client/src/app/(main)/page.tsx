"use client";

import { Global } from "@emotion/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { PopupManager } from "@/components/common/PopupManager";
import MainSection from "@/components/main/component/MainSection";
import { Box } from "@chakra-ui/react";
import { Header } from "@/components/layout/view/Header/Header";

export default function Home() {
  return (
    <>
      <PopupManager />
      <Global
        styles={{
          "@font-face": {
            fontFamily: "Tenada",
            src: "url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2') format('woff2')",
            fontWeight: "normal",
            fontStyle: "normal",
          },
        }}
      />
      <Box>
        <Header currentPage="/" menus={[]} />
        <MainSection />
      </Box>
    </>
  );
}