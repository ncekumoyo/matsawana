import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import Header from "./components/header"
import Inventory from "./components/inventory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryCreate from "./components/inventoryCreate";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/inventory/create" element={<InventoryCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
