import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { CadastroProduct } from "./components/CadastroProduct";
import { Header } from "./components/Header";

import { InfoProduct } from "./components/InfoProduct";
import { ProductProvider } from "./components/ProductContext";
import { Home } from "./pages/Home";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  return (
    <Router>
      <ProductProvider>
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />}></Route>
          <Route path="/cadastrar" element={<CadastroProduct />}></Route>
          <Route path="/infoProduto" element={<InfoProduct />}></Route>
        </Routes>

        {/* <Box position="fixed" mt={10} bottom={0} left={0} right={0} bg="gray.200" >
        <FooterBar />
      </Box>  */}
        {""}
      </ProductProvider>
    </Router>
  );
}

export default App;
