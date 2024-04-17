import ProductList from "../_components/products/ProductList"
const ProductPage = async() => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <ProductList />
    </main>
  )
}

export default ProductPage