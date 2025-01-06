/* eslint-disable react/prop-types */

const ProductDetails = ({ product }) => {
  const {
    sku,
    name,
    brand,
    description,
    price,
    discount,
    category,
    attributes,
    variants,
    metadata,
    shipping,
    seo,
  } = product;

  const finalPrice = (price.amount - discount.amount).toFixed(2);

  return (
    <div className="min-h-screen bg-white text-black font-sans p-6">
      <div className="max-w-5xl mx-auto">
        {/* Product Title */}
        <h1 className="text-4xl font-bold mb-4">{name}</h1>
        <p className="text-sm uppercase tracking-wide text-gray-600">{brand}</p>

        {/* Images */}
        <div className="mt-6 flex gap-4">
          {variants[0].images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.alt}
              className={`w-1/2 ${
                image.isPrimary ? "border-2 border-black" : ""
              }`}
            />
          ))}
        </div>

        {/* Price and Discount */}
        <div className="mt-6">
          <p className="text-2xl font-semibold">
            ${finalPrice}{" "}
            <span className="text-sm text-gray-500 line-through">
              ${price.amount}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Save {discount.percentage}% (${discount.amount}) - Offer valid until{" "}
            <span className="font-medium">
              {new Date(discount.validUntil).toLocaleDateString()}
            </span>
          </p>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-gray-700">{description}</p>
        </div>

        {/* Category */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Category</h2>
          <p className="text-gray-700">
            {category.primary} → {category.sub}
          </p>
        </div>

        {/* Attributes */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Attributes</h2>
          <p className="text-gray-700">
            <strong>Material:</strong> {attributes.material}
          </p>
          <p className="text-gray-700">
            <strong>Weight:</strong> {attributes.weight}
          </p>
          <h3 className="font-semibold mt-2">Care Instructions:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {attributes.care.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>

        {/* Shipping Details */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Shipping Details</h2>
          <p className="text-gray-700">
            <strong>Weight:</strong> {shipping.weight}g
          </p>
          <p className="text-gray-700">
            <strong>Dimensions:</strong> {shipping.dimensions.length} x{" "}
            {shipping.dimensions.width} x {shipping.dimensions.height}{" "}
            {shipping.dimensions.unit}
          </p>
          <p className="text-gray-700">
            <strong>Free Shipping:</strong>{" "}
            {shipping.freeShipping ? "Yes" : "No"}
          </p>
          <p className="text-gray-700">
            <strong>Estimated Delivery:</strong> {shipping.estimatedDelivery}
          </p>
        </div>

        {/* Ratings */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Ratings</h2>
          <p className="text-gray-700">
            <strong>Average Rating:</strong> {metadata.ratings.average} / 5 (
            {metadata.ratings.count} reviews)
          </p>
        </div>

        {/* SEO Metadata */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">SEO Metadata</h2>
          <p className="text-gray-700">
            <strong>Title:</strong> {seo.metaTitle}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {seo.metaDescription}
          </p>
          <p className="text-gray-700">
            <strong>Keywords:</strong> {seo.keywords.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
