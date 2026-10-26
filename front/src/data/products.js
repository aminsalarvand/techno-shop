import macbookImage from "../assets/products/macbook.png"
import iphoneImage from "../assets/products/iphone.png"
import airpodsImage from "../assets/products/airpods.png"
import appleWatchImage from "../assets/products/apple-watch.png"

const products = [
  {
    id: 1,
    name: "MacBook Pro M4",
    category: "لپ‌تاپ",
    price: 89900000,
    image: macbookImage,
    description: "لپ‌تاپ قدرتمند اپل برای کارهای حرفه‌ای"
  },
  {
    id: 2,
    name: "iPhone 17 Pro",
    category: "موبایل",
    price: 79900000,
    image: iphoneImage,
    description: "نسل جدید آیفون با طراحی مدرن"
  },
  {
    id: 3,
    name: "AirPods Pro",
    category: "هدفون",
    price: 12900000,
    image: airpodsImage,
    description: "صدای شفاف با حذف نویز فعال"
  },
  {
    id: 4,
    name: "Apple Watch",
    category: "ساعت هوشمند",
    price: 24900000,
    image: appleWatchImage,
    description: "ساعت هوشمند برای زندگی مدرن"
  }
]

export default products