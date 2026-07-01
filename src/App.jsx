import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Shop from "./pages/Shop"
import ProductDetail from "./pages/ProductDetail"
import About from "./pages/About"
import Contact from "./pages/Contact"
import SizeChart from "./pages/SizeChart"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Login from "./admin/login"
import Dashboard from "./admin/dashboard"
import Products from "./admin/product"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/size-chart" element={<SizeChart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App