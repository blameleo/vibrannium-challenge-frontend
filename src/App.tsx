import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Customers } from "./pages/Customers";
import { Services } from "./pages/Services";

function App() {
  return (
    <main className="  ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
