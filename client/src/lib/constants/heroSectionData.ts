export interface HeroPageData {
    title: string;
  subtitle?: string;
  backgroundImage: string;
  height?: string;
  menuItems: Array<{ name: string; href: string }>;
  animationType?: "zoom-in" | "zoom-out" | "pan-right";
}

export interface BoardHeroData extends HeroPageData {
  type: "board";
}

export interface DynamicHeroData extends HeroPageData {
  type: "dynamic";
}

// 완전한 페이지별 히어로 데이터 중앙 관리
export const HERO_DATA: Record<string, HeroPageData> = {
  // KND 관련 페이지들
  "/knd/company": {
    title: "COMPANY",
    subtitle: "K&D Energen을 소개합니다",
    backgroundImage: "/images/main/hero-image.jpg",
    height: "600px",
    menuItems: [
      { name: "회사소개", href: "/knd/company" },
      { name: "회사개요", href: "/knd/company" },
    ],
    animationType: "zoom-in",
  },

  "/knd/organization": {
    title: "COMPANY",
    subtitle: "K&D Energen의 조직도를 소개합니다",
    backgroundImage: "/images/main/hero-image.jpg",
    height: "600px",
    menuItems: [
      { name: "회사소개", href: "/knd/company" },
      { name: "조직도", href: "/knd/organization" },
    ],
    animationType: "zoom-in",
  },

  "/knd/location": {
    title: "COMPANY",
    subtitle: "K&D Energen의 위치를 소개합니다",
    backgroundImage: "/images/main/hero-image.jpg",
    height: "600px",
    menuItems: [
      { name: "회사소개", href: "/knd/company" },
      { name: "오시는 길", href: "/knd/location" },
    ],
    animationType: "zoom-in",
  },

  // Business 관련 페이지들
  "/business/business": {
    title: "BUSINESS",
    subtitle: "K&D Energen의 사업을 소개합니다",
    backgroundImage: "/images/sub/business_bg.jpg",
    height: "600px",
    menuItems: [
      { name: "사업분야", href: "/business/business" },
      { name: "사업분야", href: "/business/business" },
    ],
    animationType: "zoom-out",
  },

  "/business/process": {
    title: "BUSINESS",
    subtitle: "K&D Energen의 주요공정을 소개합니다",
    backgroundImage: "/images/sub/business_bg.jpg",
    height: "600px",
    menuItems: [
      { name: "사업분야", href: "/business/business" },
      { name: "주요공정", href: "/business/process" },
    ],
    animationType: "zoom-out",
  },

  "/business/product": {
    title: "BUSINESS",
    subtitle: "K&D Energen의 주력 제품을 소개합니다",
    backgroundImage: "/images/sub/business_bg.jpg",
    height: "600px",
    menuItems: [
      { name: "사업분야", href: "/business/business" },
      { name: "제품소개", href: "/business/product" },
    ],
    animationType: "zoom-out",
  },

  // 게시판 관련 페이지들 (완전 통합)
  "/bbs": {
    title: "BOARD",
    subtitle: "K&D ENERGEN의 게시판입니다",
    backgroundImage: "/images/sub/privacy_bg.jpg",
    height: "600px",
    menuItems: [
      { name: "홈", href: "/" },
      { name: "게시판", href: "/bbs" },
    ],
    animationType: "zoom-in",
  },

  "/bbs/notices": {
    title: "PR",
    subtitle: "K&D ENERGEN의 공지사항을 확인하세요",
    backgroundImage: "/images/sub/privacy_bg.jpg",
    height: "600px",
    menuItems: [
      { name: "PR", href: "/bbs/notices" },
      { name: "공지사항", href: "/bbs/notices" },
    ],
    animationType: "zoom-in",
  },

  "/bbs/resources": {
    title: "PR",
    subtitle: "K&D ENERGEN의 최신 소식을 전해드립니다",
    backgroundImage: "/images/sub/privacy_bg.jpg",
    height: "600px",
    menuItems: [
      { name: "PR", href: "/bbs/resources" },
      { name: "뉴스/보도자료", href: "/bbs/resources" },
    ],
    animationType: "zoom-in",
  },

  "/bbs/ir": {
    title: "IR",
    subtitle: "K&D ENERGEN의 IR 정보를 확인하세요",
    backgroundImage: "/images/sub/privacy_bg.jpg",
    height: "600px",
    menuItems: [
      { name: "IR", href: "/bbs/ir" },
      { name: "IR", href: "/bbs/ir" },
    ],
    animationType: "zoom-in",
  },


};



// 기본 히어로 데이터 (매칭되지 않는 페이지용)
export const DEFAULT_HERO_DATA: HeroPageData = {
  title: "K&D ENERGEN",
  subtitle: "친환경 에너지 화학기업",
  backgroundImage: "/images/main/hero-image.jpg",
  height: "600px",
  menuItems: [
    { name: "홈", href: "/" },
  ],
  animationType: "zoom-in",
};

// HERO_DATA를 HeroSection 형태로 자동 변환하는 함수
function convertHeroDataToLegacyFormat(heroData: HeroPageData, path: string): {
  header?: string;
  title: string;
  subtitle?: string;
  image: string;
  breadcrumbBorderColor?: string;
  breadcrumb?: { label: string; url: string }[];
} {
  // 경로에 따른 헤더 및 브레드크럼 생성
  const segments = path.split('/').filter(Boolean);
  const breadcrumb: { label: string; url: string }[] = [
    { label: "홈", url: "/" }
  ];

  // 브레드크럼 자동 생성
  if (segments[0] === 'knd') {
    breadcrumb.push({ label: "회사소개", url: "/knd/company" });
    if (segments[1] === 'organization') {
      breadcrumb.push({ label: "조직도", url: path });
    } else if (segments[1] === 'location') {
      breadcrumb.push({ label: "오시는 길", url: path });
    }
  } else if (segments[0] === 'business') {
    breadcrumb.push({ label: "사업분야", url: "/business/business" });
    if (segments[1] === 'process') {
      breadcrumb.push({ label: "사업 프로세스", url: path });
    } else if (segments[1] === 'product') {
      breadcrumb.push({ label: "제품소개", url: path });
    }
  } else if (segments[0] === 'bbs') {
    if (segments[1] === 'notices') {
      breadcrumb.push({ label: "PR", url: "/bbs/notices" });
      breadcrumb.push({ label: "공지사항", url: path });
    } else if (segments[1] === 'resources') {
      breadcrumb.push({ label: "PR", url: "/bbs/resources" });
      breadcrumb.push({ label: "뉴스/보도자료", url: path });
    } else if (segments[1] === 'ir') {
      breadcrumb.push({ label: "IR", url: path });
      breadcrumb.push({ label: "IR", url: path });
    } else {
      breadcrumb.push({ label: "게시판", url: path });
    }
  } else if (segments[0] === 'pr') {
    if (segments[1]) {
      breadcrumb.push({ label: "PR", url: "/pr" });
      if (segments[1] === 'notices') {
        breadcrumb.push({ label: "공지사항", url: path });
      } else if (segments[1] === 'resources') {
        breadcrumb.push({ label: "뉴스/보도자료", url: path });
      } else if (segments[1] === 'ir') {
        breadcrumb.push({ label: "IR", url: path });
      }
    } else {
      breadcrumb.push({ label: "PR", url: path });
    }
  }

  // 헤더 자동 생성
  let header = heroData.title;
  if (heroData.title === 'NOTICES') header = 'NOTICES';
  else if (heroData.title === '뉴스/보도자료') header = 'NEWS';
  else if (heroData.title === 'IR') header = 'IR';
  else if (heroData.title === 'BOARD') header = 'BOARD';
  else if (heroData.title === 'PR') header = 'PR';

  return {
    header,
    title: heroData.title,
    subtitle: heroData.subtitle,
    image: heroData.backgroundImage,
    breadcrumbBorderColor: "#4A7CD5",
    breadcrumb,
  };
}

// 기존 HeroSection 컴포넌트와의 호환성을 위한 자동 생성 export
export const heroSectionData: Record<
  string,
  {
    header?: string;
    title: string;
    subtitle?: string;
    image: string;
    breadcrumbBorderColor?: string;
    breadcrumb?: { label: string; url: string }[];
  }
> = {
  // HERO_DATA를 기반으로 자동 변환
  ...Object.fromEntries(
    Object.entries(HERO_DATA).map(([path, data]) => [
      path,
      convertHeroDataToLegacyFormat(data, path)
    ])
  ),
};
