import { useState } from "react";
import Virtual from "./components/Virtual";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductDetails from "./pages/ProductDetails";
import LoginModal from "./components/LoginModal";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Orders from "./pages/Orders";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ProductRoute from "./pages/ProductRoute";
import ProductIntro from "./pages/ProductIntro";
import PriceList from "./pages/PriceList"
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("techshopUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        if (existingProduct.quantity >= product.stock) {
          alert("موجودی این محصول کافی نیست.");
          return currentCart;
        }

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      if (product.stock <= 0) {
        alert("این محصول موجود نیست.");
        return currentCart;
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.quantity >= item.stock) {
          alert("موجودی این محصول کافی نیست.");
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const toggleTheme = () => {
    setIsDark((current) => !current);
  };

  // برگشت به صفحه اصلی فروشگاه
const goHome = () => {
  setPaymentOpen(false);
  setPaymentSuccess(false);
  setOrdersOpen(false);
  setCurrentOrder(null);
  setCartOpen(false);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  // باز کردن سفارش‌ها
  const openOrders = () => {
    setPaymentOpen(false);
    setPaymentSuccess(false);
    setOrdersOpen(true);
    setCartOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
  <BrowserRouter>
    <div className={isDark ? "app dark" : "app light"}>
      <MusicPlayer />
      <Header
        cartCount={cartCount}
        user={user}

        onLogout={() => {
          setUser(null);
          localStorage.removeItem("techshopUser");
        }}

        onCartClick={() => {
          setCartOpen(true);
          setPaymentOpen(false);
          setPaymentSuccess(false);
          setOrdersOpen(false);
        }}

        onLoginClick={() => {
          setLoginOpen(true);
        }}

        onThemeToggle={toggleTheme}

        isDark={isDark}

        onSearchClick={() => {
          setPaymentOpen(false);
          setPaymentSuccess(false);
          setOrdersOpen(false);
          setCartOpen(false);

          setTimeout(() => {
            document
              .getElementById("product-search")
              ?.focus();

            document
              .getElementById("products")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }, 50);
        }}

        onHomeClick={goHome}
      />

<main>
  <Routes>

    {/* صفحه معرفی محصول */}
    <Route
      path="/product-intro/:id"
      element={<ProductIntro />}
    />

    {/* صفحه لیست قیمت */}
    <Route
      path="/price-list/:id"
      element={<PriceList />}
    />
    
    {/* صفحه محصول */}
    <Route
      path="/product/:id"
      element={
        <ProductRoute
          onAddToCart={addToCart}
        />
      }
    />

    {/* بقیه صفحات */}
    <Route
      path="*"
      element={
        <>
          {ordersOpen ? (

            <Orders
              user={user}
              onBack={goHome}
            />

          ) : paymentSuccess ? (

            <PaymentSuccess
              order={currentOrder}
              onHome={goHome}
              onOrders={openOrders}
            />

          ) : paymentOpen ? (

            <Payment
              order={currentOrder}

              onBack={() => {
                setPaymentOpen(false);
                setCurrentOrder(null);
                setCartOpen(true);
              }}

              onSuccess={async () => {
                try {
                  const response = await fetch(
                    `${window.API_URL}/api/orders/${currentOrder.id}/status?status=PAID`,
                    {
                      method: "PUT",
                    }
                  );

                  if (!response.ok) {
                    throw new Error("پرداخت انجام نشد");
                  }

                  const updatedOrder = await response.json();

                  console.log(
                    "Payment successful:",
                    updatedOrder
                  );

                  setCart([]);
                  setPaymentOpen(false);
                  setPaymentSuccess(true);
                  setCurrentOrder(updatedOrder);

                } catch (error) {
                  console.error(error);

                  alert("پرداخت انجام نشد.");
                }
              }}
            />

          ) : (

            /* صفحه اصلی */
            <>
              <Hero />

              <Products
                onAddToCart={addToCart}
              />

              <section
                id="about"
                className="simple-section"
              >
                <span>
                  درباره TECHSHOP
                </span>

                <h2>
                  تکنولوژی، ساده‌تر و بهتر
                </h2>

                <p>
                  TECHSHOP یک فروشگاه مدرن برای تجربه‌ای
                  متفاوت از خرید محصولات تکنولوژی است.
                </p>
              </section>
            </>

          )}
        </>
      }
    />

  </Routes>
</main>

      {/* سبد خرید */}
      {cartOpen && (

        <Cart
          cart={cart}

          onClose={() => {
            setCartOpen(false);
          }}

          onIncrease={increaseQuantity}

          onDecrease={decreaseQuantity}

          onRemove={removeItem}

          onCheckout={async () => {
            if (!user) {
              alert(
                "لطفاً ابتدا وارد حساب کاربری شوید."
              );
              return;
            }

            if (cart.length === 0) {
              return;
            }

            const totalPrice = cart.reduce(
              (sum, item) =>
                sum + item.price * item.quantity,
              0
            );

            try {
              const response = await fetch(
                `${window.API_URL}/api/orders/with-items`,
                {
                  method: "POST",

                  headers: {
                    "Content-Type": "application/json",
                  },

                  body: JSON.stringify({
                    userId: user.id,

                    totalPrice: totalPrice,

                    status: "PENDING",

                    items: cart.map((item) => ({
                      productId: item.id,
                      productName: item.name,
                      price: item.price,
                      quantity: item.quantity,
                    })),
                  }),
                }
              );

              if (!response.ok) {
                throw new Error(
                  "ساخت سفارش انجام نشد"
                );
              }

              const order =
                await response.json();

              console.log(
                "Order created:",
                order
              );

              setCurrentOrder(order);

              setCartOpen(false);

              setPaymentOpen(true);

            } catch (error) {
              console.error(error);

              alert(
                "خطا در ایجاد سفارش."
              );
            }
          }}
        />

      )}

      {/* ورود */}
      {loginOpen && (

        <LoginModal
          onClose={() => {
            setLoginOpen(false);
          }}

          onLogin={(loggedInUser) => {
            setUser(loggedInUser);

            localStorage.setItem(
              "techshopUser",
              JSON.stringify(loggedInUser)
            );

            setLoginOpen(false);
          }}
        />

      )}
      <Virtual isDark={isDark} />
    </div>
    </BrowserRouter>
  );
}

export default App;