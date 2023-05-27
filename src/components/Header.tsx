import {
    Avatar,
    Box,
    Flex,
    HStack,
    Icon,
    Image,
    Input,
    Text,
} from "@chakra-ui/react";
import { RiSearchLine, RiUserAddLine } from "react-icons/ri";
import Logo from "../assets/correia.png";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h={20}
      mt="2"
      mx="auto"
      px={20}
      align="center"
      bg="gray.100"
    >
      <Image src={Logo} w={150} alt="logo Correia" />

      <Flex
        as="label"
        flex="1"
        py="2"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.100"
        position="relative"
        bg="gray.200"
        borderRadius="full"
        align="center"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar pelo seu produtor"
          _placeholder={{ color: "gray.400" }}
        />
        <Icon as={RiSearchLine} fontSize={20} color="gray.500" />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.700"
          borderRight={1}
          borderColor="gray.700"
        >
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>
      </Flex>

      <Flex align="center">
        <Box mr="4" textAlign="right">
          <Text>Ariane</Text>
          <Text color="gray.500" fontSize="small">
            ariane@gmail.com
          </Text>
        </Box>

        <Avatar
          size="md"
          name="Ariane Shirley"
          src="https://scontent.frec6-1.fna.fbcdn.net/v/t39.30808-6/262174588_4316835295091680_3672400332259559107_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=nMmoaJSVQz4AX81SKFu&_nc_ht=scontent.frec6-1.fna&oh=00_AfCPUaTBBV7xFwZ7xraSg6pS74bpKeVNKf9-BycDgYqvTA&oe=647762CF"
        />
      </Flex>
    </Flex>
  );
}
