"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, Image, Button } from "@chakra-ui/react"; // Chakra UI import 추가

const Footer = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    // App.tsx에 스크롤 시작을 알리는 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent("scrollToTopStart"));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLinkClick = (link: string) => {
    router.push(link);
  };

  return (
    <Box
      as="footer"
      pt={{ base: "80px", xl: "100px" }}
      bg="#f8f9fa"
      borderTop="1px solid #e0e0e0"
    >
      <Box maxWidth={{ base: "90%", xl: "1300px" }} margin="0 auto">
        {/* 상단 영역 - 로고와 설명 */}
        <Box textAlign="center" marginBottom="40px">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="12px"
            marginBottom="20px"
          >
            <Image
              height={{ base: "30px", xl: "55px" }}
              width="auto"
              src="/images/logo/logo2.png"
              alt="케이앤디에너젠"
            />
          </Box>
          <Text fontSize="1rem" color="#666" lineHeight="1.6" margin="0">
            청정에너지 기술로 지속 가능한 미래를 만들어갑니다.
          </Text>
        </Box>

        {/* 연락처 정보 */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={{ base: "20px", xl: "40px" }}
          marginBottom="40px"
          padding="30px 0"
          borderTop="1px solid #e0e0e0"
          borderBottom="1px solid #e0e0e0"
        >
          <Box display="flex" alignItems="center" gap="8px" fontSize="0.9rem">
            <Text fontWeight="600" color="#333" minWidth="60px">
              주소
            </Text>
            <Text color="#666">
              울산 울주군 온산읍 산암로 213, 케이앤디에너젠(주)
            </Text>
          </Box>
          <Box display="flex" alignItems="center" gap="8px" fontSize="0.9rem">
            <Text fontWeight="600" color="#333">
              Tel
            </Text>
            <Text color="#666">000-0000-0000</Text>
          </Box>
          <Box display="flex" alignItems="center" gap="8px" fontSize="0.9rem">
            <Text fontWeight="600" color="#333">
              Fax
            </Text>
            <Text color="#666">000-0000-0000</Text>
          </Box>
          <Box display="flex" alignItems="center" gap="8px" fontSize="0.9rem">
            <Text fontWeight="600" color="#333">
              대표이메일
            </Text>
            <Text color="#666">info@kdenergy.co.kr</Text>
          </Box>
          <Box display="flex" alignItems="center" gap="8px" fontSize="0.9rem">
            <Text fontWeight="600" color="#333">
              채용문의
            </Text>
            <Text color="#666">hr@kdenergy.co.kr</Text>
          </Box>
        </Box>

        {/* 하단 영역 - 저작권 및 링크 */}
        <Box
          background="#4A7CD5"
          color="white"
          padding="20px 30px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="20px 20px 0 0"
          flexDirection={{ base: "column", xl: "row" }}
        >
          <Text fontSize="0.9rem" color="rgba(255, 255, 255, 0.9)">
            © K&D Energen Co., Ltd. All rights reserved.
          </Text>
          <Box display="flex" gap="10px">
            <Button
              bg="transparent"
              color="white"
              fontSize="0.9rem"
              onClick={() => handleLinkClick("/privacy-policy")}
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
                textDecoration: "none",
              }}
              px="10px"
            >
              개인정보취급방침
            </Button>
            {/* <Button
              bg="transparent"
              color="white"
              fontSize="0.9rem"
              onClick={() => handleLinkClick("/energy-policy")}
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
                textDecoration: "none",
              }}
              px="10px"
            >
              에너지정책
            </Button> */}
          </Box>
        </Box>
      </Box>

      {showTopButton && (
        <Button
          position="fixed"
          bottom="2rem"
          right="2rem"
          bg="#4A7CD5"
          color="white"
          p="0.8rem 1.2rem"
          borderRadius="25px"
          fontSize="0.9rem"
          fontWeight="600"
          boxShadow="0 4px 15px rgba(74, 124, 213, 0.3)"
          zIndex={100}
          onClick={scrollToTop}
          _hover={{
            bg: "#3a6bb8",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(74, 124, 213, 0.4)",
          }}
        >
          TOP
        </Button>
      )}
    </Box>
  );
};

export default Footer;
