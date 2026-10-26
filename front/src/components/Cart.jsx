import macbookImage from "../assets/products/macbook.png";
import iphoneImage from "../assets/products/iphone.png";
import airpodsImage from "../assets/products/airpods.png";
import appleWatchImage from "../assets/products/apple-watch.png";

import macbookProM5Image from "../assets/products/macbook-pro-m5.png";
import iphone18ProImage from "../assets/products/iphone-18-pro.png";
import airpods5Image from "../assets/products/airpods-5.png";
import appleWatch12Image from "../assets/products/apple-watch-12.png";

function Cart({
  cart,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>سبد خرید</h2>

          <button onClick={onClose}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div>🛒</div>
            <h3>سبد خرید خالی است</h3>
            <p>محصول موردنظرت رو به سبد اضافه کن.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img
                      src={productImages[item.image] || item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <strong>
                      {item.price.toLocaleString("fa-IR")} تومان
                    </strong>

                    <div className="quantity">
                      <button onClick={() => onDecrease(item.id)}>
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => onIncrease(item.id)}>
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() => onRemove(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>مجموع:</span>

                <strong>
                  {total.toLocaleString("fa-IR")} تومان
                </strong>
              </div>

              <button
                className="checkout-btn"
                onClick={onCheckout}
              >
                ادامه و پرداخت
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default Cart;