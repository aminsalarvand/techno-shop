import { useState } from "react";

function LoginModal({ onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (isRegister && password !== confirmPassword) {
      setMessage("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    setLoading(true);

    try {
      const url = isRegister
        ? `${window.API_URL}/api/auth/register`
        : `${window.API_URL}/api/auth/login`;

      const body = isRegister
        ? {
            name,
            email,
            password,
          }
        : {
            email,
            password,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      console.log("User:", data);

      if (isRegister) {
        setMessage("ثبت‌نام با موفقیت انجام شد. 🎉");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(`خوش آمدی ${data.name} 👋`);
          onLogin(data);
        setPassword("");
      }
    } catch (error) {
      console.error(error);

      setMessage(
        isRegister
          ? "ثبت‌نام انجام نشد. ممکن است این ایمیل قبلاً ثبت شده باشد."
          : "ایمیل یا رمز عبور اشتباه است."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-close" onClick={onClose}>
          ×
        </button>

        <div className="login-logo">
          TECH<span>SHOP</span>
        </div>

        <h2>{isRegister ? "ساخت حساب کاربری" : "ورود به حساب"}</h2>

        <p>
          {isRegister
            ? "برای ساخت حساب اطلاعات خود را وارد کنید."
            : "برای ادامه وارد حساب کاربری خود شوید."}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <input
              type="password"
              placeholder="تکرار رمز عبور"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          {message && <p className="auth-message">{message}</p>}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? "لطفاً صبر کنید..."
              : isRegister
              ? "ثبت‌نام"
              : "ورود"}
          </button>
        </form>

        <div className="register-text">
          {isRegister ? "قبلاً حساب ساخته‌اید؟" : "حساب کاربری ندارید؟"}

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage("");
            }}
          >
            {isRegister ? "ورود" : "ثبت‌نام"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;