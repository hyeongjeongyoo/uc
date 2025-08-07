"use client";

import { Box, Link, VStack, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { Menu } from "@/types/api";
import { useState } from "react";

interface MenuItemProps {
  menu: Menu;
  isNavHovered: boolean;
  isDark: boolean;
  isRoot: boolean;
  currentPage: string;
  isMainPage?: boolean;
  isLastItem?: boolean;
  lastHoveredMenuId?: number | null;
  onMenuHover?: (menuId: number) => void;
  onMenuLeave?: () => void;
  isScrolled: boolean;
}

export function MenuItem({
  menu,
  isNavHovered,
  isDark,
  isRoot,
  currentPage,
  isMainPage = false,
  lastHoveredMenuId,
  onMenuHover,
  onMenuLeave,
  isScrolled,
}: MenuItemProps) {
  const [isSelfHovered, setIsSelfHovered] = useState(false);

  // Safety checks for menu properties
  if (!menu) {
    console.warn("MenuItem received undefined or null menu");
    return null;
  }

  // Check if the menu has a valid URL
  const menuUrl = menu.url || "#";
  const isActive = currentPage === menuUrl;
  const hasChildren = menu.children && menu.children.length > 0;

  // Determine colors based on header state (isNavHovered) and dark mode
  const isCurrentlyHovered =
    (lastHoveredMenuId === menu.id && isNavHovered) || isSelfHovered;

  const topLevelColor =
    isScrolled || isNavHovered
      ? isActive
        ? "#4A7CD5"
        : isCurrentlyHovered
        ? "#4A7CD5"
        : "#0D344E"
      : isActive
      ? "#4A7CD5"
      : isNavHovered
      ? "#0D344E"
      : "white";

  const topLevelHoverFocusColor = "#4A7CD5";

  const childColor =
    isScrolled || isNavHovered ? "#0D344E" : isNavHovered ? "#0D344E" : "white";
  const childHoverFocusColor = "#4A7CD5";

  const grandChildColor =
    isScrolled || isNavHovered
      ? "gray.600"
      : isNavHovered
      ? "gray.600"
      : "gray.300";
  const grandChildHoverFocusColor = "#4A7CD5";

  return (
    <Box
      flex="1"
      position="relative"
      onMouseEnter={() => {
        setIsSelfHovered(true);
        onMenuHover?.(menu.id);
      }}
      onMouseLeave={() => {
        setIsSelfHovered(false);
        onMenuLeave?.();
      }}
    >
      <Box position="relative" role="group" textAlign="center">
        <Link
          as={NextLink}
          href={menuUrl}
          display="block"
          py={6}
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          fontWeight={isRoot ? "normal" : "bold"}
          color={topLevelColor}
          position="relative"
          _hover={{
            textDecoration: "none",
            color: topLevelHoverFocusColor,
          }}
          _focus={{
            boxShadow: "none",
            color: topLevelHoverFocusColor,
            transform: "translateY(-1px)",
            outline: "none",
            border: "none",
          }}
          _active={{
            bg: "transparent",
          }}
          transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
          borderRadius="md"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {menu.name}
        </Link>
      </Box>

      {/* 하위 메뉴 컨테이너 */}
      {hasChildren && (
        <Box
          position="absolute"
          top="100%"
          left="0%"
          zIndex={10}
          w="100%"
          opacity={
            ((isSelfHovered && isNavHovered) ||
              (lastHoveredMenuId === menu.id && isNavHovered)) &&
            hasChildren
              ? 1
              : 0
          }
          visibility={
            ((isSelfHovered && isNavHovered) ||
              (lastHoveredMenuId === menu.id && isNavHovered)) &&
            hasChildren
              ? "visible"
              : "hidden"
          }
          transform={
            ((isSelfHovered && isNavHovered) ||
              (lastHoveredMenuId === menu.id && isNavHovered)) &&
            hasChildren
              ? "translateY(0)"
              : "translateY(-20px)"
          }
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          pointerEvents={
            ((isSelfHovered && isNavHovered) ||
              (lastHoveredMenuId === menu.id && isNavHovered)) &&
            hasChildren
              ? "auto"
              : "none"
          }
        >
          <Box pt={3} pb={3} px={{ base: 2, md: 4 }}>
            <Flex
              direction="column"
              wrap="nowrap"
              alignItems="center"
              gap={3}
              justify="flex-start"
            >
              {menu.children?.map((child) => {
                // Safety check for child menu item
                if (!child || typeof child !== "object") return null;

                return (
                  <Box
                    key={child.id || `child-${Math.random()}`}
                    position="relative"
                    flexShrink={0}
                  >
                    <Link
                      as={NextLink}
                      href={child.url || "#"}
                      display="block"
                      p={1}
                      fontSize={{ base: "xs", md: "16px" }}
                      color={childColor}
                      _hover={{
                        textDecoration: "none",
                        color: childHoverFocusColor,
                        fontWeight: "bold",
                        borderRadius: "md",
                      }}
                      _focus={{
                        boxShadow: "none",
                        color: childHoverFocusColor,
                        fontWeight: "bold",
                        borderRadius: "md",
                        outline: "none",
                        border: "none",
                      }}
                      _active={{
                        bg: "transparent",
                      }}
                      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                      whiteSpace="nowrap"
                    >
                      {child.name || "Menu"}
                    </Link>

                    {/* 3차 메뉴 */}
                    {child.children && child.children.length > 0 && (
                      <VStack
                        align="start"
                        gap={0}
                        p={0}
                        mt={1}
                        position="relative"
                        flex={1}
                        minW="150px"
                        bg="transparent"
                        boxShadow="none"
                        zIndex={20}
                        display="flex"
                      >
                        {child.children.map((grandChild) => {
                          // Safety check for grandchild menu item
                          if (!grandChild || typeof grandChild !== "object")
                            return null;

                          return (
                            <Link
                              key={
                                grandChild.id || `grandchild-${Math.random()}`
                              }
                              as={NextLink}
                              href={grandChild.url || "#"}
                              fontSize="sm"
                              fontWeight="bold"
                              color={grandChildColor}
                              _hover={{
                                color: grandChildHoverFocusColor,
                                fontWeight: "bold",
                              }}
                              display="block"
                              w="100%"
                              py={1.5}
                              px={3}
                            >
                              {grandChild.name || "Submenu"}
                            </Link>
                          );
                        })}
                      </VStack>
                    )}
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
}
