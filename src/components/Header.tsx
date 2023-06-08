import {
  Avatar,
  Box,
  Button,
  Drawer,
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
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { RiSearchLine, RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../assets/correia.png";
import LogoCorreia from "../assets/logo.png";
import { AuthContext, User } from "./AuthContext/AuthContext";
import { Login } from "./Login";

interface Headerprops {
  onSearch: (value: string) => void;
}

interface userProps {
  email: string;
  imgAvatar: string;
  name: string;
}

export function Header({ onSearch }: Headerprops) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [searchValue, setSearchValue] = useState("");
  const { user, tokenStorage, setTokenStorage, setUser } =
    useContext(AuthContext);

  const tokenParts = tokenStorage.split(".");

  let profile;

  if (tokenParts.length >= 2) {
    const tokenPayload = JSON.parse(atob(tokenParts[1]));
    profile = tokenPayload.profile;
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTokenStorage("");
    onClose();
    setUser(null);
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

          {tokenStorage ? (
            user && (
              <>
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
                    {profile === "ADMIN" && (
                      <Link to="/cadastrar">
                        <Icon as={RiUserAddLine} fontSize="20" />
                      </Link>
                    )}
                  </HStack>
                </Flex>
                <Flex align="center">
                  <Box mr="4" textAlign="right">
                    <Text>{(user as User).email}</Text>
                    <Text color="gray.500" fontSize="small">
                      {(user as User).name}
                    </Text>
                  </Box>

                  <Avatar
                    size="md"
                    name="Ariane Shirley"
                    src={(user as User).imgAvatar}
                  />
                </Flex>
                <Box as={Link} ml={3} onClick={handleLogout}>
                  <Text _hover={{ color: "red" }}>Sair</Text>
                </Box>
              </>
            )
          ) : (
            <Login />
          )}
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
          <Box onClick={onOpen}>
            <Image src={LogoCorreia} w={50} alt="logo Correia" />
          </Box>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                <>
                  <LinkChakra href="/">
                    <Image src={Logo} w={150} alt="logo Correia" />
                  </LinkChakra>
                  <Box justifyContent="center" alignItems="center">
                    {tokenStorage ? (
                      <Box w="full" pl={2} pr={2}>
                        <Button
                          colorScheme="red"
                          width={{ base: "full", md: "5rem" }}
                          mt={4}
                          onClick={handleLogout}
                        >
                          <Text _hover={{ color: "red" }}>Sair</Text>
                        </Button>
                      </Box>
                    ) : (
                      <Login onClose={onClose} />
                    )}
                  </Box>
                </>
              </DrawerHeader>
              {/*  <DrawerBody>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </DrawerBody> */}
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
            {tokenStorage && user && (
              <Link to={profile === "ADMIN" ? "/cadastrar" : ""}>
                <Avatar
                  size="md"
                  name="Ariane Shirley"
                  src={(user as User).imgAvatar}
                />
              </Link>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
}
