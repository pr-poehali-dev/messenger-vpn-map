import { useState } from "react";
import Icon from "@/components/ui/icon";

type AuthStep = "splash" | "phone" | "code" | "profile";

const COUNTRY_CODE = "+7";

function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-between px-6 py-10 animate-fade-in">
      <div />

      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl bg-[#00D4AA11] border border-[#00D4AA33] flex items-center justify-center">
            <Icon name="ShieldCheck" size={52} className="text-[#00D4AA]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-xl bg-[hsl(220,14%,8%)] border border-[hsl(220,12%,18%)] flex items-center justify-center">
            <Icon name="Lock" size={16} className="text-[#00D4AA]" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-2">SecureChat</h1>
          <p className="text-sm text-[hsl(215,10%,50%)] leading-relaxed max-w-[220px]">
            Мессенджер со сквозным шифрованием и встроенным VPN
          </p>
        </div>

        <div className="flex flex-col gap-2.5 w-full mt-2">
          {[
            { icon: "Lock", text: "Сквозное E2E шифрование" },
            { icon: "Shield", text: "Встроенный VPN" },
            { icon: "EyeOff", text: "Без слежки и рекламы" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[hsl(220,12%,11%)]">
              <div className="w-7 h-7 rounded-lg bg-[#00D4AA11] flex items-center justify-center flex-shrink-0">
                <Icon name={f.icon} size={14} className="text-[#00D4AA]" />
              </div>
              <span className="text-sm text-[hsl(215,10%,70%)]">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full py-3.5 rounded-2xl bg-[#00D4AA] text-[hsl(220,16%,6%)] font-semibold text-sm hover:bg-[#00BF99] active:scale-[0.98] transition-all"
      >
        Начать
      </button>
    </div>
  );
}

function PhoneScreen({ onNext }: { onNext: (phone: string) => void }) {
  const [phone, setPhone] = useState("");

  const formatted = phone.replace(/\D/g, "").slice(0, 10);
  const display = formatted
    .replace(/(\d{3})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, a, b, c, d) =>
      [a, b, c, d].filter(Boolean).join("-")
    );

  const isReady = formatted.length === 10;

  return (
    <div className="flex flex-col h-full px-6 py-8 animate-slide-in-right">
      <button
        onClick={() => onNext("back")}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[hsl(220,12%,14%)] transition-colors -ml-1 mb-6"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#00D4AA11] border border-[#00D4AA22] flex items-center justify-center mb-5">
            <Icon name="Smartphone" size={26} className="text-[#00D4AA]" />
          </div>
          <h2 className="text-xl font-bold mb-2">Ваш номер</h2>
          <p className="text-sm text-[hsl(215,10%,50%)]">
            Введите номер телефона — пришлём код подтверждения
          </p>
        </div>

        <div className="mb-6">
          <div className="flex gap-3 items-center bg-[hsl(220,12%,11%)] rounded-2xl px-4 py-4 border border-[hsl(220,12%,18%)] focus-within:border-[#00D4AA44] transition-colors">
            <div className="flex items-center gap-2 border-r border-[hsl(220,12%,22%)] pr-3 flex-shrink-0">
              <span className="text-base">🇷🇺</span>
              <span className="text-sm font-mono font-medium">{COUNTRY_CODE}</span>
            </div>
            <input
              type="tel"
              value={display}
              onChange={e => setPhone(e.target.value)}
              placeholder="900-000-00-00"
              className="flex-1 bg-transparent text-sm font-mono outline-none placeholder:text-[hsl(215,10%,35%)]"
              autoFocus
            />
          </div>
          <p className="text-xs text-[hsl(215,10%,40%)] mt-2 px-1">
            Номер используется только для входа
          </p>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => isReady && onNext(COUNTRY_CODE + formatted)}
            className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98] ${
              isReady
                ? "bg-[#00D4AA] text-[hsl(220,16%,6%)] hover:bg-[#00BF99]"
                : "bg-[hsl(220,12%,14%)] text-[hsl(215,10%,40%)] cursor-not-allowed"
            }`}
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
}

function CodeScreen({ phone, onNext, onBack }: { phone: string; onNext: () => void; onBack: () => void }) {
  const [digits, setDigits] = useState(["", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [resent, setResent] = useState(false);

  const update = (i: number, val: string) => {
    const d = [...digits];
    d[i] = val.replace(/\D/g, "").slice(-1);
    setDigits(d);
    setError(false);
    if (val && i < 4) {
      document.getElementById(`code-${i + 1}`)?.focus();
    }
    if (d.every(x => x) && d.join("") === "12345") {
      setTimeout(onNext, 300);
    } else if (d.every(x => x)) {
      setError(true);
      setTimeout(() => {
        setDigits(["", "", "", "", ""]);
        document.getElementById("code-0")?.focus();
      }, 600);
    }
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      document.getElementById(`code-${i - 1}`)?.focus();
    }
  };

  const resend = () => {
    setResent(true);
    setDigits(["", "", "", "", ""]);
    document.getElementById("code-0")?.focus();
  };

  return (
    <div className="flex flex-col h-full px-6 py-8 animate-slide-in-right">
      <button
        onClick={onBack}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[hsl(220,12%,14%)] transition-colors -ml-1 mb-6"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>

      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#00D4AA11] border border-[#00D4AA22] flex items-center justify-center mb-5">
            <Icon name="MessageSquare" size={26} className="text-[#00D4AA]" />
          </div>
          <h2 className="text-xl font-bold mb-2">Код из SMS</h2>
          <p className="text-sm text-[hsl(215,10%,50%)]">
            Отправили на <span className="text-foreground font-medium">{phone}</span>
          </p>
        </div>

        <div className="flex gap-3 justify-center mb-4">
          {digits.map((d, i) => (
            <input
              key={i}
              id={`code-${i}`}
              type="tel"
              value={d}
              maxLength={1}
              onChange={e => update(i, e.target.value)}
              onKeyDown={e => handleKey(i, e)}
              className={`w-12 h-14 text-center text-xl font-mono font-bold rounded-xl border transition-all outline-none ${
                error
                  ? "border-red-500 bg-red-500/10 text-red-400"
                  : d
                  ? "border-[#00D4AA66] bg-[#00D4AA0D] text-[#00D4AA]"
                  : "border-[hsl(220,12%,18%)] bg-[hsl(220,12%,11%)]"
              }`}
              autoFocus={i === 0}
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-xs text-red-400 mb-2 animate-fade-in">Неверный код, попробуй ещё раз</p>
        )}

        <p className="text-center text-xs text-[hsl(215,10%,40%)] mb-2">
          Демо-код: <span className="font-mono text-[#00D4AA]">1-2-3-4-5</span>
        </p>

        <button
          onClick={resend}
          className="text-center text-xs text-[hsl(215,10%,50%)] hover:text-[#00D4AA] transition-colors"
        >
          {resent ? "✓ Отправлено повторно" : "Отправить снова"}
        </button>
      </div>
    </div>
  );
}

function ProfileScreen({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const isReady = name.trim().length >= 2;

  return (
    <div className="flex flex-col h-full px-6 py-8 animate-slide-in-right">
      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#00D4AA11] border border-[#00D4AA22] flex items-center justify-center mb-5">
            <Icon name="UserCheck" size={26} className="text-[#00D4AA]" />
          </div>
          <h2 className="text-xl font-bold mb-2">Ваш профиль</h2>
          <p className="text-sm text-[hsl(215,10%,50%)]">Как вас зовут?</p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <button className="w-20 h-20 rounded-full bg-[hsl(220,12%,14%)] border-2 border-dashed border-[hsl(220,12%,22%)] flex flex-col items-center justify-center hover:border-[#00D4AA44] transition-colors group">
            <Icon name="Camera" size={22} className="text-[hsl(215,10%,45%)] group-hover:text-[#00D4AA] transition-colors" />
            <span className="text-[10px] text-[hsl(215,10%,40%)] mt-1">Фото</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="text-xs text-[hsl(215,10%,50%)] mb-2 block px-1">Имя *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Введите ваше имя"
              className="w-full bg-[hsl(220,12%,11%)] rounded-xl px-4 py-3.5 text-sm outline-none border border-[hsl(220,12%,18%)] focus:border-[#00D4AA44] transition-colors placeholder:text-[hsl(215,10%,35%)]"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs text-[hsl(215,10%,50%)] mb-2 block px-1">Имя пользователя</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(215,10%,45%)] text-sm">@</span>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                placeholder="username"
                className="w-full bg-[hsl(220,12%,11%)] rounded-xl pl-8 pr-4 py-3.5 text-sm outline-none border border-[hsl(220,12%,18%)] focus:border-[#00D4AA44] transition-colors placeholder:text-[hsl(215,10%,35%)] font-mono"
              />
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => isReady && onDone()}
            className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-[0.98] ${
              isReady
                ? "bg-[#00D4AA] text-[hsl(220,16%,6%)] hover:bg-[#00BF99]"
                : "bg-[hsl(220,12%,14%)] text-[hsl(215,10%,40%)] cursor-not-allowed"
            }`}
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}

export function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const [step, setStep] = useState<AuthStep>("splash");
  const [phone, setPhone] = useState("");

  if (step === "splash") return <SplashScreen onStart={() => setStep("phone")} />;
  if (step === "phone") return (
    <PhoneScreen
      onNext={(p) => {
        if (p === "back") { setStep("splash"); return; }
        setPhone(p);
        setStep("code");
      }}
    />
  );
  if (step === "code") return (
    <CodeScreen
      phone={phone}
      onNext={() => setStep("profile")}
      onBack={() => setStep("phone")}
    />
  );
  return <ProfileScreen onDone={onAuth} />;
}
