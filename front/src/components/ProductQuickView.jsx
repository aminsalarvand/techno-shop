import macbookImage from "../assets/products/macbook.png";
import iphoneImage from "../assets/products/iphone.png";
import airpodsImage from "../assets/products/airpods.png";
import appleWatchImage from "../assets/products/apple-watch.png";

import macbookProM5Image from "../assets/products/macbook-pro-m5.png";
import iphone18ProImage from "../assets/products/iphone-18-pro.png";
import airpods5Image from "../assets/products/airpods-5.png";
import appleWatch12Image from "../assets/products/apple-watch-12.png";

function ProductQuickView({ product, onClose, onAddToCart }) {
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
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view" onClick={(e) => e.stopPropagation()}>
        <button className="quick-view-close" onClick={onClose}>
          ×
        </button>

        <img
          className="quick-view-image"
          src={image}
          alt={product.name}
        />

        <div className="quick-view-info">
          <span>{product.category}</span>

          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <strong>
            {product.price.toLocaleString("fa-IR")} تومان
          </strong>

          <button
            className="quick-view-cart"
            disabled={product.stock <= 0}
            onClick={() => {
              if (product.stock <= 0) return;

              onAddToCart(product);
              onClose();
            }}
          >
            {product.stock > 0 ? "افزودن به سبد خرید" : "ناموجود"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductQuickView;