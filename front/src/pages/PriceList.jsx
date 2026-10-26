import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const priceVariants = {
  6: [
    {
      title: "128GB",
      price: "۱۲۵,۰۰۰,۰۰۰",
    },
    {
      title: "256GB",
      price: "۱۳۵,۰۰۰,۰۰۰",
    },
    {
      title: "512GB",
      price: "۱۵۰,۰۰۰,۰۰۰",
    },
    {
      title: "1TB",
      price: "۱۷۰,۰۰۰,۰۰۰",
    },
  ],

  5: [
    {
      title: "M5 / 16GB / 512GB",
      price: "۱۸۵,۰۰۰,۰۰۰",
    },
    {
      title: "M5 / 24GB / 1TB",
      price: "۲۱۰,۰۰۰,۰۰۰",
    },
    {
      title: "M5 Pro / 24GB / 1TB",
      price: "۲۴۵,۰۰۰,۰۰۰",
    },
  ],

  7: [
    {
      title: "نسخه استاندارد",
      price: "۱۸,۵۰۰,۰۰۰",
    },
    {
      title: "نسخه با کیس شارژ",
      price: "۲۱,۰۰۰,۰۰۰",
    },
  ],

  8: [
    {
      title: "GPS / 42mm",
      price: "۳۸,۰۰۰,۰۰۰",
    },
    {
      title: "GPS / 46mm",
      price: "۴۲,۰۰۰,۰۰۰",
    },
    {
      title: "Cellular / 46mm",
      price: "۴۸,۰۰۰,۰۰۰",
    },
  ],
}

function PriceList() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`${window.API_URL}/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("محصول پیدا نشد")
        }

        return response.json()
      })
      .then((data) => {
        setProduct(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [id])

  if (!product) {
    return (
      <main className="price-list-page">
        <div className="price-list-header">
          <span>TECHSHOP</span>
          <h1>در حال بارگذاری...</h1>
        </div>
      </main>
    )
  }

  const variants = priceVariants[id] || []

  return (
    <main className="price-list-page">

      <button
        className="product-intro-back"
        onClick={() => navigate("/")}
      >
        ← بازگشت
      </button>

      <section className="price-list-header">

        <span>TECHSHOP</span>

        <h1>{product.name}</h1>

        <p>
          مدل‌ها و کانفیگ‌های این محصول
        </p>

      </section>

      <section className="price-list-grid">

        {variants.map((variant) => (
          <article
            className="price-card"
            key={variant.title}
          >

            <div className="price-card-top">
              <span>{product.category}</span>
              <span>TECHSHOP</span>
            </div>

            <h2>{variant.title}</h2>

            <div className="price-card-bottom">

              <strong>
                {variant.price} تومان
              </strong>

              <button>
                مشاهده
              </button>

            </div>

          </article>
        ))}

      </section>

    </main>
  )
}

export default PriceList