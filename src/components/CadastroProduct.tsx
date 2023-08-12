import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { AuthContext } from "./AuthContext/AuthContext";

const categoria = [
  "SAIA",
  "CAMISAS",
  "SHORT",
  "CINTO",
  "SANDALIA",
  "BOLSA",
  "MACAQUINHO",
  "BODY",
  "CASACO",
  "CONJUNTO",
  "VESTIDO",
  "BLUSA",
];

export const CadastroProduct = () => {
  const { tokenStorage, setTokenStorage } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
 

  useEffect(() => {
    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files.length > 0
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(fileInputRef.current.files[0]);
    } else {
      setPreview(null);
    }
  }, [fileInputRef.current]);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);
    setPreview(previewURL);
  }

  const onSubmit = async (data: any) => {
    const config = {
      headers: {
        Authorization: `Bearer ${tokenStorage}`,
      },
    };
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (
        fileInputRef.current &&
        fileInputRef.current.files &&
        fileInputRef.current.files.length > 0
      ) {
        formData.append("imageUrl", fileInputRef.current.files[0]);
      } // Usando a referência do input de arquivo
      formData.append("price", data.price.toString());
      formData.append("modelos", data.modelos);

      await api.post("/api/product", formData, config);

      setPreview("");
      reset();

      toast({
        position: "top",
        title: "Produto cadastrado",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      return toast({
        position: "top",
        title: "Produto não cadastrado",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex w="100%" my="6" maxW={1488} mx="auto" px="6">
      <Box flex="1" borderRadius={8} bg="gray.100" p="8">
        <Box mb={4}>
          <Link to="/">
            <Icon
              as={IoIosArrowRoundBack}
              mr={2}
              color="gray.400"
              fontSize={40}
            />
          </Link>
        </Box>
        <Heading
          size="sx"
          color="gray.500"
          fontWeight="semibold"
          textTransform="uppercase"
        >
          Adicionar Produtos
        </Heading>
        <Box mt={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={3}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  bg="white"
                  placeholder="Nome do Produto"
                  {...register("name")}
                />
              </FormControl>
            </Box>
            <Box mb={3}>
              <FormControl isRequired>
                <FormLabel>Descrição</FormLabel>
                <Input
                  bg="white"
                  placeholder="Descrição do Produto"
                  {...register("description")}
                />
              </FormControl>
            </Box>

            <Box mb={3} justifyContent="center" alignItems="center">
              <FormControl isRequired>
                <FormLabel>Adicione a imagem</FormLabel>
                <input
                  ref={fileInputRef} // Referência para o input de arquivo
                  name="imageUrl"
                  type="file"
                  id="media"
                  accept="image/*"
                  style={{ display: "none", cursor: "pointer" }}
                  onChange={onFileSelected}
                />

                <label htmlFor="media" style={{ cursor: "pointer" }}>
                  <Icon
                    as={AiFillCamera}
                    mr={2}
                    color="gray.400"
                    fontSize={40}
                  />
                </label>
                {preview && <Image src={preview} alt="" rounded="lg" />}
              </FormControl>
            </Box>

            <Flex flexDirection={{ base: "column", md: "row" }} mb={3} gap={4}>
              <FormControl isRequired>
                <FormLabel>Preço</FormLabel>
                <Input
                  bg="white"
                  placeholder="Preço do Produto"
                  {...register("price")}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Categoria</FormLabel>
                <Select
                  bg="white"
                  placeholder="Selecione a categoria"
                  {...register("modelos")}
                >
                  {categoria.map((country, index) => (
                    <option key={index}>{country}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>

            <Button
              width={{ base: "full", md: "5rem" }}
              type="submit"
              colorScheme="telegram"
              mt={2}
            >
              Enviar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
