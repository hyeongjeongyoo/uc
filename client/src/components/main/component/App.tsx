"use client";

import { Box } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { PopupManager } from "@/components/common/PopupManager";
import MainSection from "./MainSection";
import { menuApi, menuKeys, sortMenus } from "@/lib/api/menu";
import { MenuApiResponse } from "@/types/api-response";
import { Header } from "@/components/layout/view/Header/Header";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  // CMS에서 메뉴 데이터 가져오기
  const { data: menuResponse } = useQuery<MenuApiResponse>({
    queryKey: menuKeys.lists(),
    queryFn: async () => {
      const response = await menuApi.getPublicMenus();
      return response.data;
    },
    retry: 1,
  });

  const sortedMenus = sortMenus(menuResponse?.data || []);

  return (
    <Box className="app">
      <Header currentPage="메인" menus={sortedMenus} isPreview={false} />
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
      <MainSection />
    </Box>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
