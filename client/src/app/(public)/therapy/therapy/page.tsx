"use client";

import {
  Box,
  Text,
  Heading,
  Stack,
  Container,
  Image,
  Tabs,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  NativeSelect,
  VStack,
  RadioGroup,
  Stack as ChakraStack,
  Progress,
} from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect, useRef } from "react";
import { HERO_DATA } from "@/lib/constants/heroSectionData";
import { Check as CheckIcon } from "lucide-react";
import StressTest from "@/components/assessments/StressTest";
import { surveyApi } from "@/lib/api/survey";
import { publicApi } from "@/lib/api/client";

export default function TherapyPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    infoDescription: false,
  });

  // 스크롤 이벤트 처리
  const infoDescRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 안내 문구 실제 가시성 계산
      let infoInView = false;
      if (infoDescRef.current) {
        const rect = infoDescRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        infoInView = rect.top < viewportH - 80;
      }

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 250,
        infoDescription: infoInView,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 하단 4개 카드 등장 애니메이션 (기존 스크롤 방식 참고: scrollY 기준)
  const [cardVisible, setCardVisible] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const handleScrollCards = () => {
      const y = window.scrollY;
      // 페이지 구성에 맞춰 임계값을 순차적으로 증가
      const thresholds = [400, 450, 550, 600];
      setCardVisible(thresholds.map((t) => y > t));
    };

    window.addEventListener("scroll", handleScrollCards);
    handleScrollCards();
    return () => window.removeEventListener("scroll", handleScrollCards);
  }, []);

  // 자가진단 설문: 1단계(개인정보 동의)
  const [locale, setLocale] = useState<"ko" | "en">("ko");
  const [step, setStep] = useState<number>(1);
  const [consentChecked, setConsentChecked] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<
    null | "personality" | "depression" | "anxiety"
  >(null);
  const [studentNumber, setStudentNumber] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<"M" | "F" | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [personSaved, setPersonSaved] = useState(false);

  // 4단계: 스트레스 척도 (PSS) 문항 상수 (외부 컴포넌트로 이동 예정)
  const PSS_QUESTIONS = [
    "예상치 못한 일이 생겨서 기분 나빠진 적이 얼마나 있었나요?",
    "중요한 일들을 통제할 수 없다고 느낀 적은 얼마나 있었나요?",
    "어려운 일이 너무 많이 쌓여서 극복할 수 없다고 느낀 적이 얼마나 있었나요?",
    "당신이 통제할 수 없는 범위에서 발생한 일 때문에 화가 난 적이 얼마나 있었나요?",
    "매사를 잘 컨트롤하고 있다고 느낀 적이 얼마나 있었나요?",
    "자신의 뜻대로 일이 진행된다고 느낀 적이 얼마나 있었나요?",
    "개인적인 문제를 처리하는 능력에 대해 자신감을 느낀적은 얼마나 있었나요?",
    "생활 속에서 일어난 중요한 변화들을 효과적으로 대처한 적이 얼마나 있었나요?",
    "짜증나고 성가신 일들을 성공적으로 처리한 적이 얼마나 있었나요?",
    "초조하거나 스트레스가 쌓인다고 느낀적이 얼마나 있었나요?",
  ];
  // PSS는 별도 컴포넌트로 분리됨
  const handlePublicSubmit = async () => {
    try {
      // 디버그: 실제 요청 baseURL 확인
      console.log("API baseURL:", (publicApi as any)?.defaults?.baseURL);
      if (!studentNumber || !departmentName || !fullName || !gender) {
        alert("기본정보를 모두 입력해주세요.");
        setStep(2);
        return;
      }
      setSubmitting(true);
      await surveyApi.savePersonPublic({
        studentNumber,
        fullName,
        genderCode: gender,
        departmentName,
        locale,
      });
      setPersonSaved(true);
      alert("제출되었습니다.");
    } catch (err) {
      console.error(err);
      alert("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStep2Next = async () => {
    if (personSaved) {
      setStep(3);
      return;
    }
    try {
      if (!studentNumber || !departmentName || !fullName || !gender) {
        alert("기본정보를 모두 입력해주세요.");
        return;
      }
      setSubmitting(true);
      await surveyApi.savePersonPublic({
        studentNumber,
        fullName,
        genderCode: gender,
        departmentName,
        locale,
      });
      setPersonSaved(true);
      setStep(3);
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner autoMode={true} />

      <PageContainer>
        <Stack>
          {/* 안내 섹션 */}
          <Box>
            <Box position="relative" mb={5}>
              <Heading
                as="h2"
                fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                fontWeight="bold"
                lineHeight="1.3"
                transition="all 0.6s ease 0.2s"
                transform={
                  animations.mainHeading ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.mainHeading ? 1 : 0}
                position="relative"
                zIndex={1}
              >
                심리검사
              </Heading>
              <Image
                src="/images/sub/textLine.png"
                alt="heading decoration"
                position="absolute"
                top="50%"
                left="calc(50% - 50vw)"
                transform="translateY(-55%)"
                w="auto"
                h="auto"
                pointerEvents="none"
                zIndex={0}
              />
            </Box>
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              mb={5}
              transition="all 0.8s ease-out"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              자가진단은 현재 나의 마음 상태를 간단히 살펴볼 수 있는 도구입니다.
              검사 결과는 참고 자료로만 활용하시고, 정확한 이해와 도움이 필요할
              경우 학생상담센터 상담을 통해 자세히 안내받으시기 바랍니다.
            </Text>

            {/* 탭(국문/영문) */}
            <Box display="flex" justifyContent="center" mt={20} border="none">
              <Box
                border="2px solid #43AD83"
                borderRadius="full"
                px={{ base: 2, md: 4 }}
                py={{ base: 1, md: 2 }}
              >
                <Tabs.Root
                  value={locale}
                  onValueChange={({ value }) => setLocale(value as "ko" | "en")}
                >
                  <Tabs.List gap={8} alignItems="center" border="none">
                    <Tabs.Trigger
                      value="ko"
                      px={{ base: 6, md: 14 }}
                      py={{ base: 2, md: 4 }}
                      borderRadius="full"
                      color="#43AD83"
                      _selected={{ background: "#43AD83", color: "white" }}
                      border="none"
                      _before={{ display: "none" }}
                    >
                      국문
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      value="en"
                      px={{ base: 8, md: 14 }}
                      py={{ base: 3, md: 4 }}
                      borderRadius="full"
                      _selected={{ background: "#43AD83", color: "white" }}
                      color="#43AD83"
                      _before={{ display: "none" }}
                    >
                      영문
                    </Tabs.Trigger>
                  </Tabs.List>
                </Tabs.Root>
              </Box>
            </Box>

            {/* 스텝 인디케이터 (1~4) - 원 안/체크/도넛 스타일 */}
            <Flex
              mt={6}
              justify="space-between"
              align="center"
              maxW="300px"
              mx="auto"
            >
              {[1, 2, 3, 4].map((n) => {
                const isDone = n < step;
                const isCurrent = n === step;
                return (
                  <Box
                    key={n}
                    w="64px"
                    display="flex"
                    justifyContent="center"
                    mt={20}
                    mb={10}
                  >
                    {isDone ? (
                      <Flex
                        w={{ base: "25px", md: "35px" }}
                        h={{ base: "25px", md: "35px" }}
                        borderRadius="full"
                        bg="#43AD83"
                        align="center"
                        justify="center"
                      >
                        <Icon as={CheckIcon} boxSize={4} color="white" />
                      </Flex>
                    ) : isCurrent ? (
                      <Box
                        w={{ base: "25px", md: "35px" }}
                        h={{ base: "25px", md: "35px" }}
                        borderRadius="full"
                        bg="white"
                        border="10px solid #43AD83"
                      />
                    ) : (
                      <Flex
                        w={{ base: "25px", md: "35px" }}
                        h={{ base: "25px", md: "35px" }}
                        borderRadius="full"
                        bg="#e1e1e1"
                        align="center"
                        justify="center"
                      >
                        <Text
                          fontSize={{ base: "14px", md: "18px" }}
                          color="#333"
                        >
                          {n}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                );
              })}
            </Flex>

            {/* 단계별 컨텐츠 */}
            {step === 1 && (
              <Box mt={4}>
                <Heading as="h3" fontSize={{ base: "16px", md: "18px" }} mb={3}>
                  {locale === "ko"
                    ? "[개인정보(민감정보 처리) 수집 · 이용에 대한 동의]"
                    : "[Consent to collection and use of personal (sensitive) information]"}
                </Heading>

                <Box
                  border="1px solid #cbd5e1"
                  borderRadius="md"
                  overflow="hidden"
                  bg="#fff"
                >
                  {/* Row 1 */}
                  <Box
                    display="grid"
                    gridTemplateColumns={{ base: "1fr", md: "220px 1fr" }}
                  >
                    <Box
                      p={3}
                      bg="gray.100"
                      borderRight={{ md: "1px solid #cbd5e1" }}
                      borderBottom="1px solid #cbd5e1"
                    >
                      {locale === "ko"
                        ? "수집·이용하는 개인정보 항목"
                        : "Items collected/used"}
                    </Box>
                    <Box p={3} borderBottom="1px solid #cbd5e1">
                      {locale === "ko"
                        ? "성명/ 학번/학과/ 연락처/ 성별/ 자가진단 결과"
                        : "Full name / Student ID / Department / Contact / Gender / Self‑assessment result"}
                    </Box>
                  </Box>
                  {/* Row 2 */}
                  <Box
                    display="grid"
                    gridTemplateColumns={{ base: "1fr", md: "220px 1fr" }}
                  >
                    <Box
                      p={3}
                      bg="gray.100"
                      borderRight={{ md: "1px solid #cbd5e1" }}
                      borderBottom="1px solid #cbd5e1"
                    >
                      {locale === "ko"
                        ? "개인정보의 수집·이용 목적"
                        : "Purpose of collection and use"}
                    </Box>
                    <Box p={3} borderBottom="1px solid #cbd5e1">
                      <Box
                        as="ul"
                        pl={4}
                        fontSize={{ base: "14px", md: "15px" }}
                        color="gray.700"
                      >
                        {locale === "ko" ? (
                          <>
                            <Text
                              as="li"
                              mb={1}
                              style={{ listStyleType: "'• '" }}
                            >
                              이용자 심리·정서적 상태 점검 및 지원 필요성 파악
                            </Text>
                            <Text
                              as="li"
                              mb={1}
                              style={{ listStyleType: "'• '" }}
                            >
                              자가진단 결과에 따른 상담 연계 및 지원
                            </Text>
                            <Text
                              as="li"
                              mb={1}
                              style={{ listStyleType: "'• '" }}
                            >
                              자가진단 진행을 위한 본인 확인 및 연락
                            </Text>
                            <Text
                              as="li"
                              mb={1}
                              style={{ listStyleType: "'• '" }}
                            >
                              상담 진행 시 효과적인 심리검사 진행 및 편의 제공
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text
                              as="li"
                              mb={1}
                              style={{ listStyleType: "'• '" }}
                            >
                              Check psychological/emotional status and need for
                              support
                            </Text>
                            <Text
                              as="li"
                              mb={1}
                              style={{ listStyleType: "'• '" }}
                            >
                              Connect counseling based on results
                            </Text>
                            <Text
                              as="li"
                              mb={1}
                              style={{ listStyleType: "'• '" }}
                            >
                              Verify identity and contact for assessment
                              progress
                            </Text>
                            <Text
                              as="li"
                              mb={1}
                              style={{ listStyleType: "'• '" }}
                            >
                              Provide effective psychological testing and
                              convenience during counseling
                            </Text>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {/* Row 3 */}
                  <Box
                    display="grid"
                    gridTemplateColumns={{ base: "1fr", md: "220px 1fr" }}
                  >
                    <Box
                      p={3}
                      bg="gray.100"
                      borderRight={{ md: "1px solid #cbd5e1" }}
                    >
                      {locale === "ko"
                        ? "개인정보의 보유 및 이용기간"
                        : "Retention & usage period"}
                    </Box>
                    <Box p={3}>
                      {locale === "ko"
                        ? "자가진단 신청일로부터 3년간 보관 후 안전하게 폐기"
                        : "Stored for 3 years from application date and securely destroyed"}
                    </Box>
                  </Box>
                </Box>

                <Box
                  mt={3}
                  color="gray.700"
                  fontSize={{ base: "13px", md: "14px" }}
                >
                  {locale === "ko" ? (
                    <>
                      <Text mb={1}>
                        ※ 귀하는 이에 대한 동의를 거부할 수 있으며, 다만 동의가
                        없을 경우 원활한 성고충상담의 진행이 불가능할 수 있음을
                        알려드립니다.
                      </Text>
                      <Text>
                        ※ 개인정보 제공자가 동의한 내용 외의 다른 목적으로
                        활용하지 않으며 제공된 개인정보의 이용을 거부하고자 할
                        때에는 개인정보 관리책임자를 통해 정보 열람, 정정,
                        삭제를 요구할 수 있음
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text mb={1}>
                        ※ You may refuse consent; however, without consent,
                        smooth processing of counseling may not be possible.
                      </Text>
                      <Text>
                        ※ Personal data will not be used beyond agreed purposes.
                        You may request access, correction, or deletion via the
                        data protection officer.
                      </Text>
                    </>
                  )}
                </Box>

                <Flex
                  mt={4}
                  align="center"
                  gap={3}
                  justify="space-between"
                  wrap="wrap"
                >
                  <Checkbox.Root
                    checked={consentChecked}
                    onCheckedChange={(e) => setConsentChecked(!!e.checked)}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label
                      ml={2}
                      fontSize={{ base: "14px", md: "15px" }}
                    >
                      {locale === "ko"
                        ? "개인정보 처리방침을 읽었으며 내용에 동의합니다."
                        : "I have read the privacy notice and agree."}
                    </Checkbox.Label>
                  </Checkbox.Root>
                  <Button
                    colorPalette="green"
                    disabled={step === 1 && !consentChecked}
                    borderRadius="full"
                    onClick={() => setStep((prev) => Math.min(prev + 1, 4))}
                  >
                    Next
                  </Button>
                </Flex>
              </Box>
            )}

            {step === 2 && (
              <Box mt={6}>
                <Heading as="h3" fontSize={{ base: "18px", md: "20px" }} mb={4}>
                  {locale === "ko"
                    ? "기본정보 입력"
                    : "Enter Basic Information"}
                </Heading>
                <Stack gap={4}>
                  <Box>
                    <Text mb={2}>
                      {locale === "ko" ? "학번" : "Student Number"}
                    </Text>
                    <Input
                      value={studentNumber}
                      onChange={(e) => setStudentNumber(e.target.value)}
                      placeholder={
                        locale === "ko" ? "예: 20231234" : "e.g., 20231234"
                      }
                    />
                  </Box>
                  <Box>
                    <Text mb={2}>
                      {locale === "ko" ? "학과" : "Department"}
                    </Text>
                    <Input
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                      placeholder={
                        locale === "ko"
                          ? "학과명을 입력하세요"
                          : "Enter department"
                      }
                    />
                  </Box>
                  <Box>
                    <Text mb={2}>{locale === "ko" ? "이름" : "Full Name"}</Text>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={
                        locale === "ko"
                          ? "이름을 입력하세요"
                          : "Enter full name"
                      }
                    />
                  </Box>
                  <Box>
                    <Text mb={2}>{locale === "ko" ? "성별" : "Gender"}</Text>
                    <NativeSelect.Root maxW="240px">
                      <NativeSelect.Field
                        value={gender}
                        onChange={(e) =>
                          setGender(e.target.value as "M" | "F" | "")
                        }
                      >
                        <option value="">
                          {locale === "ko" ? "선택" : "Select"}
                        </option>
                        <option value="M">
                          {locale === "ko" ? "남" : "Male"}
                        </option>
                        <option value="F">
                          {locale === "ko" ? "여" : "Female"}
                        </option>
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                  </Box>
                </Stack>

                <Flex mt={5} justify="flex-end" gap={3}>
                  <Button
                    variant="outline"
                    borderRadius="full"
                    onClick={() => setStep(1)}
                  >
                    {locale === "ko" ? "이전" : "Back"}
                  </Button>
                  <Button
                    colorPalette="green"
                    borderRadius="full"
                    disabled={
                      !studentNumber || !departmentName || !fullName || !gender
                    }
                    onClick={handleStep2Next}
                  >
                    {locale === "ko" ? "다음" : "Next"}
                  </Button>
                </Flex>
              </Box>
            )}

            {step === 3 && (
              <Box mt={6}>
                <Heading as="h3" fontSize={{ base: "18px", md: "20px" }} mb={4}>
                  {locale === "ko"
                    ? "자가진단 선택"
                    : "Choose a Self-Assessment"}
                </Heading>
                <Stack gap={3}>
                  {[
                    {
                      key: "personality" as const,
                      ko: {
                        title: "스트레스 척도 검사",
                        desc: "성격 특성과 성향을 살펴봅니다",
                      },
                      en: {
                        title: "Personality Test",
                        desc: "Assess characteristics and traits",
                      },
                    },
                    {
                      key: "depression" as const,
                      ko: {
                        title: "우울 선별 검사",
                        desc: "우울 증상 여부를 선별합니다",
                      },
                      en: {
                        title: "Severity Measure for Depression",
                        desc: "Screen for symptoms of depression",
                      },
                    },
                    {
                      key: "anxiety" as const,
                      ko: {
                        title: "불안 척도 검사",
                        desc: "불안과 두려움 수준을 평가합니다",
                      },
                      en: {
                        title: "Anxiety Scale Test",
                        desc: "Evaluate feelings of anxiety and fear",
                      },
                    },
                  ].map((item) => {
                    const t = locale === "ko" ? item.ko : item.en;
                    const active = selectedSurvey === item.key;
                    return (
                      <Box
                        key={item.key}
                        p={4}
                        borderRadius="lg"
                        border={
                          active ? "2px solid #43AD83" : "1px solid #e2e8f0"
                        }
                        boxShadow={
                          active ? "0 0 0 2px rgba(67,173,131,0.15)" : "sm"
                        }
                        bg="white"
                        cursor="pointer"
                        onClick={() => setSelectedSurvey(item.key)}
                        _hover={{ borderColor: "#43AD83" }}
                      >
                        <Text fontWeight="bold" fontSize="lg">
                          {t.title}
                        </Text>
                        <Text mt={1} color="gray.600" fontSize="sm">
                          {t.desc}
                        </Text>
                      </Box>
                    );
                  })}
                </Stack>

                <Flex mt={5} justify="flex-end" gap={3}>
                  <Button
                    variant="outline"
                    borderRadius="full"
                    onClick={() => setStep(2)}
                  >
                    {locale === "ko" ? "이전" : "Back"}
                  </Button>
                  <Button
                    colorPalette="green"
                    borderRadius="full"
                    disabled={!selectedSurvey}
                    onClick={() => setStep(4)}
                  >
                    Next
                  </Button>
                </Flex>
              </Box>
            )}

            {step === 4 && selectedSurvey === "personality" && (
              <>
                <StressTest />
              </>
            )}
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
