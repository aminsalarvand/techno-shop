import { useEffect, useState } from "react"

function Orders({ user}) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderItems, setOrderItems] = useState([])

  const loadOrderItems = async (orderId) => {
    try {
      const response = await fetch(
        `${window.API_URL}/api/order-items/order/${orderId}`
      )

      if (!response.ok) {
        throw new Error("دریافت جزئیات سفارش ناموفق بود")
      }

      const data = await response.json()

      setOrderItems(data)
      setSelectedOrder(orderId)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    fetch(`${window.API_URL}/api/orders/user/${user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("دریافت سفارش‌ها ناموفق بود")
        }

        return response.json()
      })
      .then((data) => {
        setOrders(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [user])

  return (
    <section className="orders-page">

      <div className="orders-header">
        <span>TECHSHOP ACCOUNT</span>

        <h1>سفارش‌های من</h1>

        <p>
          لیست سفارش‌های ثبت‌شده شما
        </p>
      </div>

      {loading ? (
        <div className="orders-message">
          در حال دریافت سفارش‌ها...
        </div>
      ) : orders.length === 0 ? (
        <div className="orders-message">
          هنوز سفارشی ثبت نکرده‌اید.
        </div>
      ) : (
        <>
          <div className="orders-list">

            {orders.map((order) => (
              <div
                className="order-card"
                key={order.id}
                onClick={() => loadOrderItems(order.id)}
              >

                <div>
                  <span>شماره سفارش</span>

                  <strong>
                    #{order.id}
                  </strong>
                </div>

                <div>
                  <span>مبلغ</span>

                  <strong>
                    {order.totalPrice.toLocaleString("fa-IR")} تومان
                  </strong>
                </div>

                <div>
                  <span>وضعیت</span>

                  <strong
                    className={
                      order.status === "PAID"
                        ? "paid"
                        : "pending"
                    }
                  >
                    {order.status === "PAID"
                      ? "پرداخت شده"
                      : "در انتظار پرداخت"}
                  </strong>
                </div>

              </div>
            ))}

          </div>

          {selectedOrder && (
            <div className="order-details">

              <div className="order-details-header">

                <div>
                  <span>جزئیات سفارش</span>

                  <h2>
                    سفارش #{selectedOrder}
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setSelectedOrder(null)
                    setOrderItems([])
                  }}
                >
                  بستن
                </button>

              </div>

              <div className="order-items">

                {orderItems.length === 0 ? (
                  <div className="orders-message">
                    آیتمی برای این سفارش پیدا نشد.
                  </div>
                ) : (
                  orderItems.map((item) => (
                    <div
                      className="order-item"
                      key={item.id}
                    >

                      <div>
                        <strong>
                          {item.productName}
                        </strong>

                        <span>
                          تعداد: {item.quantity}
                        </span>
                      </div>

                      <strong>
                        {item.price.toLocaleString("fa-IR")} تومان
                      </strong>

                    </div>
                  ))
                )}

              </div>

            </div>
          )}
        </>
      )}

    </section>
  )
}

export default Orders