"use client";

import { Box, Text, Heading, Stack, Container } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect } from "react";
import { HERO_DATA } from "@/lib/constants/heroSectionData";

export default function LocationPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    mapHeading: false,
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
        mapHeading: scrollY > 400,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroData = HERO_DATA["/uc/location"];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner autoMode={true} />

      <PageContainer>
        <Stack>
          {/* 위치 안내 섹션 */}
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
              찾아오시는 길
            </Heading>
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              mb={5}
              transition="all 0.8s ease 0.4s"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              울산과학대학교 학생상담센터는 학생회관 2층에 위치해 있습니다.
            </Text>
          </Box>
        </Stack>
      </PageContainer>

      {/* 지도 섹션 */}
      <Box
        p={8}
        backgroundColor="#fafafa"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box paddingInline="0">
            <Stack>
              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                  fontWeight="bold"
                  mb={5}
                  lineHeight="1.3"
                  transition="all 0.8s ease 1.0s"
                  transform={
                    animations.mapHeading ? "translateY(0)" : "translateY(50px)"
                  }
                  opacity={animations.mapHeading ? 1 : 0}
                >
                  위치 안내
                </Heading>
                <Text
                  fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
                  mb={5}
                >
                  주소: 울산광역시 동구 봉수로 101 울산과학대학교 학생회관 2층
                  <br />
                  전화: 052-123-4567
                </Text>
                {/* 여기에 지도 컴포넌트를 추가할 수 있습니다 */}
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
