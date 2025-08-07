"use client";

import {
  Box,
  Text,
  Heading,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Container,
  Image,
} from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect } from "react";
import { keyframes } from "@emotion/react";

// 펄스 애니메이션 정의
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export default function CompanyPage() {
  const [scrollY, setScrollY] = useState(0);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 스크롤에 따른 translateY 계산 (스크롤 30에서 시작, 50에서 완료)
  const getTransformY = (startScroll: number, endScroll: number) => {
    if (scrollY < startScroll) {
      return 50; // 아직 애니메이션 시작 전, 아래에 숨김
    }
    if (scrollY >= endScroll) {
      return 0; // 애니메이션 완료, 원래 위치
    }

    const progress = (scrollY - startScroll) / (endScroll - startScroll);
    return 50 - 50 * progress; // +50px에서 0px로 이동 (아래에서 위로)
  };

  // 연결선 높이 애니메이션 (위에서 아래로 그어지는 효과)
  const getLineHeight = (
    startScroll: number,
    endScroll: number,
    maxHeight: number
  ) => {
    if (scrollY < startScroll) {
      return 0; // 아직 선이 나타나지 않음
    }
    if (scrollY >= endScroll) {
      return maxHeight; // 선이 완전히 그어짐
    }

    const progress = (scrollY - startScroll) / (endScroll - startScroll);
    return maxHeight * progress; // 0에서 maxHeight로 증가
  };

  // 박스 투명도 애니메이션 (더 강한 효과)
  const getBoxOpacity = (activationScroll: number) => {
    return scrollY >= activationScroll ? 1 : 0;
  };

  // 박스 스케일 애니메이션 (더 강한 효과)
  const getBoxScale = (activationScroll: number) => {
    if (scrollY < activationScroll) {
      return 0.7; // 더 작게 시작
    }
    return 1;
  };

  // 박스 위치 애니메이션 (위에서 아래로 슬라이드 다운)
  const getBoxTransform = (activationScroll: number) => {
    if (scrollY < activationScroll) {
      return -30; // 30px 위에서 시작
    }
    return 0;
  };

  // 연결선 색상과 두께 (라인 그어질 때 더 진하고 두껍게)
  const getLineStyle = (startScroll: number, endScroll: number) => {
    const isActive = scrollY >= startScroll;
    const isComplete = scrollY >= endScroll;

    return {
      backgroundColor: isActive ? (isComplete ? "#ddd" : "#666") : "#ddd",
      width: isActive ? "2px" : "2px",
      transition: "background-color 0.3s ease-out, width 0.3s ease-out",
    };
  };

  // 박스 애니메이션 스타일 (딜레이 포함)
  const getBoxAnimationStyle = (
    activationScroll: number,
    delay: number = 0
  ) => {
    return {
      opacity: getBoxOpacity(activationScroll),
      transform: `scale(${getBoxScale(
        activationScroll
      )}) translateY(${getBoxTransform(activationScroll)}px)`,
      transition: `opacity 1.2s ease-out ${delay}s, transform 1.2s ease-out ${delay}s`,
    };
  };

  const companyMenuItems = [
    { name: "회사소개", href: "/knd/company" },
    { name: "조직도", href: "/knd/organization" },
  ];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title="COMPANY"
        subtitle="K&D Energen의 조직도를 소개합니다"
        backgroundImage="/images/main/hero-image.jpg"
        height="600px"
        menuType="custom"
        customMenuItems={companyMenuItems}
        animationType="zoom-in"
      />

      <PageContainer>
        <Stack>
          {/* 회사 개요 섹션 */}
          <Box>
            <Text
              fontSize={{ base: "16px", lg: "20px", xl: "24px" }}
              fontWeight="bold"
              mb={10}
              textAlign="center"
              color="#4A7CD5"
              fontFamily="Montserrat, sans-serif !important"
              letterSpacing="2"
              style={{
                transform: `translateY(${getTransformY(30, 50)}px)`,
                transition: "transform 0.6s ease-out",
              }}
            >
              K&D Energen Organization
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={5}
              lineHeight="1.3"
              textAlign="center"
              style={{
                transform: `translateY(${getTransformY(50, 50)}px)`,
                transition: "transform 0.6s ease-out",
              }}
            >
              지속 가능한 미래를 함께 설계하는 <Box as="br" display={{ base: "inline", md: "none" }} />글로벌 수소 전문 조직
            </Heading>
            {/* 조직도 다이어그램 */}
            <Box
              maxW="1300px"
              mx="auto"
              mt={{ base: "30px", lg: "80px", xl: "100px" }}
            >
              {/* 최상단: 공동대표 */}
              <Box display="flex" justifyContent="center">
                {/* 컨테이너 */}
                <Box
                  position="relative"
                  w="250px"
                  h="250px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* 바깥 원 - 애니메이션만 적용 */}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="250px"
                    h="250px"
                    borderRadius="50%"
                    bg="rgba(74, 125, 213, 0.19)"
                    boxShadow="0 4px 20px rgba(74, 124, 213, 0.1)"
                    animation={`${pulse} 2s ease-in-out infinite`}
                  />

                  {/* 안쪽 원 - 고정 */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    bg="#4A7CD5"
                    color="white"
                    borderRadius="50%"
                    w="200px"
                    h="200px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="0 4px 15px rgba(74, 124, 213, 0.3)"
                    zIndex="2"
                  >
                    {/* 배경 로고 */}
                    <Image
                      src="/images/logo/logo.png"
                      alt="K&D Energen Logo"
                      width={130}
                      height="auto"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        opacity: 0.2,
                        filter: "brightness(0) invert(1)", // 흰색으로 변환
                        zIndex: 1,
                      }}
                    />

                    {/* 텍스트 */}
                    <Text
                      fontSize={{ base: "16px", lg: "24px" }}
                      fontWeight="bold"
                      textAlign="center"
                      position="relative"
                      zIndex="2"
                    >
                      공동대표
                    </Text>
                  </Box>
                </Box>
              </Box>

              {/* 연결선 - 첫 번째 (공동대표 → 중간층) */}
              <Box display="flex" justifyContent="center">
                <Box
                  style={{
                    height: `${getLineHeight(100, 150, 80)}px`,
                    ...getLineStyle(100, 150),
                    transition:
                      "height 0.5s ease-out, background-color 0.3s ease-out, width 0.3s ease-out",
                  }}
                />
              </Box>

              {/* 중간 레벨: 공정총괄, 공장장 */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                style={getBoxAnimationStyle(150, 0.2)}
              >
                <Box
                  bg="#4A7CD5"
                  color="white"
                  px={6}
                  py={4}
                  borderRadius="30px"
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight="medium"
                  boxShadow="0 2px 10px rgba(156, 163, 175, 0.3)"
                  w={{ base: "50%", xl: "30%" }}
                  textAlign="center"
                >
                  공정총괄
                </Box>
                {/* 연결선 */}
                <Box display="flex" justifyContent="center">
                  <Box
                    style={{
                      height: `${getLineHeight(200, 220, 20)}px`,
                      ...getLineStyle(200, 220),
                      transition:
                        "height 0.3s ease-out, background-color 0.3s ease-out, width 0.3s ease-out",
                    }}
                  />
                </Box>
                <Box
                  bg="#9CA3AF"
                  color="white"
                  px={6}
                  py={4}
                  borderRadius="30px"
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight="medium"
                  boxShadow="0 2px 10px rgba(156, 163, 175, 0.3)"
                  w={{ base: "50%", xl: "30%" }}
                  textAlign="center"
                >
                  공장장
                </Box>
              </Box>

              {/* 연결선 - 두 번째 (중간층 → 팀들) */}
              <Box display="flex" justifyContent="center">
                <Box
                  style={{
                    height: `${getLineHeight(250, 300, 150)}px`,
                    ...getLineStyle(250, 300),
                    transition:
                      "height 0.6s ease-out, background-color 0.3s ease-out, width 0.3s ease-out",
                  }}
                />
              </Box>

              {/* 메인 부서들 */}
              <Box
                display="flex"
                justifyContent="space-between"
                gap={4}
                w="100%"
                position="relative"
              >
                {/* 가로 연결선 - 지원팀, 생산팀, 설비팀 연결 */}
                <Box
                  position="absolute"
                  top="-52px"
                  left="15%"
                  right="15%"
                  height="2px"
                  backgroundColor={scrollY >= 320 ? "#ddd" : "#ddd"}
                  style={{
                    width:
                      scrollY >= 320
                        ? scrollY >= 370
                          ? "70%"
                          : `${((scrollY - 320) / (370 - 320)) * 70}%`
                        : "0%",
                    transition:
                      "width 0.8s ease-out, background-color 0.3s ease-out",
                  }}
                  zIndex={1}
                />

                {/* 지원팀 세로 연결선 */}
                <Box
                  position="absolute"
                  top="-52px"
                  left="15%"
                  width="2px"
                  style={{
                    height: `${getLineHeight(320, 370, 50)}px`,
                    ...getLineStyle(320, 370),
                    transition:
                      "height 0.4s ease-out, background-color 0.3s ease-out",
                  }}
                  zIndex={1}
                />

                {/* 생산팀 세로 연결선 */}
                <Box
                  position="absolute"
                  top="22px"
                  left="50%"
                  transform="translateX(-50%)"
                  width="2px"
                  style={{
                    height: `${getLineHeight(320, 370, 30)}px`,
                    ...getLineStyle(320, 370),
                    transition:
                      "height 0.4s ease-out, background-color 0.3s ease-out",
                  }}
                  zIndex={1}
                />

                {/* 설비팀 세로 연결선 */}
                <Box
                  position="absolute"
                  top="-52px"
                  right="15%"
                  width="2px"
                  style={{
                    height: `${getLineHeight(320, 370, 50)}px`,
                    ...getLineStyle(320, 370),
                    transition:
                      "height 0.4s ease-out, background-color 0.3s ease-out",
                  }}
                  zIndex={1}
                />

                {/* 지원팀 */}
                <Box
                  textAlign="center"
                  w="30%"
                  style={getBoxAnimationStyle(350, 0)}
                  position="relative"
                  zIndex={2}
                >
                  <Box
                    bg="#749DE6"
                    color="white"
                    px={8}
                    py={4}
                    borderRadius="30px"
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight="bold"
                    boxShadow="0 4px 15px rgba(59, 130, 246, 0.3)"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* 배경 텍스트 - SUPPORT */}
                    <Text
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -42%)"
                      fontSize={{ base: "20px", lg: "30px" }}
                      fontFamily="Cafe24Lovingu !important"
                      color="white"
                      opacity={0.2}
                      zIndex={1}
                      pointerEvents="none"
                      userSelect="none"
                    >
                      SUPPORT
                    </Text>

                    {/* 메인 텍스트 */}
                    <Text
                      position="relative"
                      zIndex={2}
                      fontSize={{ base: "16px", lg: "18px" }}
                      fontWeight="bold"
                    >
                      지원팀
                    </Text>
                  </Box>
                  {/* 연결선 */}
                  <Box display="flex" justifyContent="center">
                    <Box
                      style={{
                        height: `${getLineHeight(370, 390, 50)}px`,
                        ...getLineStyle(370, 390),
                        transition:
                          "height 0.4s ease-out, background-color 0.3s ease-out, width 0.3s ease-out",
                      }}
                    />
                  </Box>
                  <Stack style={getBoxAnimationStyle(390, 0)}>
                    <Box
                      bg="#dbdbdb"
                      px={8}
                      py={3}
                      borderRadius="30px"
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="black"
                      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                      style={getBoxAnimationStyle(390, 0)}
                    >
                      안전
                    </Box>
                    {/* 연결선 */}
                    <Box display="flex" justifyContent="center">
                      <Box
                        style={{
                          height: `${getLineHeight(400, 410, 20)}px`,
                          ...getLineStyle(400, 410),
                          transition:
                            "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                        }}
                      />
                    </Box>
                    <Box
                      bg="#dbdbdb"
                      px={8}
                      py={3}
                      borderRadius="30px"
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="black"
                      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                      style={getBoxAnimationStyle(410, 0)}
                    >
                      보건
                    </Box>
                    {/* 연결선 */}
                    <Box display="flex" justifyContent="center">
                      <Box
                        style={{
                          height: `${getLineHeight(420, 430, 30)}px`,
                          ...getLineStyle(420, 430),
                          transition:
                            "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                        }}
                      />
                    </Box>
                    <Box
                      bg="#dbdbdb"
                      px={8}
                      py={3}
                      borderRadius="30px"
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="black"
                      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                      style={getBoxAnimationStyle(430, 0)}
                    >
                      환경
                    </Box>
                    {/* 연결선 */}
                    <Box display="flex" justifyContent="center">
                      <Box
                        style={{
                          height: `${getLineHeight(440, 450, 20)}px`,
                          ...getLineStyle(440, 450),
                          transition:
                            "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                        }}
                      />
                    </Box>
                    <Box
                      bg="#dbdbdb"
                      px={8}
                      py={3}
                      borderRadius="30px"
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="black"
                      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                      style={getBoxAnimationStyle(450, 0)}
                    >
                      구매
                    </Box>
                    {/* 연결선 */}
                    <Box display="flex" justifyContent="center">
                      <Box
                        style={{
                          height: `${getLineHeight(460, 470, 20)}px`,
                          ...getLineStyle(460, 470),
                          transition:
                            "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                        }}
                      />
                    </Box>
                    <Box
                      bg="#dbdbdb"
                      px={8}
                      py={3}
                      borderRadius="30px"
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="black"
                      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                      style={getBoxAnimationStyle(470, 0)}
                    >
                      제무회계
                    </Box>
                    {/* 연결선 */}
                    <Box display="flex" justifyContent="center">
                      <Box
                        style={{
                          height: `${getLineHeight(480, 490, 20)}px`,
                          ...getLineStyle(480, 490),
                          transition:
                            "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                        }}
                      />
                    </Box>
                    <Box
                      bg="#dbdbdb"
                      px={8}
                      py={3}
                      borderRadius="30px"
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="black"
                      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                      style={getBoxAnimationStyle(490, 0)}
                    >
                      소물씨
                    </Box>
                  </Stack>
                </Box>

                {/* 생산팀 */}
                <Box
                  textAlign="center"
                  w="30%"
                  style={getBoxAnimationStyle(550, 0)}
                  position="relative"
                  zIndex={2}
                >
                  <Box
                    bg="#749DE6"
                    color="white"
                    px={8}
                    py={4}
                    borderRadius="30px"
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight="bold"
                    boxShadow="0 4px 15px rgba(59, 130, 246, 0.3)"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* 배경 텍스트 - PRODUCTION */}
                    <Text
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -42%)"
                      fontSize={{ base: "20px", lg: "30px" }}
                      fontFamily="Cafe24Lovingu !important"
                      color="white"
                      opacity={0.2}
                      zIndex={1}
                      pointerEvents="none"
                      userSelect="none"
                    >
                      PRODUCTION
                    </Text>

                    {/* 메인 텍스트 */}
                    <Text
                      position="relative"
                      zIndex={2}
                      fontSize={{ base: "16px", lg: "18px" }}
                      fontWeight="bold"
                    >
                      생산팀
                    </Text>
                  </Box>
                  {/* 연결선 */}
                  <Box display="flex" justifyContent="center">
                    <Box
                      style={{
                        height: `${getLineHeight(570, 590, 50)}px`,
                        ...getLineStyle(570, 590),
                        transition:
                          "height 0.4s ease-out, background-color 0.3s ease-out, width 0.3s ease-out",
                      }}
                    />
                  </Box>

                  {/* 주간반장과 생산기술팀을 각각 독립적인 계층으로 배치 */}
                  <Stack
                    direction="row"
                    gap={4}
                    justify="center"
                    justifyContent="space-between"
                    style={getBoxAnimationStyle(590, 0)}
                  >
                    {/* 주간반장 그룹 */}
                    <Box textAlign="center" w="48%">
                      <Box
                        bg="#dbdbdb"
                        px={6}
                        py={3}
                        borderRadius="30px"
                        fontSize={{ base: "16px", lg: "18px" }}
                        color="black"
                        boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                        mb={2}
                      >
                        주간반장
                      </Box>
                      {/* 연결선 */}
                      <Box display="flex" justifyContent="center" mb={2}>
                        <Box
                          style={{
                            height: `${getLineHeight(610, 620, 20)}px`,
                            ...getLineStyle(610, 620),
                            transition:
                              "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                          }}
                        />
                      </Box>
                      {/* 주간반장 아래 교대반장들 */}
                      <Stack style={getBoxAnimationStyle(620, 0)}>
                        <Box
                          bg="#ededed"
                          px={6}
                          py={3}
                          borderRadius="30px"
                          fontSize={{ base: "16px", lg: "18px" }}
                          color="black"
                        >
                          교대반장
                        </Box>
                        {/* 연결선 */}
                        <Box display="flex" justifyContent="center">
                          <Box
                            style={{
                              height: `${getLineHeight(640, 650, 20)}px`,
                              ...getLineStyle(640, 650),
                              transition:
                                "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                            }}
                          />
                        </Box>
                        <Box
                          bg="#ededed"
                          px={6}
                          py={3}
                          borderRadius="30px"
                          fontSize={{ base: "16px", lg: "18px" }}
                          color="black"
                        >
                          교대반장
                        </Box>
                      </Stack>
                    </Box>

                    {/* 생산기술팀 그룹 */}
                    <Box textAlign="center" w="48%">
                      <Box
                        bg="#dbdbdb"
                        px={6}
                        py={3}
                        borderRadius="30px"
                        fontSize={{ base: "16px", lg: "18px" }}
                        color="black"
                        boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                        mb={2}
                      >
                        생산기술팀
                      </Box>
                      {/* 연결선 */}
                      <Box display="flex" justifyContent="center" mb={2}>
                        <Box
                          style={{
                            height: `${getLineHeight(610, 620, 20)}px`,
                            ...getLineStyle(610, 620),
                            transition:
                              "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                          }}
                        />
                      </Box>
                      {/* 생산기술팀 아래 교대반장들 */}
                      <Stack style={getBoxAnimationStyle(620, 0)}>
                        <Box
                          bg="#ededed"
                          px={6}
                          py={3}
                          borderRadius="30px"
                          fontSize={{ base: "16px", lg: "18px" }}
                          color="black"
                        >
                          교대반장
                        </Box>
                        {/* 연결선 */}
                        <Box display="flex" justifyContent="center">
                          <Box
                            style={{
                              height: `${getLineHeight(640, 650, 20)}px`,
                              ...getLineStyle(640, 650),
                              transition:
                                "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                            }}
                          />
                        </Box>
                        <Box
                          bg="#ededed"
                          px={6}
                          py={3}
                          borderRadius="30px"
                          fontSize={{ base: "16px", lg: "18px" }}
                          color="black"
                        >
                          교대반장
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>

                {/* 설비팀 */}
                <Box
                  textAlign="center"
                  w="30%"
                  style={getBoxAnimationStyle(700, 0)}
                  position="relative"
                  zIndex={2}
                >
                  <Box
                    bg="#749DE6"
                    color="white"
                    px={8}
                    py={4}
                    borderRadius="30px"
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight="bold"
                    boxShadow="0 4px 15pxrgb(149, 178, 224)"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* 배경 텍스트 - FACILITY */}
                    <Text
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -42%)"
                      fontSize={{ base: "20px", lg: "30px" }}
                      fontFamily="Cafe24Lovingu !important"
                      color="white"
                      opacity={0.2}
                      zIndex={1}
                      pointerEvents="none"
                      userSelect="none"
                    >
                      FACILITY
                    </Text>

                    {/* 메인 텍스트 */}
                    <Text
                      position="relative"
                      zIndex={2}
                      fontSize={{ base: "16px", lg: "18px" }}
                      fontWeight="bold"
                    >
                      설비팀
                    </Text>
                  </Box>
                  {/* 연결선 */}
                  <Box display="flex" justifyContent="center">
                    <Box
                      style={{
                        height: `${getLineHeight(700, 720, 50)}px`,
                        ...getLineStyle(700, 720),
                        transition:
                          "height 0.4s ease-out, background-color 0.3s ease-out, width 0.3s ease-out",
                      }}
                    />
                  </Box>
                  <Stack style={getBoxAnimationStyle(720, 0)}>
                    <Box
                      bg="#dbdbdb"
                      px={8}
                      py={3}
                      borderRadius="30px"
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="black"
                      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                    >
                      정비
                    </Box>
                    {/* 연결선 */}
                    <Box display="flex" justifyContent="center">
                      <Box
                        style={{
                          height: `${getLineHeight(740, 750, 20)}px`,
                          ...getLineStyle(740, 750),
                          transition:
                            "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                        }}
                      />
                    </Box>
                    <Box
                      bg="#dbdbdb"
                      px={8}
                      py={3}
                      borderRadius="30px"
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="black"
                      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                      style={getBoxAnimationStyle(750, 0)}
                    >
                      기계
                    </Box>
                    {/* 연결선 */}
                    <Box display="flex" justifyContent="center">
                      <Box
                        style={{
                          height: `${getLineHeight(770, 780, 20)}px`,
                          ...getLineStyle(770, 780),
                          transition:
                            "height 0.2s ease-out, background-color 0.2s ease-out, width 0.2s ease-out",
                        }}
                      />
                    </Box>
                    <Box
                      bg="#dbdbdb"
                      px={8}
                      py={3}
                      borderRadius="30px"
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="black"
                      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
                      style={getBoxAnimationStyle(780, 0)}
                    >
                      계기
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
