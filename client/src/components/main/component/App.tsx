"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Header } from "@/components/layout/view/Header/Header";
import HeroSlider from "./HeroSlider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { menuApi, menuKeys, sortMenus } from "@/lib/api/menu";
import { Menu } from "@/types/api";
import { MenuApiResponse } from "@/types/api-response"; // 올바른 경로에서 import
import ChemistrySection from "../sections/ChemistrySection";
import CompanySection from "../sections/CompanySection";
import CoreValuesSection from "../sections/CoreValuesSection";
import FinalSection from "../sections/FinalSection";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Card 타입을 App.tsx 내에서 직접 정의
export type Card = {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
  textColor: string;
  link: string;
};

function AppContent() {
  const [section4Visible, setSection4Visible] = useState(false);
  const [section4CardsVisible, setSection4CardsVisible] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cardIndexRef = useRef(0);

  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const section4CardsRef = useRef<HTMLDivElement>(null);
  const companyCardsRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(Date.now());

  // CMS에서 메뉴 데이터 가져오기 (주석 처리)
  const { data: menuResponse, isError } = useQuery<MenuApiResponse>({
    queryKey: menuKeys.lists(),
    queryFn: async () => {
      const response = await menuApi.getPublicMenus();
      return response.data; // response.data가 MenuApiResponse 타입
    },
    retry: 1,
  });
  const sortedMenus = sortMenus(menuResponse?.data || []);

  // Section4 Intersection Observer
  useEffect(() => {
    if (!section4Ref.current) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          timeoutId = setTimeout(() => {
            if (
              !hasAnimated &&
              entry.isIntersecting &&
              entry.intersectionRatio > 0.3
            ) {
              setSection4Visible(true);
              hasAnimated = true;
            } else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
              setSection4Visible(false);
              hasAnimated = false;
            }
          }, 100);
        });
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: "-20px 0px -20px 0px",
      }
    );

    observer.observe(section4Ref.current);

    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Section4 Cards Intersection Observer
  useEffect(() => {
    if (!section4CardsRef.current) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !hasAnimated &&
            entry.isIntersecting &&
            entry.intersectionRatio > 0.4
          ) {
            hasAnimated = true;
            setSection4CardsVisible(true);
          } else if (!entry.isIntersecting && entry.intersectionRatio < 0.1) {
            hasAnimated = false;
            setSection4CardsVisible(false);
          }
        });
      },
      {
        threshold: [0.1, 0.4, 0.6],
        rootMargin: "0px",
      }
    );

    observer.observe(section4CardsRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    cardIndexRef.current = currentCardIndex;
  }, [currentCardIndex]);

  const stats = [
    { category: "수소 생산", rank: "92,000 Nm³/h" },
    { category: "투자액", rank: "2,185억 원" },
    { category: "스팀 생산", rank: "86 t/h" },
    { category: "CO₂ 포집", rank: "600 t/d" },
  ];

  const cards: Card[] = [
    {
      id: 1,
      title: "Business",
      subtitle: "사업분야",
      backgroundImage: "/images/main/section4_1.jpg",
      textColor: "white",
      link: "/business/business",
    },
    {
      id: 2,
      title: "Process",
      subtitle: "주요공정",
      backgroundImage: "/images/main/section4_2.jpg",
      textColor: "white",
      link: "/business/process",
    },
    {
      id: 3,
      title: "Product",
      subtitle: "제품소개",
      backgroundImage: "/images/main/section4_3.jpg",
      textColor: "white",
      link: "/business/product",
    },
  ];

  const companyCards = [
    {
      id: "01",
      title: "회사소개",
      description:
        "K&D Energen은 수소를 포함한 산업용 가스의 제조·공급 및 EPC 솔루션을 제공하는 토탈 에너지 기업입니다.",
      link: "/knd/company",
    },
    {
      id: "02",
      title: "조직도",
      description:
        "지원팀, 생산팀, 설비팀 부서로 구성되어 있으며 부서 간 긴밀한 협업을 통해 최적의 에너지 솔루션을 제공합니다.",
      link: "/knd/organization",
    },
    {
      id: "03",
      title: "오시는 길",
      description:
        "울산광역시 울주군 온산읍 산암로 213에 위치해 있으며, 주차장 및 방문객 주차 공간이 완비되어 있습니다.",
      link: "/knd/location",
    },
  ];

  return (
    <Box className="app">
      <Header currentPage="메인" menus={sortedMenus} isPreview={false} />
      <HeroSlider />

      <ChemistrySection
        sectionRef={section2Ref}
        stats={stats}
        statsRef={statsRef}
      />

      <CompanySection
        sectionRef={section3Ref}
        companyCards={companyCards}
        currentCardIndex={currentCardIndex}
        setCurrentCardIndex={setCurrentCardIndex}
        cardsRef={companyCardsRef}
      />

      <CoreValuesSection
        sectionRef={section4Ref}
        isVisible={section4Visible}
        cards={cards}
        cardsRef={section4CardsRef}
        cardsVisible={section4CardsVisible}
      />

      <FinalSection backgroundImage="/images/main/section6_bg.jpg" />
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
