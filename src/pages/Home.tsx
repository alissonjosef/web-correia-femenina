import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CardsProduct } from "../components/CardsProduct";
import { Loading } from "../components/Loading";
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

interface HomeProps {
  searchValue: string;
}
export function Home({ searchValue }: HomeProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredProducts = product.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  async function getProduct() {
    setIsLoading(false);
    try {
      await api.get("/api/product").then((response) => {
        setProduct(response.data);
      });
    } catch (error) {
      console.log("🚀 ~ file: Home.tsx:38 ~ getProduct ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    getProduct();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
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
              {filteredProducts.map((product, index) => {
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
              {filteredProducts.map((product, index) => {
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
