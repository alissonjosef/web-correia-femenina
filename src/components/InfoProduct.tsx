import {
  Box,
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

  console.log("productId:", productId);
  console.log("product:", product);

  let productsArray = Array.isArray(product) ? product : [product];

  const productData = productsArray.find((item) => item._id === productId);

  console.log("productData:", productData);

  if (!product && productData.length > 0) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <Grid
      templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
      gap={4}
      alignItems="center"
      p={[20, 10, 10, 20]}
    >
      <Image
        borderRadius="lg"
        /* style={{ width: "200px", height: "200px" }} */
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
  );
}
