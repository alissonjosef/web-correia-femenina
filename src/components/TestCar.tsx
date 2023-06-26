import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const TestCar = ({ isOpen, onClose, cartItems }: any) => {
  const [items, setItems] = useState(cartItems);

  const increaseQuantity = (index: any) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    setItems(updatedItems);
  };

  const decreaseQuantity = (index: any) => {
    const updatedItems = [...items];
    updatedItems[index].quantity -= 1;
    setItems(updatedItems);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="sm">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody>
            {items.map((item: any, index: any) => (
              <VStack
                key={index}
                spacing={2}
                align="start"
                borderBottom="1px"
                pb={2}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize={32}
                  objectFit="cover"
                />
                <Text>{item.name}</Text>
                <Text>${item.price}</Text>
                <HStack>
                  <Button size="sm" onClick={() => decreaseQuantity(index)}>
                    -
                  </Button>
                  <Text>{item.quantity}</Text>
                  <Button size="sm" onClick={() => increaseQuantity(index)}>
                    +
                  </Button>
                </HStack>
              </VStack>
            ))}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default TestCar;
