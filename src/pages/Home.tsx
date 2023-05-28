import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CardsProduct } from "../components/CardsProduct";
import { api } from "../lib/api";

interface ProductProps {
  createdAt: string;
  description: string;
  enabled: boolean;
  imageUrl: string;
  name: string;
  price: number;
}
export function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [product, setProduct] = useState<ProductProps[]>([]);

  async function getProduct() {
    await api.get("/api/product").then((response) => {
      setProduct(response.data);
    });
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Box minHeight="100vh" position="relative">
      {!isMobile ? (
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={6}
          w="100%"
          maxWidth={1480}
          h={20}
          mt="10"
          mx="auto"
          px={20}
        >
          {product.map((product, index) => {
            return (
              <CardsProduct
                key={index}
                imageUrl={product.imageUrl}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            );
          })}
        </Grid>
      ) : (
        <Grid gap={6} w="100%" h={20} mt="10" mx="auto" px={10}>
          {product.map((product, index) => {
            return (
              <CardsProduct
                key={index}
                imageUrl={product.imageUrl}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
