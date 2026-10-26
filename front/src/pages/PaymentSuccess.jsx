function PaymentSuccess({ order, onHome, onOrders }) {
  if (!order) {
    return null
  }

  return (
    <section className="payment-success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <span className="success-label">
          TECHSHOP
        </span>

        <h1>
          پرداخت موفق بود
        </h1>

        <p className="success-description">
          سفارش شما با موفقیت ثبت شد و در حال پردازش است.
        </p>

        <div className="success-order">

          <div>
            <span>شماره سفارش</span>
            <strong>#{order.id}</strong>
          </div>

          <div>
            <span>مبلغ پرداختی</span>
            <strong>
              {order.totalPrice.toLocaleString("fa-IR")} تومان
            </strong>
          </div>

        </div>

        <div className="success-status">
          <span>✓</span>
          پرداخت تأیید شد
        </div>

        <div className="success-actions">

          <button
            className="success-primary-btn"
            onClick={onOrders}
          >
            مشاهده سفارش‌ها
          </button>

          <button
            className="success-secondary-btn"
            onClick={onHome}
          >
            بازگشت به فروشگاه
          </button>

        </div>

      </div>

    </section>
  )
}

export default PaymentSuccess