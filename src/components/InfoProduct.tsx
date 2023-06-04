import {
  Box,
  Center,
  Flex,
  Grid,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { ProductContext } from "./ProductContext";

export function InfoProduct() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { productId } = useParams();
  const { product } = useContext(ProductContext);

  let productsArray = Array.isArray(product) ? product : [product];

  const productData = productsArray.find((item) => item._id === productId);

  if (!product && productData.length > 0) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <Center py={{ base: 6, md: 8 }}>
      <Grid
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        gap={4}
        alignItems="center"
        maxWidth="900px"
      >
        <Image
          borderRadius="lg"
          src={productData.imageUrl}
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
