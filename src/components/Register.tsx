import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export function Register() {
  const [show, setShow] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);
  const handlePassword = () => setShow(!show);
  const handlePasswordConfirm = () => setshowConfirm(!showConfirm);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const toast = useToast();

  const onSubmit = async (data: any) => {
    ///api/register
    try {
      await api.post("api/register", data);
      reset();
      navigate("/");
      toast({
        position: "top",
        title: "Usuario Cadastrado",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      return toast({
        position: "top",
        title: "Usuario não cadastrado",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center height="100vh">
        <Box width="300px" p="4" bg="white" rounded="md" boxShadow="lg">
          <VStack spacing="4">
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="Nome"
                bg="white"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Text color="red.500">Este campo é obrigatório</Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                placeholder="E-mail"
                bg="white"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <Text color="red.500">Este campo é obrigatório</Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Senha</FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder="Senha"
                  type={show ? "text" : "password"}
                  bg="white"
                  {...register("password", { required: true })}
                />
                <InputRightElement width="4.5rem">
                  <Icon
                    as={show ? AiFillEye : AiFillEyeInvisible}
                    fontSize="1.2rem"
                    onClick={handlePassword}
                    cursor="pointer"
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Text color="red.500">Este campo é obrigatório</Text>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirmar senha</FormLabel>
              <InputGroup size="md">
                <Input
                  placeholder="Confirmar senha"
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Icon
                    as={showConfirm ? AiFillEye : AiFillEyeInvisible}
                    fontSize="1.2rem"
                    onClick={handlePasswordConfirm}
                    cursor="pointer"
                  />
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && (
                <Text color="red.500">As senhas não coincidem</Text>
              )}
            </FormControl>
            <Button w="full" colorScheme="blue" type="submit">
              Criar
            </Button>
          </VStack>
        </Box>
      </Center>
    </form>
  );
}
