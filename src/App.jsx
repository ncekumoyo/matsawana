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
import Weights from "./components/weights/weights";
import WeightsCreate from "./components/weights/weightsCreate";
import WeightsDelete from "./components/weights/weightsDelete";
import Sales from "./components/sales/sales";
import SalesCreate from "./components/sales/salesCreate";
import SalesUpdate from "./components/sales/salesUpdate";
import SalesDelete from "./components/sales/salesDelete";

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
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/create" element={<SalesCreate />} />
        <Route path="/sales/update/:id" element={<SalesUpdate />} />
        <Route path="/sales/delete/:id" element={<SalesDelete />} />
        <Route path="/weights" element={<Weights />} />
        <Route path="/weights/create" element={<WeightsCreate />} />
        <Route path="/weights/delete/:id" element={<WeightsDelete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
