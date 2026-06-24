<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/catalog" element={<Catalog />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/size-chart" element={<SizeChart />} />

  {/* Admin */}
  <Route path="/admin" element={<Login />} />
  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/admin/products" element={<Products />} />
</Routes>