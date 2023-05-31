import { Box, Grid, useBreakpointValue } from "@chakra-ui/react";
import { Key, useContext } from "react";
import { useQuery } from "react-query";
import { CardsProduct } from "../components/CardsProduct";
import { Loading } from "../components/Loading";
import { ProductContext } from "../components/ProductContext";
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
  const { setProduct } = useContext(ProductContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(
    "products",
    async () => {
      const response = await api.get("/api/product");
      setProduct(response.data)
      return response.data;
    },
    {
      refetchInterval: 5000,
    } 
  );

  const filteredProducts =
    product?.filter((product: { name: string }) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

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
              {filteredProducts.map(
                (product: ProductProps, index: Key | null | undefined) => {
                  return (
                    <CardsProduct
                      key={index}
                      imageUrl={product.imageUrl}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      enabled={product.enabled}
                      id={product._id}
                    />
                  );
                }
              )}
            </Grid>
          ) : (
            <Grid gap={6} w="100%" h={20} mt="10" mx="auto" px={10}>
              {filteredProducts.map(
                (product: ProductProps, index: Key | null | undefined) => {
                  return (
                    <CardsProduct
                      key={index}
                      imageUrl={product.imageUrl}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      enabled={product.enabled}
                      id={product._id}
                    />
                  );
                }
              )}
            </Grid>
          )}
        </Box>
      )}
    </>
  );
}
