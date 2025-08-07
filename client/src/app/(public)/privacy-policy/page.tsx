"use client";

import { useState, useEffect } from "react";
import { Box, Text, Heading, Stack } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";

export default function PrivacyPolicyPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    descriptionText: false,
    navigation: false,
    intro: false,
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false,
    section8: false,
    section9: false,
    section10: false,
    section11: false,
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        descriptionText: scrollY > 200,
        navigation: scrollY > 300,
        intro: scrollY > 400,
        section1: scrollY > 500,
        section2: scrollY > 700,
        section3: scrollY > 900,
        section4: scrollY > 1100,
        section5: scrollY > 1300,
        section6: scrollY > 1500,
        section7: scrollY > 1700,
        section8: scrollY > 1900,
        section9: scrollY > 2100,
        section10: scrollY > 2300,
        section11: scrollY > 2500,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const businessMenuItems = [
    { name: "개인정보취급방침", href: "/privacy-policy" },
    { name: "개인정보취급방침", href: "/privacy-policy" },
  ];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title="Privacy Policy"
        subtitle="K&D Energen의 개인정보취급방침을 소개합니다"
        backgroundImage="/images/sub/privacy_bg.jpg"
        height="600px"
        menuType="custom"
        customMenuItems={businessMenuItems}
        animationType="pan-right"
      />

      <PageContainer>
        <Stack>
          {/* 개인정보취급방침 개요 섹션 */}
          <Box>
            <Text
              fontSize={{ base: "16px", lg: "20px", xl: "24px" }}
              fontWeight="bold"
              mb={10}
              textAlign="center"
              color="#4A7CD5"
              fontFamily="Montserrat, sans-serif !important"
              letterSpacing="2"
              transition="all 0.8s ease"
              transform={
                animations.titleText ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.titleText ? 1 : 0}
            >
              Privacy Policy
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={5}
              lineHeight="1.3"
              textAlign="center"
              transition="all 0.8s ease 0.2s"
              transform={
                animations.descriptionText
                  ? "translateY(0)"
                  : "translateY(50px)"
              }
              opacity={animations.descriptionText ? 1 : 0}
            >
              개인정보취급방침
            </Heading>
            <Box
              transition="all 0.8s ease"
              transform={
                animations.navigation ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.navigation ? 1 : 0}
            >
              {/* 소개 부분 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease 0.4s"
                transform={
                  animations.intro ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.intro ? 1 : 0}
                mb={8}
              >
                케이앤디에너젠 (이하 '회사'라고 함)는 이용자의 개인정보를
                보호하기 위하여, 「정보통신망 이용촉진 및 정보보호에 관한
                법률」, 「개인정보보호법」, 개인정보보호 규정 및 가이드라인을
                준수하고 있습니다. 회사는 개인정보처리방침을 통하여 이용자의
                개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를
                위해 어떠한 조치가 취해지고 있는지 알려드립니다.
              </Text>

              {/* Section 1: 개인정보 처리 목적 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section1 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section1 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  1. 개인정보 처리(수집·이용) 목적
                </span>
                <br />
                회사는 개인정보를 다음의 목적을 위해 처리합니다. 처리한
                개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용
                목적이 변경될 시에는 사전동의를 구할 예정입니다.
                <br />
                <br />- 고객문의, 민원처리, 본인확인, 문의 및 민원처리 등의
                사실확인(추가확인 포함), 처리결과통보 등
              </Text>

              {/* Section 2: 개인정보 처리·이용 및 보유기간 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section2 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section2 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  2. 개인정보 처리·이용 및 보유기간
                </span>
                <br />
                개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 1년 후
                지체 없이 파기합니다.
                <br />
                단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정기간
                동안 개인정보를 보관할 수 있으며 이는 케이앤디에너젠
                개인정보처리방침을 따릅니다.
              </Text>

              {/* Section 3: 정보주체의 권리·의무 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section3 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section3 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  3. 정보주체의 권리·의무 및 그 행사방법
                </span>
                <br />
                정보주체는 언제든지 등록되어 있는 개인정보의
                조회/수정/동의철회를 요청하실 수 있습니다. 정보주체가 회사의
                개인정보관리부서에 서면, 전화 또는 이메일로 연락하시면 지체 없이
                조치하겠습니다.
                <br />
                회사는 정보주체가 개인정보의 오류에 대한 정정을 요청하신
                경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는
                제공하지 않습니다.
                <br />
                만 14세 미만 아동의 경우, 법정대리인이 아동의 개인정보를
                조회하거나 수정할 권리, 수집 및 이용 동의를 철회할 권리를
                가집니다.
                <br />
                회사는 정보주체 혹은 법정대리인의 요청에 의해 해지 또는 삭제된
                개인정보에 대해 개인정보처리방침에 명시된 바에 따라 처리하고 그
                외의 용도로 열람 또는 이용하지 않습니다.
              </Text>

              {/* Section 4: 처리하는 개인정보의 항목 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section4 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section4 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  4. 처리하는 개인정보의 항목
                </span>
                <br />
                회사는 다음과 같은 개인정보를 수집하고 있습니다.
                <br />- 수집항목 : 이름, 전화번호, 이메일
              </Text>

              {/* Section 5: 개인정보 파기 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section5 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section5 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>5. 개인정보 파기</span>
                <br />
                회사는 수집한 개인정보의 수집 · 이용 목적이 달성되거나 그
                보유기간이 종료되는 경우 사용자의 동의, 이용약관, 관련 법령에
                따라 보관이 필요한 경우를 제외하고 해당 개인정보를 지체 없이
                파기합니다.
                <br />
                <br />
                [파기방법]
                <br />
                - 개인정보가 기록된 출력물, 서면 등: 파쇄 또는 소각
                <br />- 전자적 파일 형태 : 복원이 불가능한 방법으로 영구 삭제
              </Text>

              {/* Section 6: 개인정보 자동 수집 장치 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section6 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section6 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  6. 개인정보 자동 수집 장치의 설치/운영 및 거부
                </span>
                <br />
                회사는 정보주체의 이용정보를 저장하고 수시로 불러오는
                '쿠키(cookie)'를 사용하지 않습니다.
              </Text>

              {/* Section 7: 개인정보 안전성 확보조치 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section7 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section7 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  7. 개인정보 안전성 확보조치
                </span>
                <br />
                회사는 사용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난,
                누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은
                조치를 취하고 있습니다.
                <br />
                <br />
                [관리적 조치]
                <br />
                개인정보의 안전한 관리를 위해 내부관리계획을 수립 및 시행하고
                있습니다.
                <br />
                개인정보 취급자를 대상으로 연 1회 이상 정기적으로 교육 및 마인드
                제고 활동을 실시하고 있습니다.
                <br />
                개인정보에 접근할 수 있는 인원을 최소한으로 제한하고 있습니다.
                <br />
                <br />
                [기술적 조치]
                <br />
                회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및
                훼손을 막기 위하여 보안 프로그램을 설치하고 해킹 등 외부침입에
                대응하고 있습니다.
                <br />
                정보주체의 개인정보와 비밀번호는 암호화되어 저장/관리되고 있으며
                전송 시에도 별도의 보안기능을 사용하여 안전하게 관리하고
                있습니다.
                <br />
                <br />
                [물리적 조치]
                <br />
                전산실과 자료보관실 등의 보호구역을 운영하여 출입을 통제하고
                있습니다.
              </Text>

              {/* Section 8: 임직원의 개인정보 처리 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section8 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section8 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  8. 임직원의 개인정보 처리
                </span>
                <br />
                회사는 임직원의 개인정보 처리에 관하여도 본 개인정보 처리방침의
                규정이 준용됩니다.
              </Text>

              {/* Section 9: 개인정보보호 책임자 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section9 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section9 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  9. 개인정보보호 책임자
                </span>
                <br />
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
                처리와 관련한 사용자의 불만처리 및 피해구제 등을 위하여 아래와
                같이 개인정보 보호책임자를 지정하고 있습니다.
                <br />
                <br />
                개인정보보호 책임자 : 케이앤디에너젠
                <br />
                - 기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래
                기관에 문의하시기 바랍니다.
                <br />
                - 한국인터넷진흥원 개인정보침해 신고센터
                (http://privacy.kisa.or.kr전화번호: 118)
                <br />
                - 대검찰청 사이버수사과 (www.spo.go.kr 전화번호 1301)
                <br />- 경찰청 사이버안전국 (www.cyberbureau.police.go.kr
                전화번호 182)
              </Text>

              {/* Section 10: 개인정보 처리방침 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section10 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section10 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  10. 개인정보 처리방침
                </span>
                <br />
                개인정보처리방침은{" "}
                <span style={{ fontWeight: "bold" }}>
                  시행일(2025년 8월 31일)
                </span>
                로부터 적용되며, 법령 또는 방침에 따른 변경내용의 추가, 삭제 및
                정정이 있는 경우에는 변경사항의 시행 전부터 공지사항을 통하여
                고지할 것입니다.
              </Text>

              {/* Section 11: 개인정보 수집 및 이용 동의를 거부할 권리 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section11 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section11 ? 1 : 0}
                mb={8}
              >
                <span style={{ fontWeight: "bold" }}>
                  11. 개인정보 수집 및 이용 동의를 거부할 권리
                </span>
                <br />
                귀하께서는 케이앤디에너젠의 개인정보 수집 및 이용 동의를 거부할
                권리가 있습니다. 다만 동의를 거부할 경우 서비스 이용이 제한될 수
                있습니다.
              </Text>
            </Box>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
