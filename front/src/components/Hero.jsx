import { useState } from "react";
import { useNavigate } from "react-router-dom";

import iphone18ProImage from "../assets/products/iphone-18-pro.png";
import macbookProM5Image from "../assets/products/macbook-pro-m5.png";
import airpods5Image from "../assets/products/airpods-5.png";
import appleWatch12Image from "../assets/products/apple-watch-12.png";

function Hero({ onAddToCart }) {
  const navigate = useNavigate();

  const products = [
    {
      id: 6,
      name: "iPhone 18 Pro",
      image: iphone18ProImage,
      specs: [
        ["نمایشگر", '6.3" OLED'],
        ["رزولوشن", "2622 × 1206"],
        ["پردازنده", "A20 Pro"],
        ["حافظه RAM", "12GB"],
        ["دوربین", "48MP"],
        ["وزن", "211g"],
        ["ضخامت", "8.75mm"],
        ["حافظه داخلی", "256GB / 512GB / 1TB / 2TB"],
      ],
    },

    {
      id: 5,
      name: "MacBook Pro M5",
      image: macbookProM5Image,
      specs: [
        ["پردازنده", "Apple M5"],
        ["نوع", "MacBook Pro"],
      ],
    },

    {
      id: 7,
      name: "AirPods 5",
      image: airpods5Image,
      specs: [
        ["نوع", "Wireless"],
        ["دسته‌بندی", "AirPods"],
      ],
    },

    {
      id: 8,
      name: "Apple Watch 12",
      image: appleWatch12Image,
      specs: [
        ["نوع", "Smart Watch"],
        ["دسته‌بندی", "Apple Watch"],
      ],
    },
  ];

  const [current, setCurrent] = useState(0);

  const product = products[current];

  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-label">
          TECHSHOP
        </p>

        <h1>
          {product.name}
        </h1>

        <p className="hero-description">
          مشخصات و جزئیات محصول را قبل از انتخاب بهتر بشناسید.
        </p>

        <div className="hero-specs">

          {product.specs.map(([label, value], index) => (
            <div
              className="hero-spec"
              key={index}
            >
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}

        </div>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => {
              navigate(`/product-intro/${product.id}`);
            }}
          >
            معرفی کامل
          </button>

          <button
            className="secondary-btn"
            onClick={() => {
              navigate(`/price-list/${product.id}`);
            }}
          >
            لیست قیمت
          </button>

        </div>

      </div>

      <div className="hero-visual">

        <div className="glow"></div>

        <div className="hero-product" key={current}>
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="hero-dots">

          {products.map((_, index) => (
            <button
              key={index}
              className={index === current ? "active" : ""}
              onClick={() => setCurrent(index)}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default Hero;