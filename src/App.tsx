import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { CadastroProduct } from "./components/CadastroProduct";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cadastrar" element={<CadastroProduct />}></Route>
      </Routes>
      {/* <Box position="fixed" mt={10} bottom={0} left={0} right={0} bg="gray.200" >
        <FooterBar />
      </Box> */}
    </Router>
  );
}

export default App;
