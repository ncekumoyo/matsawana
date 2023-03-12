import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Header from "./components/header";
import Inventory from "./components/inventory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryCreate from "./components/inventoryCreate";
import InventoryUpdate from "./components/inventoryUpdate";
import InventoryQuickUpdate from "./components/inventoryQuickUpdate";
import InventoryDelete from "./components/inventoryDelete";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/inventory/create" element={<InventoryCreate />} />
        <Route path="/inventory/update/:id" element={<InventoryUpdate />} />
        <Route path="/inventory/quick-update/:id" element={<InventoryQuickUpdate />} />
        <Route path="/inventory/delete/:id" element={<InventoryDelete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;