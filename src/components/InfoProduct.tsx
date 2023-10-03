import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { ProductContext } from "./ProductContext";

export function InfoProduct() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { productId } = useParams();
  const { product } = useContext(ProductContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let productsArray = Array.isArray(product) ? product : [product];

  const productData = productsArray.find((item) => item._id === productId);

  if (!product && productData.length > 0) {
    return <div>Produto não encontrado</div>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex: any) => (prevIndex + 1) % productData.imageUrl.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex: any) =>
        (prevIndex - 1 + productData.imageUrl.length) %
        productData.imageUrl.length
    );
  };

  return (
    <Center py={{ base: 6, md: 8 }}>
      <Grid
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        gap={4}
        alignItems="center"
        maxWidth="900px"
        position='relative'
      >
        {productData.imageUrl.length > 1 && (
          <>
            <Button
              onClick={handlePrevImage}
              position="absolute"
              top="50%"
              left="0"
              transform="translateY(-50%)"
              zIndex="2"
              backgroundColor="transparent"
            >
              <ChevronLeftIcon boxSize={8} />
            </Button>
            <Button
              onClick={handleNextImage}
              position="absolute"
              top="50%"
              right="0"
              transform="translateY(-50%)"
              zIndex="2"
              backgroundColor="transparent"
            >
              <ChevronRightIcon boxSize={8} />
            </Button>
          </>
        )}
       
        <Image
          borderRadius="lg"
          src={productData.imageUrl[currentImageIndex]}
          alt={productData.name}
        />
        <Flex justifyContent="center">
          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              {productData.name}
            </Text>
            <Text fontSize="md" mb={2} whiteSpace="pre-wrap">
              {productData.description}
            </Text>
            <Text fontSize="4xl" fontWeight="bold" color="blue.300">
              {formatCurrency(productData.price)}
            </Text>     
          </Box>
        </Flex>
      </Grid>
    </Center>
  );
}
