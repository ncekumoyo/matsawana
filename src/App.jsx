import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Header from "./components/header";
import Inventory from "./components/inventory/inventory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryCreate from "./components/inventory/inventoryCreate";
import InventoryUpdate from "./components/inventory/inventoryUpdate";
import InventoryQuickUpdate from "./components/inventory/inventoryQuickUpdate";
import InventoryDelete from "./components/inventory/inventoryDelete";
import Finance from "./components/finance/finance";
//import FinanceCreate from "./components/finance/financeCreate";

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
        <Route path="/finance" element={<Finance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
