import { Box } from "@chakra-ui/react";

import { Heading } from "@chakra-ui/react";

const ContentsHeading = ({ title }: { title: string }) => {
  return (
    <Box>
      <Heading
        textAlign="center"
        as="h2"
        lineHeight="1.3"
        fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
        fontWeight="bold"
        mb={{ base: "30px", lg: "80px", xl: "100px" }}
      >
        {title}
      </Heading>
    </Box>
  );
};

export default ContentsHeading;
