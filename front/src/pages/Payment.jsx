function Payment({ order, onSuccess }) {
  if (!order) {
    return null;
  }

  return (
    <section className="payment-page">
      <div className="payment-wrapper">

        <div className="payment-header">
          <span>TECHSHOP CHECKOUT</span>

          <h1>تکمیل سفارش</h1>

          <p>
            سفارش شما آماده پرداخت است
          </p>
        </div>

        <div className="payment-card">

          <div className="payment-card-top">
            <div>
              <span className="payment-small-title">
                شماره سفارش
              </span>

              <strong>
                #{order.id}
              </strong>
            </div>

            <div className="payment-status">
              در انتظار پرداخت
            </div>
          </div>

          <div className="payment-divider"></div>

          <div className="payment-method">
            <span className="payment-small-title">
              روش پرداخت
            </span>

            <div className="payment-method-box">

              <div className="payment-method-icon">
                💳
              </div>

              <div>
                <strong>
                  پرداخت آزمایشی
                </strong>

                <p>
                  بدون دریافت وجه واقعی
                </p>
              </div>

              <span className="payment-check">
                ✓
              </span>

            </div>
          </div>

          <div className="payment-total">
            <span>
              مبلغ قابل پرداخت
            </span>

            <strong>
              {order.totalPrice.toLocaleString("fa-IR")} تومان
            </strong>
          </div>

          <button
            className="payment-btn"
            onClick={onSuccess}
          >
            پرداخت آزمایشی
            <span>←</span>
          </button>

          <div className="payment-security">
            🔒 پرداخت امن و آزمایشی
          </div>

        </div>

        <p className="payment-note">
          این صفحه صرفاً برای تست فروشگاه ساخته شده است.
          هیچ مبلغ واقعی از حساب شما کسر نمی‌شود.
        </p>

      </div>
    </section>
  );
}

export default Payment;