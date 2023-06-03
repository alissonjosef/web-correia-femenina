import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
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

      <Button ml={4} colorScheme="blue">
        Entrar
      </Button>
    </Box>
  );
}
