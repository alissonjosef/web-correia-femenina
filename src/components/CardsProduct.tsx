import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { formatCurrency } from "../utils/formatCurrency";
import { AuthContext } from "./AuthContext/AuthContext";
import { ModalEdit } from "./ModalEdit";
interface CardsProps {
  description?: string;
  imageUrl?: string;
  name?: string;
  price: number;
  id: string;
  enabled?: boolean;
  modelos?: string;
  createdAt: string;
}

export function CardsProduct({
  description,
  imageUrl,
  name,
  price,
  id,
  enabled,
  modelos,
  createdAt,
}: CardsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isNewPost, setIsNewPost] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tokenStorage, setTokenStorage } = useContext(AuthContext);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function handleDeleteProduct() {
    if (tokenStorage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        };
        await api.delete(`/api/product/${id}`, config);

        onClose();
        toast({
          position: "top",
          title: "Produto excluído",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          position: "top",
          title: "Erro ao excluir o produto",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        position: "top",
        title: "Você precisa fazer login para excluir o produto",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    const createdAtNew = parseISO(createdAt);
    const postDate = format(createdAtNew, "yyyy-MM-dd");

    const currentDate = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const differenceInDays = Math.floor(
      (currentDate.getTime() - createdAtNew.getTime()) / oneDayInMilliseconds
    );

    const formattedDate = format(createdAtNew, "yyyy-MM-dd");

    setIsNewPost(differenceInDays <= 1);
  }, []);

  return (
    <Card maxW="sm">
      <CardBody>
        <Box
          w="full"
          display="flex"
          justifyContent="end"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
        >
          {tokenStorage && (
            <Flex flexDirection="column" position="absolute">
              <Icon
                onClick={onOpen}
                as={RiDeleteBin7Line}
                position="relative"
                zIndex={999}
                color="gray.100"
                mt={2}
                ml={2}
                _hover={{
                  color: "red.300",
                  background: "white",
                  rounded: "full",
                  padding: "2px",
                }}
              />

              <Icon
                onClick={handleOpenModal}
                as={RiEdit2Line}
                position="relative"
                zIndex={999}
                color="gray.100"
                mt={4}
                ml={2}
                mr={2}
                _hover={{
                  color: "red.300",
                  background: "white",
                  rounded: "full",
                  padding: "2px",
                }}
              />
            </Flex>
          )}
          {isNewPost && (
            <Box justifyContent="center">
              <Badge m="1" colorScheme="green" position="absolute" zIndex={999}>
                Novo Produto
              </Badge>
            </Box>
          )}
          {enabled === false && (
            <Box justifyContent="center">
              <Badge m="1" colorScheme="red" position="absolute" zIndex={999}>
                Produto esgotado
              </Badge>
            </Box>
          )}
          <Link to={`/infoProduto/${id}`}>
            <Image
              position="relative"
              src={imageUrl}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              objectFit="cover"
              w="full"
              opacity={enabled === true ? "" : "0.2"}
            />
          </Link>
        </Box>
        <Stack mt="6" spacing="3" align="center">
          <Box h={10}>
            <Heading textAlign="center" size={{ xs: "xs", md: "xs", lg: "md" }}>
              {name}
            </Heading>
          </Box>
          <Box h={5}>
            <Text
              textAlign="center"
              textOverflow="ellipsis"
              size={{ xs: "xs", md: "xs", lg: "md" }}
            >
              {description && description.length > 30
                ? `${description.substring(0, 30)}...`
                : description}
            </Text>
          </Box>
          <Text
            color="gray.700"
            fontWeight="bold"
            fontSize={{ base: "xl", md: "2xl" }}
          >
            {formatCurrency(price)}
          </Text>
        </Stack>
      </CardBody>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader justifyContent="center">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text>Apagar produto</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2} p={0}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Text fontSize="lg">
                Você tem certeza que deseja apaga a{" "}
                <Text color="red.500" fontWeight="bold">
                  {name}.
                </Text>{" "}
                essa ação removerá o produto da listagem.
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleDeleteProduct} colorScheme="red" mr={3}>
              Apagar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ModalEdit
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        description={description}
        imageUrl={imageUrl}
        name={name}
        price={price}
        id={id}
        enabled={enabled}
        modelos={modelos ? modelos : "" }
      />
    </Card>
  );
}
