import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, EncryptBadge, calls, contacts } from "./shared";

export function CallsTab() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Звонки</h1>
          <button className="w-8 h-8 rounded-full bg-[hsl(220,12%,14%)] flex items-center justify-center hover:bg-[hsl(220,12%,18%)] transition-colors">
            <Icon name="PhoneCall" size={16} className="text-[#00D4AA]" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {calls.map((call, i) => (
          <div
            key={call.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-[hsl(220,12%,11%)] transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Avatar name={call.name} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm font-medium truncate">{call.name}</span>
                {call.encrypted && <EncryptBadge />}
              </div>
              <div className="flex items-center gap-1.5">
                <Icon
                  name={call.missed ? "PhoneMissed" : call.type === "incoming" ? "PhoneIncoming" : "PhoneOutgoing"}
                  size={13}
                  className={call.missed ? "text-[hsl(0,70%,55%)]" : "text-[#00D4AA]"}
                />
                <span className={`text-xs ${call.missed ? "text-[hsl(0,70%,55%)]" : "text-[hsl(215,10%,45%)]"}`}>
                  {call.time}
                  {call.duration && ` · ${call.duration}`}
                </span>
              </div>
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#00D4AA22] transition-colors">
              <Icon name="Phone" size={17} className="text-[#00D4AA]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VPNTab() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const toggle = () => {
    if (connected) {
      setConnected(false);
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2000);
  };

  const servers = [
    { name: "Нидерланды", flag: "🇳🇱", ping: 24, load: 32 },
    { name: "Германия", flag: "🇩🇪", ping: 31, load: 45 },
    { name: "Финляндия", flag: "🇫🇮", ping: 18, load: 28 },
    { name: "США (Восток)", flag: "🇺🇸", ping: 110, load: 61 },
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-lg font-semibold mb-4">VPN</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
        <div className={`rounded-2xl p-6 flex flex-col items-center mb-6 transition-all duration-500 ${connected ? "vpn-active-glow bg-[#00D4AA0D] border border-[#00D4AA33]" : "bg-[hsl(220,12%,11%)] border border-[hsl(220,12%,18%)]"}`}>
          <div className="relative mb-6">
            {connected && (
              <>
                <div className="absolute inset-0 rounded-full bg-[#00D4AA] opacity-10 animate-pulse-ring" />
                <div className="absolute inset-0 rounded-full bg-[#00D4AA] opacity-5 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
              </>
            )}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${connected ? "bg-[#00D4AA22]" : "bg-[hsl(220,12%,16%)]"}`}>
              {connecting ? (
                <Icon name="RefreshCw" size={28} className="text-[#00D4AA] animate-vpn-spin" />
              ) : (
                <Icon name={connected ? "ShieldCheck" : "ShieldOff"} size={28} className={connected ? "text-[#00D4AA]" : "text-[hsl(215,10%,45%)]"} />
              )}
            </div>
          </div>

          <div className="text-center mb-1">
            <span className={`font-semibold text-lg ${connected ? "text-[#00D4AA]" : "text-[hsl(215,10%,60%)]"}`}>
              {connecting ? "Подключение..." : connected ? "Защищено" : "Не подключено"}
            </span>
          </div>

          {connected && (
            <div className="text-center mb-4 animate-fade-in">
              <span className="text-xs font-mono text-[hsl(215,10%,50%)]">IP: 185.220.101.47</span>
              <br />
              <span className="text-xs text-[#00D4AA] opacity-70">🇳🇱 Нидерланды · 24ms</span>
            </div>
          )}

          <button
            onClick={toggle}
            className={`mt-2 px-8 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              connected
                ? "bg-[hsl(220,12%,16%)] text-[hsl(215,10%,60%)] hover:bg-[hsl(220,12%,20%)]"
                : "bg-[#00D4AA] text-[hsl(220,16%,6%)] hover:bg-[#00BF99]"
            }`}
          >
            {connecting ? "Отмена" : connected ? "Отключить" : "Подключить"}
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-[hsl(215,10%,50%)] uppercase tracking-wider">Серверы</span>
          <span className="text-xs text-[hsl(215,10%,40%)]">{servers.length} локации</span>
        </div>

        <div className="flex flex-col gap-2 pb-4">
          {servers.map((s, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all text-left animate-fade-in ${
                i === 0 && connected
                  ? "bg-[#00D4AA11] border border-[#00D4AA33]"
                  : "bg-[hsl(220,12%,11%)] hover:bg-[hsl(220,12%,14%)] border border-transparent"
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-2xl">{s.flag}</span>
              <div className="flex-1">
                <div className="text-sm font-medium">{s.name}</div>
                <div className="flex gap-3 mt-0.5">
                  <span className="text-[11px] text-[hsl(215,10%,45%)]">Загрузка {s.load}%</span>
                </div>
              </div>
              <span className={`text-xs font-mono ${s.ping < 50 ? "text-[#00D4AA]" : s.ping < 100 ? "text-yellow-400" : "text-red-400"}`}>
                {s.ping}ms
              </span>
              {i === 0 && connected && (
                <Icon name="Check" size={14} className="text-[#00D4AA]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactsTab() {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Контакты</h1>
          <button className="w-8 h-8 rounded-full bg-[hsl(220,12%,14%)] flex items-center justify-center hover:bg-[hsl(220,12%,18%)] transition-colors">
            <Icon name="UserPlus" size={16} className="text-[#00D4AA]" />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215,10%,45%)]" />
          <input
            type="text"
            placeholder="Поиск контактов"
            className="w-full bg-[hsl(220,12%,14%)] rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-[hsl(215,10%,40%)] outline-none focus:ring-1 focus:ring-[#00D4AA33] transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {contacts.map((c, i) => (
          <div
            key={c.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-[hsl(220,12%,11%)] transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Avatar name={c.name} online={c.online} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{c.name}</div>
              <div className={`text-xs mt-0.5 ${c.online ? "text-[#00D4AA]" : "text-[hsl(215,10%,45%)]"}`}>{c.status}</div>
            </div>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#00D4AA22] transition-colors">
                <Icon name="MessageCircle" size={16} className="text-[hsl(215,10%,50%)]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#00D4AA22] transition-colors">
                <Icon name="Phone" size={16} className="text-[hsl(215,10%,50%)]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
