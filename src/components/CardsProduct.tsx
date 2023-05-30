import {
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
import { RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";
import { api } from "../lib/api";
import { formatCurrency } from "../utils/formatCurrency";

interface CardsProps {
  description?: string;
  imageUrl?: string;
  name?: string;
  price: number;
  id: string;
}

export function CardsProduct({
  description,
  imageUrl,
  name,
  price,
  id,
}: CardsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  async function handleDeleteProduct() {
    try {
      await api.delete(`/api/product/${id}`);

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
  }

  return (
    <Card maxW="sm">
      <CardBody>
        <Box w="full" display="flex" justifyContent="end">
          <Flex flexDirection="column" position="absolute">
            <Icon
              onClick={onOpen}
              as={RiDeleteBin7Line}
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
              onClick={()=> console.log('Editar')}
              as={RiEdit2Line}
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
        </Box>
        <Image
          src={imageUrl}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3" align="center">
          <Box h={10}>
            <Heading textAlign="center" size={{ xs: "xs", md: "md", lg: "md" }}>
              {name}
            </Heading>
          </Box>
          <Box h={10}>
            <Text
              textAlign="center"
              textOverflow="ellipsis"
              size={{ xs: "xs", md: "md", lg: "md" }}
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
    </Card>
  );
}
