import { Flex, HStack, Icon, Link } from "@chakra-ui/react";
import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";

export function FooterBar() {
  return (
    <>
      <Flex
        as="header"
        w="100%"
        h={10}
        mt="auto"
        mx="auto"
        px={20}
        bg="gray.100"
        justifyContent="center"
      >
        <HStack
          spacing="8"
          alignItems="center"
          justifyContent="center"
          mx="8"
          py="1"
          color="gray.700"
          borderRight={1}
          borderColor="gray.700"
        >
          <Link href="https://www.instagram.com/correiafeminina_/">
            <Flex justifyContent="center">
              <Icon as={AiOutlineInstagram} color="purple.300" fontSize="35" />
            </Flex>
          </Link>
          <Flex justifyContent="center">
            <Icon as={AiOutlineWhatsApp} color="green.300" fontSize="30" />
          </Flex>
        </HStack>
      </Flex>
    </>
  );
}
