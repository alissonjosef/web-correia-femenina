import { createContext, useState } from "react";

type ProductContextType = {
    product: {
        description?: string;
        imageUrl?: string;
        name?: string;
        price: number;
        id: string;
        enabled?: boolean;
        modelos?: string;
    };
  };
export const ProductContext = createContext({});


 

export const ProductProvider = ({ children }: any) => {
  const [product, setProduct] = useState(null);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
