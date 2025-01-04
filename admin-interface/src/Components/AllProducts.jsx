import { Link, useLoaderData } from "react-router-dom";

function AllProducts() {
  const products = useLoaderData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold">${product.price.amount}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
}

export default AllProducts;
