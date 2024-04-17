import AddPRoductForm from "../../_components/products/AddPRoductForm"
const AddProductPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg text-center font-semibold md:text-2xl">Add Product</h1>
      </div>
      <AddPRoductForm />
    </main>
  )
}

export default AddProductPage