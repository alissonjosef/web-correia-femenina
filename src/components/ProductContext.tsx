import { Dispatch, SetStateAction, createContext, useState } from "react";

type ProductContextType = {
  product: {
    description?: string;
    imageUrl?: string;
    name?: string;
    price: number;
    _id: string;
    enabled?: boolean;
    modelos?: string;
  };
  setProduct: Dispatch<
    SetStateAction<{
      description?: string;
      imageUrl?: string;
      name?: string;
      price: number;
      _id: string;
      enabled?: boolean;
      modelos?: string;
    }>
  >;
};

export const ProductContext = createContext<ProductContextType>({
  product: {
    price: 0,
    _id: "",
  },
  setProduct: () => {},
});

export const ProductProvider = ({ children, initialProduct }: any) => {
  const [product, setProduct] = useState<{
    description?: string;
    imageUrl?: string;
    name?: string;
    price: number;
    _id: string;
    enabled?: boolean;
    modelos?: string;
  }>(initialProduct);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
