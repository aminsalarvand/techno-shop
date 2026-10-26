import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import macbookImage from "../assets/products/macbook.png";
import iphoneImage from "../assets/products/iphone.png";
import airpodsImage from "../assets/products/airpods.png";
import appleWatchImage from "../assets/products/apple-watch.png";

import macbookProM5Image from "../assets/products/macbook-pro-m5.png";
import iphone18ProImage from "../assets/products/iphone-18-pro.png";
import airpods5Image from "../assets/products/airpods-5.png";
import appleWatch12Image from "../assets/products/apple-watch-12.png";

import iphoneFront from "../assets/products/iphone/front.png";
import iphoneBack from "../assets/products/iphone/back.png";
import iphoneLeft from "../assets/products/iphone/left.png";
import iphoneRight from "../assets/products/iphone/right.png";

function ProductIntro() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

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

  const iphoneImages = [
    iphoneFront,
    iphoneBack,
    iphoneLeft,
    iphoneRight,
  ];

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
    return (
      <main className="product-intro-page">
        <div className="product-intro-loading">
          در حال بارگذاری...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-intro-page">
        <div className="product-intro-error">
          <h1>محصول پیدا نشد</h1>

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            بازگشت
          </button>
        </div>
      </main>
    );
  }

  const image =
    productImages[product.image] || product.image;

  return (
    <main className="product-intro-page">

      <button
        className="product-intro-back"
        onClick={() => navigate("/")}
      >
        ← بازگشت
      </button>

    <section className="product-intro-hero">

        <div className="product-intro-text">

          <span className="product-intro-label">
            TECHSHOP
          </span>

          <h1>
            {product.name}
          </h1>

          <h2>
            تکنولوژی را متفاوت تجربه کن.
          </h2>

          <p>
            {product.description}
          </p>

          {product.id === 6 && (
            <div className="product-hero-highlights">

              <div>
                <strong>A19 Pro</strong>
                <span>پردازنده</span>
              </div>

              <div>
                <strong>6.3"</strong>
                <span>نمایشگر</span>
              </div>

              <div>
                <strong>120Hz</strong>
                <span>ProMotion</span>
              </div>

            </div>
          )}

        </div>

        <div className="product-intro-visual">

          <div className="product-intro-glow"></div>

          <img
            src={product.id === 6 ? iphoneImages[currentImage] : image}
            alt={product.name}
          />

          {product.id === 6 && (
            <>
              <button
                className="product-intro-slider prev"
                onClick={() =>
                  setCurrentImage(
                    (currentImage - 1 + iphoneImages.length) %
                      iphoneImages.length
                  )
                }
              >
                ←
              </button>

              <button
                className="product-intro-slider next"
                onClick={() =>
                  setCurrentImage(
                    (currentImage + 1) %
                      iphoneImages.length
                  )
                }
              >
                →
              </button>

              <div className="product-intro-dots">
                {iphoneImages.map((_, index) => (
                  <button
                    key={index}
                    className={
                      index === currentImage ? "active" : ""
                    }
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </>
          )}

        </div>

      </section>

{product.id === 6 && (
  <section className="product-specs">

    <div className="product-specs-title">
      <span>مشخصات کلیدی</span>
      <h2>همه‌چیز برای یک تجربه حرفه‌ای.</h2>
    </div>

    <div className="product-specs-grid">

      <div className="product-spec-card">
        <span>پردازنده</span>
        <strong>A19 Pro</strong>
      </div>

      <div className="product-spec-card">
        <span>نمایشگر</span>
        <strong>6.3"</strong>
      </div>

      <div className="product-spec-card">
        <span>دوربین</span>
        <strong>48MP</strong>
      </div>

      <div className="product-spec-card">
        <span>حافظه</span>
        <strong>256GB</strong>
      </div>

      <div className="product-spec-card">
        <span>نرخ نوسازی</span>
        <strong>120Hz</strong>
      </div>

      <div className="product-spec-card">
        <span>درگاه</span>
        <strong>USB-C</strong>
      </div>

    </div>

  </section>
)}


      <section className="product-features">
            <div className="product-features-title">
                <span>ویژگی‌های برجسته</span>
                <h2>قدرتی که در جزئیات دیده می‌شود.</h2>
            </div>

            <div className="product-features-grid">
                <div className="product-feature-card">
                <span className="feature-icon">⚡</span>
                <h3>عملکرد قدرتمند</h3>
                <p>
                    عملکرد سریع و روان برای اجرای برنامه‌ها و کارهای روزمره.
                </p>
                </div>

                <div className="product-feature-card">
                <span className="feature-icon">◉</span>
                <h3>طراحی مدرن</h3>
                <p>
                    طراحی چشم‌نواز و دقیق که تجربه استفاده از محصول را متفاوت می‌کند.
                </p>
                </div>

                <div className="product-feature-card">
                <span className="feature-icon">✦</span>
                <h3>تجربه هوشمند</h3>
                <p>
                    امکاناتی که برای یک تجربه ساده، سریع و هوشمند طراحی شده‌اند.
                </p>
                </div>
            </div>
            </section>

    </main>
  );
}

export default ProductIntro;