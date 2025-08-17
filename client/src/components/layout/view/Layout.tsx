"use client";

import { Box } from "@chakra-ui/react";
import { Header } from "./Header/Header";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { menuApi, menuKeys, sortMenus } from "@/lib/api/menu";
import { MenuApiResponse } from "@/types/api-response";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const currentPage = pathname || "/";

  // 메뉴 데이터 가져오기
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
    <Box>
      <Header currentPage={currentPage} menus={sortedMenus} />
      {children}
    </Box>
  );
};

export default Layout;
