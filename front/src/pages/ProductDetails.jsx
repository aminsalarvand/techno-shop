import { useState } from "react"
import { useNavigate } from "react-router-dom"

import macbookImage from "../assets/products/macbook.png"
import iphoneImage from "../assets/products/iphone.png"
import airpodsImage from "../assets/products/airpods.png"
import appleWatchImage from "../assets/products/apple-watch.png"

import macbookProM5Image from "../assets/products/macbook-pro-m5.png"
import iphone18ProImage from "../assets/products/iphone-18-pro.png"
import airpods5Image from "../assets/products/airpods-5.png"
import appleWatch12Image from "../assets/products/apple-watch-12.png"

function ProductDetails({ product, onAddToCart }) {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return null
  }

  const productImages = {
    "macbook.png": macbookImage,
    "iphone.png": iphoneImage,
    "airpods.png": airpodsImage,
    "apple-watch.png": appleWatchImage,
    "macbook-pro-m5.png": macbookProM5Image,
    "iphone-18-pro.png": iphone18ProImage,
    "airpods-5.png": airpods5Image,
    "apple-watch-12.png": appleWatch12Image,
  }

  const image = productImages[product.image] || product.image

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addProduct = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product)
    }
  }

  return (
    <section className="product-details">

      <button
        className="product-intro-back"
        onClick={() => navigate("/")}
      >
        ← بازگشت
      </button>

      <div className="details-container">

        <div className="details-visual">

          <div className="details-glow"></div>

          <div>
            <img
              src={image}
              alt={product.name}
            />
          </div>

        </div>

        <div className="details-info">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-price">
            {product.price.toLocaleString("fa-IR")} تومان
          </div>

          <div className="quantity-box">

            <span>تعداد</span>

            <div className="quantity-controls">

              <button onClick={decrease}>
                −
              </button>

              <strong>
                {quantity}
              </strong>

              <button onClick={increase}>
                +
              </button>

            </div>

          </div>

          <button
            className="add-detail-btn"
            disabled={product.stock <= 0}
            onClick={addProduct}
          >
            {product.stock > 0 ? "افزودن به سبد خرید" : "ناموجود"}
          </button>

        </div>

      </div>

    </section>
  )
}

export default ProductDetails