import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Switch,
    useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { api } from "../lib/api";

const categoria = ["MASCULINO", "FEMENINO"];

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
  description?: string;
  imageUrl?: string;
  name?: string;
  price: number;
  id: string;
  modelos: string;
  enabled?: boolean;
}

export function ModalEdit({
  isOpen,
  onClose,
  description,
  imageUrl,
  name,
  price,
  id,
  enabled,
  modelos,
}: ModalEditProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue: setFormValue,
  } = useForm({
    defaultValues: {
      description,
      imageUrl,
      name,
      price,
      id,
      enabled,
      modelos,
    },
  });

  const toast = useToast();

  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
      setValue(imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageUrl]);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const selectedFile = files[0];
    const previewURL = URL.createObjectURL(selectedFile);
    setImagePreview(previewURL);
    setValue(previewURL);
  }

  const onSubmit = async (data: any) => {
    console.log("🚀 ~ file: ModalEdit.tsx:99 ~ onSubmit ~ data:", data);
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
      else {
        // Se nenhuma nova imagem for selecionada, manter o valor anterior
        formData.append("imageUrl", value || "");
      }
      formData.append("price", data.price.toString());
      formData.append("modelos", data.modelos);
      formData.append("enabled", data.enabled);

      await api.put(`/api/product/${id}`, formData);
      setPreview("");
      setImagePreview(null);
      onClose()

      toast({
        position: "top",
        title: "Produto Editado",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      return toast({
        position: "top",
        title: "Produto não Editado",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } 
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={3}>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  bg="white"
                  defaultValue={name}
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
                  defaultValue={description}
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
                {imagePreview && (
                  <Image src={imagePreview || imageUrl} alt="" rounded="lg" />
                )}
              </FormControl>
            </Box>

            <Flex flexDirection={{ base: "column", md: "row" }} mb={3} gap={4}>
              <FormControl isRequired>
                <FormLabel>Preço</FormLabel>
                <Input
                  bg="white"
                  placeholder="Preço do Produto"
                  defaultValue={price}
                  {...register("price")}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Categoria</FormLabel>
                <Select
                  bg="white"
                  placeholder="Selecione a categoria"
                  defaultValue={modelos}
                  {...register("modelos")}
                >
                  {categoria.map((country, index) => (
                    <option key={index}>{country}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Produto Esgotado
              </FormLabel>
              <Switch
                id="email-alerts"
                defaultChecked={enabled}
                {...register("enabled")}
              />
            </FormControl>

            <ModalFooter>
              <Button
                width={{ base: "full", md: "5rem" }}
                type="submit"
                colorScheme="telegram"
                mt={2}
              >
                Enviar
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
