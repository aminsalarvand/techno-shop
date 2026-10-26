import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({
  cartCount,
  onCartClick,
  onSearchClick,
  onLoginClick,
  onHomeClick,
  onThemeToggle,
  isDark,
  user,
  onLogout,
}) {
  const navigate = useNavigate();

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const handleMusicState = (event) => {
      setIsMusicPlaying(event.detail);
    };

    window.addEventListener("musicStateChange", handleMusicState);

    return () => {
      window.removeEventListener("musicStateChange", handleMusicState);
    };
  }, []);

  return (
    <header className="header">
      <button
        className="logo"
        onClick={() => {
          onHomeClick();
        }}
        title="صفحه اصلی"
      >
        TECH<span>SHOP</span>
      </button>

      <nav className="nav">
        <button onClick={onHomeClick}>
          خانه
        </button>

        <button
          onClick={() => {
            document.getElementById("categories")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          دسته‌بندی‌ها
        </button>

        <button
          onClick={() => {
            document.getElementById("products")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          محصولات
        </button>

        <button
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          درباره ما
        </button>
      </nav>

      <div className="header-actions">

        <button
          className={`music-btn ${isMusicPlaying ? "playing" : ""}`}
          onClick={() => {
            window.dispatchEvent(new Event("toggleMusic"));
          }}
          title={
            isMusicPlaying
              ? "توقف موسیقی"
              : "پخش موسیقی"
          }
        >
          {isMusicPlaying ? "🎵" : "🔇"}
        </button>

        <button
          className="theme-btn"
          onClick={onThemeToggle}
          title={isDark ? "حالت روشن" : "حالت تاریک"}
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        <button
          className="cart-btn"
          onClick={onCartClick}
          title="سبد خرید"
        >
          🛒
          <span>{cartCount}</span>
        </button>

        {user ? (
          <>
            <span className="user-name">
              👤 {user.name}
            </span>

            <button
              className="login-btn"
              onClick={onLogout}
            >
              خروج
            </button>
          </>
        ) : (
          <button
            className="login-btn"
            onClick={onLoginClick}
          >
            ورود
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;