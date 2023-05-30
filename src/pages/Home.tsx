import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CardsProduct } from "../components/CardsProduct";
import { Carregamento } from "../components/Carregamento";
import { api } from "../lib/api";

interface ProductProps {
  createdAt: string;
  description: string;
  enabled: boolean;
  imageUrl: string;
  name: string;
  price: number;
  _id: string;
}
export function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getProduct() {
    setIsLoading(false);
    await api.get("/api/product").then((response) => {
      setProduct(response.data);
    });
  }
  useEffect(() => {
    setIsLoading(true);
    getProduct();
  }, [product]);

  return (
    <>
      {isLoading ? (
        <Carregamento />
      ) : (
        <Box>
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
                    id={product._id}
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
                    id={product._id}
                  />
                );
              })}
            </Grid>
          )}
        </Box>
      )}
    </>
  );
}
