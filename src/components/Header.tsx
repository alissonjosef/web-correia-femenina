import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Link as LinkChakra,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { RiSearchLine, RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../assets/correia.png";
import LogoCorreia from "../assets/logo.png";

interface Headerprops {
  onSearch: (value: string) => void;
}

export function Header({ onSearch }: Headerprops) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchValue);
  };
  return (
    <>
      {!isMobile ? (
        <Flex
          as="header"
          w="100%"
          maxWidth={1480}
          h={20}
          mx="auto"
          px={20}
          align="center"
          bg="gray.100"
        >
          <Link to="/">
            <Image src={Logo} w={150} alt="logo Correia" />
          </Link>

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
              color="gray.700"
              variant="unstyled"
              px="4"
              mr="4"
              placeholder="Buscar pelo seu produtor"
              _placeholder={{ color: "gray.400" }}
              value={searchValue}
              onChange={handleSearchChange}
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
              <Link to="/cadastrar">
                <Icon as={RiUserAddLine} fontSize="20" />
              </Link>
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
      ) : (
        <Flex
          as="header"
          w="100%"
          maxWidth={1480}
          h={20}
          mt="2"
          mx="auto"
          px={5}
          align="center"
          bg="gray.100"
        >
          <Box  onClick={onOpen}>
            <Image src={LogoCorreia} w={50} alt="logo Correia" />
          </Box>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                <LinkChakra href="/">
                  <Image src={Logo} w={150} alt="logo Correia" />
                </LinkChakra>
              </DrawerHeader>
              <DrawerBody>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

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
              color="gray.700"
              variant="unstyled"
              px="4"
              mr="4"
              placeholder="Buscar pelo seu produtor"
              _placeholder={{ color: "gray.400" }}
              value={searchValue}
              onChange={handleSearchChange}
            />
            <Icon as={RiSearchLine} fontSize={20} color="gray.500" />
          </Flex>

          <Flex align="center" ml={4}>
            {/*  <Box mr="4" textAlign="right">
            <Text>Ariane</Text>
            <Text color="gray.500" fontSize="small">
              ariane@gmail.com
            </Text>
          </Box> */}

            <Link to="/cadastrar">
              <Avatar
                size="md"
                name="Ariane Shirley"
                src="https://scontent.frec31-1.fna.fbcdn.net/v/t39.30808-6/262174588_4316835295091680_3672400332259559107_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Uj2wZ4VckHcAX8lb-gU&_nc_ht=scontent.frec31-1.fna&oh=00_AfAlCnNjQviyfSVnH9hQpygtRcSQZqOV7wKGrTyRERcp4A&oe=647D518F"
              />
            </Link>
          </Flex>
        </Flex>
      )}
    </>
  );
}
