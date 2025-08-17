"use client";

import { Box, Text, Heading, Stack, Container, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { CenterServices } from "@/components/sections/CenterServices";
import { QuoteBoxes } from "@/components/sections/QuoteBoxes";
import { CounselingProcess } from "@/components/sections/CounselingProcess";
import React, { useState, useEffect } from "react";
import { HERO_DATA } from "@/lib/constants/heroSectionData";

export default function CompanyPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    servicesHeading: false,
    visionHeading: false,
    visionCircles: false,
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 300,
        servicesHeading: scrollY > 400,
        visionHeading: scrollY > 400,
        visionCircles: scrollY > 500,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroData = HERO_DATA["/uc/center"];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title={heroData.title}
        subtitle={heroData.subtitle}
        backgroundImage={heroData.backgroundImage}
        height={heroData.height}
        menuType="custom"
        customMenuItems={heroData.menuItems}
        animationType={heroData.animationType}
      />

      <PageContainer>
        <Stack>
          {/* 회사 개요 섹션 */}
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={5}
              lineHeight="1.3"
              transition="all 0.8s ease 0.2s"
              transform={
                animations.mainHeading ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.mainHeading ? 1 : 0}
            >
              언제든 여러분의 소중한 이야기를 들려주세요.
            </Heading>
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              transition="all 0.8s ease 0.4s"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              혼자 버티지 말고, 함께 이야기해요. <br /><br />
              학생상담센터는 여러분이 건강한 마음으로 대학생활에 적응하고 성장하도록 돕는 공간입니다. <Box as="br" display={{ base: "none", md: "none", lg: "block" }} />
              무엇이든 편하게 와서 이야기하세요. 우리는 듣고, 함께 방법을 찾습니다.
            </Text>
          </Box>
        </Stack>
      </PageContainer>
      <Box
        p={8}
        backgroundColor="#fafafa"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box paddingInline="0">
            <Stack>
              {/* 회사 개요 섹션 */}
              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                  fontWeight="bold"
                  mb={5}
                  lineHeight="1.3"
                  transition="all 0.8s ease 1.0s"
                  transform={
                    animations.servicesHeading
                      ? "translateY(0)"
                      : "translateY(50px)"
                  }
                  opacity={animations.servicesHeading ? 1 : 0}
                >
                  제공 서비스
                </Heading>
                <Box
                  width="100%"
                  transition="all 0.8s ease 1.2s"
                  transform={
                    animations.visionCircles
                      ? "translateY(0)"
                      : "translateY(50px)"
                  }
                  opacity={animations.visionCircles ? 1 : 0}
                >
                  <CenterServices />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        backgroundColor="white"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={4}
            >
              이럴 때 찾아오세요
            </Heading>
            <Text
            fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
            mb={6}
            >
            울산과학대학교 재학생이라면 누구나 이용할 수 있으며,상담 내용은 철저히 비밀이 보장됩니다. 학생상담센터는 여러분 곁에서, 여러분의 마음을 함께합니다.
            </Text>
            <QuoteBoxes />
          </Box>
        </Container>
      </Box>
      <Box
        p={8}
        backgroundColor="#fafafa"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box paddingInline="0">
            <Stack>
              {/* 회사 개요 섹션 */}
              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                  fontWeight="bold"
                  mb={5}
                  lineHeight="1.3"
                  transition="all 0.8s ease 1.0s"
                  transform={
                    animations.visionHeading
                      ? "translateY(0)"
                      : "translateY(50px)"
                  }
                  opacity={animations.visionHeading ? 1 : 0}
                >
                  이용시간 안내
                </Heading>
                <Box
                  width="100%"
                  transition="all 0.8s ease 1.2s"
                  transform={
                    animations.visionCircles
                      ? "translateY(0)"
                      : "translateY(50px)"
                  }
                  opacity={animations.visionCircles ? 1 : 0}
                >
                  
                </Box>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
