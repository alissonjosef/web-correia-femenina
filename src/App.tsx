import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { CadastroProduct } from "./components/CadastroProduct";
import { Header } from "./components/Header";

import { AuthProvider } from "./components/AuthContext/AuthContext";
import { InfoProduct } from "./components/InfoProduct";
import { ProductProvider } from "./components/ProductContext";
import { Register } from "./components/Register";
import { Home } from "./pages/Home";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  return (
    <Router>
      <ProductProvider>
        <AuthProvider>
          <Header onSearch={handleSearch} />
          <Routes>
            <Route
              path="/"
              element={<Home searchValue={searchValue} />}
            ></Route>
            <Route path="/cadastrar" element={<CadastroProduct />}></Route>
            <Route
              path="/infoProduto/:productId"
              element={<InfoProduct />}
            ></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>

          {/* <Box position="fixed" mt={10} bottom={0} left={0} right={0} bg="gray.200" >
        <FooterBar />
      </Box>  */}
          {""}
        </AuthProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
