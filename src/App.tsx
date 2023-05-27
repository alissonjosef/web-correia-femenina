import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import { CardsProduct } from "./components/CardsProduct";
import { Header } from "./components/Header";
import { api } from "./lib/api";

interface ProductProps {
  createdAt: string;
  description: string;
  enabled: boolean;
  imageUrl: string;
  name: string;
  price: number;
}

function App() {
  const [product, setProduct] = useState<ProductProps[]>([]);
  console.log("🚀 ~ file: App.tsx:17 ~ App ~ product:", product);

  async function getProduct() {
    await api.get("/api/product").then((response) => {
      setProduct(response.data);
    });
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Header />
      {/* <Box pb={10}>
        <CardsProduct />
      </Box> */}
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
          )
        })}
      </Grid>
    </>
  );
}

export default App;
