import macbookImage from "../assets/products/macbook.png";
import iphoneImage from "../assets/products/iphone.png";
import airpodsImage from "../assets/products/airpods.png";
import appleWatchImage from "../assets/products/apple-watch.png";

import macbookProM5Image from "../assets/products/macbook-pro-m5.png";
import iphone18ProImage from "../assets/products/iphone-18-pro.png";
import airpods5Image from "../assets/products/airpods-5.png";
import appleWatch12Image from "../assets/products/apple-watch-12.png";

import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAddToCart, onProductClick }) {
  const navigate = useNavigate();

  const productImages = {
    "macbook.png": macbookImage,
    "iphone.png": iphoneImage,
    "airpods.png": airpodsImage,
    "apple-watch.png": appleWatchImage,

    "macbook-pro-m5.png": macbookProM5Image,
    "iphone-18-pro.png": iphone18ProImage,
    "airpods-5.png": airpods5Image,
    "apple-watch-12.png": appleWatch12Image,
  };

  const image = productImages[product.image] || product.image;

  return (
  <article
    className="product-card"
    onClick={() => {
      sessionStorage.setItem("productsScroll", window.scrollY);
      navigate(`/product/${product.id}`);
    }}
  >
    <div
      className="product-visual"
      onClick={(e) => {
        e.stopPropagation();
        onProductClick(product);
      }}
    >
      {product.stock <= 0 && (
        <div className="product-status disabled">ناموجود</div>
      )}

      <div className="product-glow"></div>

      <div className="product-3d">
        <img src={image} alt={product.name} />
      </div>
    </div>

    <div className="product-info">
      <span className="product-category">{product.category}</span>

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <div className="product-bottom">
        <strong>
          {product.price.toLocaleString("fa-IR")} تومان
        </strong>

        <div className="product-actions">
          <button
            className="product-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              sessionStorage.setItem("productsScroll", window.scrollY);
              navigate(`/product/${product.id}`);
            }}
          >
            مشاهده جزئیات
          </button>

          <button
            disabled={product.stock <= 0}
            onClick={(e) => {
              e.stopPropagation();

              if (product.stock <= 0) return;

              onAddToCart(product);
              navigate("/cart");
            }}
          >
            {product.stock > 0 ? "افزودن به سبد" : "ناموجود"}
          </button>
        </div>
      </div>
    </div>
  </article>
);

}

export default ProductCard;
