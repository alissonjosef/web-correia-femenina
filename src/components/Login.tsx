import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { AuthContext } from "./AuthContext/AuthContext";

interface loginProps {
  onClose?: () => void;
}

export function Login({ onClose }: loginProps) {
  const isMobile = useBreakpointValue({ base: false, md: true });
  const { tokenStorage, setTokenStorage } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const handleClick = () => setShow(!show);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLinkLogin = () => {
    if (onClose) {
      onClose();
      navigate("/");
      // Fecha o Drawer ao clicar no link
    } // Fecha o Drawer ao clicar no link
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
      // Fecha o Drawer ao clicar no link
    } // Fecha o Drawer ao clicar no link
  };

  const [token, setToken] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;
      const response = await api.post("/api/login", { email, password });

      const token = response.data.token;

      /*  const tokenParts = token.split(".");
      const tokenPayload = JSON.parse(atob(tokenParts[1]));

      const userId = tokenPayload.userId;
      const name = tokenPayload.name;
      const emailToken = tokenPayload.email;
      const imgAvatar = tokenPayload.imgAvatar;
      const profile = tokenPayload.profile;

      console.log(userId); // ID do usuário
      console.log(name); // Nome do usuário
      console.log(emailToken); // E-mail do usuário
      console.log(imgAvatar); // URL da imagem do avatar do usuário
      console.log(profile); // Profile */

      localStorage.setItem("token", token);
      setTokenStorage(token);
      setToken(token);

      const userResponse = await api.get("api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userResponse.status === 200) {
        const userData = userResponse.data;
        setUser(userData);

        localStorage.setItem("user", JSON.stringify(userData));
      }

      reset();
    } catch (error) {
      return toast({
        position: "top",
        title: "Credenciais inválidas",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isMobile ? (
        <Box display="flex" alignItems="center" ml={5}>
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
              type="email"
              placeholder="Email"
              color="gray.700"
              variant="unstyled"
              px="4"
              mr="4"
              _placeholder={{ color: "gray.400" }}
              {...register("email")}
            />
          </Flex>

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
              type={show ? "text" : "password"}
              placeholder="Senha"
              color="gray.700"
              variant="unstyled"
              px="4"
              mr="4"
              _placeholder={{ color: "gray.400" }}
              {...register("password")}
            />
            {!show ? (
              <Icon
                as={AiFillEyeInvisible}
                fontSize={20}
                color="gray.500"
                onClick={handleClick}
              />
            ) : (
              <Icon
                as={AiFillEye}
                fontSize={20}
                color="gray.500"
                onClick={handleClick}
              />
            )}
          </Flex>

          <Button type="submit" ml={4} colorScheme="blue">
            Entrar
          </Button>
          <Link to="/register">
            <Button ml={4} colorScheme="blue">
              Cadastrar
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 0 }}
          alignItems="center"
          ml={{ base: 0, md: 5 }}
          mt={{ base: 4, md: 0 }}
        >
          <Flex
            as="label"
            flex="1"
            py="2"
            px="8"
            ml={{ base: "1", md: " 6" }}
            maxWidth={400}
            alignSelf="center"
            color="gray.100"
            position="relative"
            bg="gray.200"
            borderRadius="full"
            align="center"
          >
            <Input
              type="email"
              placeholder="Email"
              color="gray.700"
              variant="unstyled"
              px="4"
              mr="4"
              _placeholder={{ color: "gray.400" }}
              {...register("email")}
            />
          </Flex>

          <Flex
            as="label"
            flex="1"
            py="2"
            px="8"
            ml={{ base: "1", md: " 6" }}
            maxWidth={400}
            alignSelf="center"
            color="gray.100"
            position="relative"
            bg="gray.200"
            borderRadius="full"
            align="center"
          >
            <Input
              type={show ? "text" : "password"}
              placeholder="Senha"
              color="gray.700"
              variant="unstyled"
              px="4"
              mr="4"
              _placeholder={{ color: "gray.400" }}
              {...register("password")}
            />
            {!show ? (
              <Icon
                as={AiFillEyeInvisible}
                fontSize={20}
                color="gray.500"
                onClick={handleClick}
              />
            ) : (
              <Icon
                as={AiFillEye}
                fontSize={20}
                color="gray.500"
                onClick={handleClick}
              />
            )}
          </Flex>
          <Box w="full" pl={2} pr={2}>
            <Button
              type="submit"
              width={{ base: "full", md: "5rem" }}
              colorScheme="blue"
              onClick={handleLinkLogin}
            >
              Entrar
            </Button>

            <Link to="/register" onClick={handleLinkClick}>
              <Text mt={2} fontSize='sm' color="gray.500">
                Cadastrar
              </Text>
            </Link>
          </Box>
        </Box>
      )}
    </form>
  );
}
