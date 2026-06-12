import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import Shop from "./pages/Shop"
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App