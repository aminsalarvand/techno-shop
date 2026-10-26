import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";

function ProductRoute({ onAddToCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${window.API_URL}/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("محصول پیدا نشد");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>در حال دریافت محصول...</div>;
  }

  if (!product) {
    return <div>محصول پیدا نشد.</div>;
  }

  return (
    <ProductDetails
      product={product}
      onAddToCart={onAddToCart}
    />
  );
}

export default ProductRoute;