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
import Weights from "./components/weights/weights";
import WeightsCreate from "./components/weights/weightsCreate";
import WeightsDelete from "./components/weights/weightsDelete";
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
        <Route path="/weights" element={<Weights />} />
        <Route path="/weights/create" element={<WeightsCreate />} />
        <Route path="/weights/delete/:id" element={<WeightsDelete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
