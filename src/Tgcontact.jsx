import { useState } from "react";

const BOT_TOKEN = "8462371060:AAGvQK0OAgW4kUu-3Uad9A93X9WP6-9AToY";
const CHAT_ID = "7634485019";

export default function TelegramContact() {
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | empty

  const handleSend = async () => {
    if (!message.trim()) {
      setStatus("empty");
      setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    setStatus("loading");

    let handle = sender
      .trim()
      .replace("https://t.me/", "")
      .replace("t.me/", "")
      .replace("@", "")
      .trim();

    const fullText = handle
      ? `📩 Yangi xabar!\n\n👤 Kimdan: @${handle}\n\n💬 Xabar:\n${message.trim()}`
      : `📩 Yangi xabar!\n\n💬 Xabar:\n${message.trim()}`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: fullText,
          }),
        }
      );

      const data = await res.json();

      if (data.ok) {
        setStatus("success");
        setMessage("");
        setSender("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  const isLoading = status === "loading";

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.header}>
          <div style={s.iconWrap}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.05 9.657c-.152.674-.553.837-1.12.52l-3.1-2.285-1.495 1.438c-.165.165-.304.304-.624.304l.223-3.163 5.754-5.197c.25-.223-.054-.347-.388-.124L7.17 14.605l-3.048-.953c-.662-.207-.675-.662.138-.98l11.916-4.593c.55-.2 1.031.133.386.169z" />
            </svg>
          </div>
          <div>
            <div style={s.title}>Menga xabar yuborish</div>
            <div style={s.subtitle}>Telegram orqali bog'laning</div>
          </div>
        </div>

        {/* Sender */}
        <div style={s.field}>
          <label style={s.label}>Sizning Telegram username (ixtiyoriy)</label>
          <input
            style={s.input}
            type="text"
            placeholder="@username"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Message */}
        <div style={s.field}>
          <label style={s.label}>Xabaringiz *</label>
          <textarea
            style={{
              ...s.textarea,
              borderColor: status === "empty" ? "#e53935" : "rgba(0,0,0,0.12)",
            }}
            placeholder="Xabaringizni shu yerga yozing..."
            maxLength={3000}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (status === "empty") setStatus("idle");
            }}
            disabled={isLoading}
          />
          <div style={s.counter}>{message.length} / 3000</div>
        </div>

        {/* Alerts */}
        {status === "empty" && (
          <div style={{ ...s.alert, background: "#fff3f3", color: "#c62828" }}>
            ⚠️ Xabar bo'sh bo'lishi mumkin emas
          </div>
        )}
        {status === "success" && (
          <div style={{ ...s.alert, background: "#f0fff4", color: "#2e7d32" }}>
            ✅ Xabar muvaffaqiyatli yuborildi!
          </div>
        )}
        {status === "error" && (
          <div style={{ ...s.alert, background: "#fff3f3", color: "#c62828" }}>
            ❌ Xatolik yuz berdi. Qaytadan urinib ko'ring.
          </div>
        )}

        {/* Button */}
        <button
          style={{ ...s.btn, opacity: isLoading ? 0.75 : 1 }}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? (
            <span style={{ fontSize: 14 }}>Yuborilmoqda...</span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
              Yuborish
            </>
          )}
        </button>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
    padding: "1rem",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: "2rem",
    width: "100%",
    maxWidth: 460,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: "1.75rem",
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#2AABEE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: "#111",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  field: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: 15,
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 10,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    color: "#111",
    background: "#fafafa",
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    fontSize: 15,
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 10,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    color: "#111",
    background: "#fafafa",
    resize: "vertical",
    minHeight: 130,
    lineHeight: 1.6,
  },
  counter: {
    fontSize: 12,
    color: "#bbb",
    textAlign: "right",
    marginTop: 4,
  },
  alert: {
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: 14,
    marginBottom: "1rem",
    fontWeight: 500,
  },
  btn: {
    width: "100%",
    padding: "13px",
    background: "#2AABEE",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "opacity 0.15s",
  },
};