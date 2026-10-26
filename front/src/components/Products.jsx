import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";

function Products({ onAddToCart, onProductClick }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

useEffect(() => {
  fetch(`${window.API_URL}/api/products`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("خطا در دریافت محصولات");
      }

      return response.json();
    })
    .then((data) => {
      setProducts(data);
      setLoading(false);

      setTimeout(() => {
        const savedScroll = sessionStorage.getItem("productsScroll");

        if (savedScroll) {
          window.scrollTo({
            top: Number(savedScroll),
            behavior: "smooth",
          });

          sessionStorage.removeItem("productsScroll");
        }
      }, 100);
    })
    .catch((error) => {
      console.error(error);
      setError("ارتباط با سرور برقرار نشد.");
      setLoading(false);
    });
}, []);

  const categories = [
    "همه",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "همه" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const categoryIcons = {
    همه: "✨",
    لپ‌تاپ: "💻",
    موبایل: "📱",
    هدفون: "🎧",
    "ساعت هوشمند": "⌚",
  };

  if (loading) {
    return (
      <section className="products-section" id="products">
        <div className="section-heading">
          <span>منتخب TECHSHOP</span>
          <h2>محصولات محبوب</h2>
          <p>در حال دریافت محصولات...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-section" id="products">
        <div className="no-products">
          <div>⚠️</div>
          <h3>{error}</h3>
          <p>مطمئن شو که Spring Boot در حال اجراست.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="categories" className="categories-section">
        <div className="section-heading">
          <span>دسته‌بندی محصولات</span>
          <h2>چی می‌خوای؟</h2>
          <p>دسته‌بندی موردنظرت را انتخاب کن.</p>
        </div>

        <div className="categories-grid">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item ? "category-card active" : "category-card"
              }
              onClick={() => {
                setCategory(item);

                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <div className="category-icon">
                {categoryIcons[item] || "📦"}
              </div>

              <strong>{item}</strong>

              <span>
                {item === "همه"
                  ? products.length
                  : products.filter(
                      (product) => product.category === item
                    ).length}{" "}
                محصول
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <span>منتخب TECHSHOP</span>
          <h2>محصولات محبوب</h2>
          <p>جدیدترین محصولات تکنولوژی را کشف کنید.</p>
        </div>

        <div className="product-tools">
          <div className="search-box">
            <span>⌕</span>

            <input
              id="product-search"
              type="text"
              placeholder="جستجوی محصول..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="category-filter">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              //onProductClick={(product) => setSelectedProduct(product)}
              onProductClick={(product) => {
              console.log("CLICKED:", product);
              setSelectedProduct(product);
            }}
            />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <div>🔍</div>
            <h3>محصولی پیدا نشد</h3>
            <p>عبارت جستجو یا دسته‌بندی را تغییر بده.</p>
          </div>
        )}
      </section>
      {selectedProduct && (
      <ProductQuickView
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}

      />
    )}
    </>
  );
}

export default Products;