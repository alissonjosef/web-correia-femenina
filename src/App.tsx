import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { CadastroProduct } from "./components/CadastroProduct";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cadastrar" element={<CadastroProduct />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
