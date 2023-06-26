import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";

export function ShoppingCart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <>
      <Box onClick={onOpen} style={{ cursor: "pointer" }}>
        <Icon as={RiShoppingCart2Line} fontSize="20" mr={4} />
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt={2} />
          <DrawerHeader borderBottomWidth="1px">
            Seu carrinho tem 5 itens
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px"></Stack>
            <VStack spacing={2} align="start" borderBottom="1px" pb={2}>
              <Image
                src="https://correia.s3.us-east-2.amazonaws.com/1686447031059"
                alt="item.name"
                boxSize={32}
                objectFit="cover"
              />
              <Text>item.name</Text>
              <Text>$item.price</Text>
              <HStack>
                <Button size="sm" /* onClick={() => decreaseQuantity(index)} */>
                  -
                </Button>
                <Text>item.quantity</Text>
                <Button size="sm" /* onClick={() => increaseQuantity(index)} */>
                  +
                </Button>
              </HStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" justifyContent="center">
            <Button w="full" colorScheme="blue">
              Finalizar compra
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
