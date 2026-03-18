import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "chats" | "calls" | "vpn" | "contacts";

const chats = [
  { id: 1, name: "Алексей Петров", lastMsg: "Документы отправил", time: "14:32", unread: 2, online: true, encrypted: true },
  { id: 2, name: "Рабочая группа", lastMsg: "Встреча в 17:00", time: "13:10", unread: 0, online: false, encrypted: true, isGroup: true },
  { id: 3, name: "Мария Иванова", lastMsg: "Окей, договорились 👌", time: "11:55", unread: 0, online: true, encrypted: true },
  { id: 4, name: "Сергей Кузнецов", lastMsg: "Позвони когда сможешь", time: "вчера", unread: 5, online: false, encrypted: true },
  { id: 5, name: "Анна Смирнова", lastMsg: "Спасибо за помощь!", time: "вчера", unread: 0, online: false, encrypted: true },
];

const messages = [
  { id: 1, text: "Привет! Как дела с проектом?", out: false, time: "14:20", status: "read" },
  { id: 2, text: "Всё идёт по плану. Документы почти готовы.", out: true, time: "14:22", status: "read" },
  { id: 3, text: "Когда ждать финальную версию?", out: false, time: "14:25", status: "read" },
  { id: 4, text: "Завтра пришлю до обеда. Осталось согласовать пару деталей.", out: true, time: "14:28", status: "read" },
  { id: 5, text: "Документы отправил", out: false, time: "14:32", status: "delivered" },
];

const calls = [
  { id: 1, name: "Алексей Петров", type: "incoming", missed: false, time: "сегодня 14:10", duration: "5:32", encrypted: true },
  { id: 2, name: "Мария Иванова", type: "outgoing", missed: false, time: "сегодня 11:30", duration: "2:15", encrypted: true },
  { id: 3, name: "Сергей Кузнецов", type: "incoming", missed: true, time: "вчера 19:45", duration: "", encrypted: true },
  { id: 4, name: "Рабочая группа", type: "incoming", missed: false, time: "вчера 16:00", duration: "22:10", encrypted: true, isGroup: true },
  { id: 5, name: "Анна Смирнова", type: "outgoing", missed: false, time: "2 дня назад", duration: "8:45", encrypted: true },
];

const contacts = [
  { id: 1, name: "Алексей Петров", status: "Онлайн", online: true },
  { id: 2, name: "Анна Смирнова", status: "Была 2ч назад", online: false },
  { id: 3, name: "Дмитрий Волков", status: "Онлайн", online: true },
  { id: 4, name: "Мария Иванова", status: "Онлайн", online: true },
  { id: 5, name: "Николай Фёдоров", status: "Был вчера", online: false },
  { id: 6, name: "Сергей Кузнецов", status: "Был 5ч назад", online: false },
];

function Avatar({ name, size = "md", online }: { name: string; size?: "sm" | "md" | "lg"; online?: boolean }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#00D4AA22", "#4A9EFF22", "#FF6B6B22", "#FFB84422", "#9B59B622"];
  const textColors = ["#00D4AA", "#4A9EFF", "#FF6B6B", "#FFB844", "#9B59B6"];
  const idx = name.charCodeAt(0) % colors.length;
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-12 h-12 text-base" : "w-10 h-10 text-sm";

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center font-semibold`}
        style={{ background: colors[idx], color: textColors[idx] }}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[hsl(220,16%,6%)] ${online ? "bg-[#00D4AA]" : "bg-[hsl(215,10%,35%)]"}`}
        />
      )}
    </div>
  );
}

function EncryptBadge() {
  return (
    <span className="flex items-center gap-0.5 text-[10px] text-[#00D4AA] font-mono opacity-70">
      <Icon name="Lock" size={9} />
      E2E
    </span>
  );
}

function ChatsTab({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Чаты</h1>
          <button className="w-8 h-8 rounded-full bg-[hsl(220,12%,14%)] flex items-center justify-center hover:bg-[hsl(220,12%,18%)] transition-colors">
            <Icon name="PenSquare" size={16} className="text-[#00D4AA]" />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(215,10%,45%)]" />
          <input
            type="text"
            placeholder="Поиск"
            className="w-full bg-[hsl(220,12%,14%)] rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-[hsl(215,10%,40%)] outline-none focus:ring-1 focus:ring-[#00D4AA33] transition-all"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {chats.map((chat, i) => (
          <button
            key={chat.id}
            onClick={onOpen}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[hsl(220,12%,11%)] transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Avatar name={chat.name} online={chat.online} />
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-sm font-medium truncate">{chat.name}</span>
                  {chat.encrypted && <EncryptBadge />}
                </div>
                <span className="text-xs text-[hsl(215,10%,45%)] flex-shrink-0">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-[hsl(215,10%,45%)] truncate">{chat.lastMsg}</span>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#00D4AA] text-[hsl(220,16%,6%)] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatView({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState("");
  const [localMsgs, setLocalMsgs] = useState(messages);

  const send = () => {
    if (!input.trim()) return;
    setLocalMsgs(prev => [...prev, {
      id: Date.now(),
      text: input,
      out: true,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      status: "sent"
    }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full animate-slide-in-right">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[hsl(220,12%,14%)]">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[hsl(220,12%,14%)] transition-colors -ml-1">
          <Icon name="ChevronLeft" size={20} />
        </button>
        <Avatar name="Алексей Петров" online={true} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">Алексей Петров</span>
            <EncryptBadge />
          </div>
          <span className="text-xs text-[#00D4AA]">онлайн</span>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[hsl(220,12%,14%)] transition-colors">
          <Icon name="Phone" size={17} className="text-[#00D4AA]" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[hsl(220,12%,14%)] transition-colors">
          <Icon name="MoreVertical" size={17} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 flex flex-col gap-2">
        <div className="text-center mb-2">
          <span className="text-[10px] font-mono text-[#00D4AA] bg-[#00D4AA11] px-3 py-1 rounded-full">
            🔒 Сквозное шифрование активно
          </span>
        </div>
        {localMsgs.map((msg, i) => (
          <div key={msg.id} className={`flex ${msg.out ? "justify-end" : "justify-start"} animate-fade-in`} style={{ animationDelay: `${i * 30}ms` }}>
            <div
              className={`max-w-[72%] px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.out
                  ? "bg-[#00D4AA1A] text-foreground chat-bubble-out"
                  : "bg-[hsl(220,12%,14%)] chat-bubble-in"
              }`}
            >
              <p>{msg.text}</p>
              <div className={`flex items-center gap-1 mt-1 ${msg.out ? "justify-end" : "justify-start"}`}>
                <span className="text-[10px] text-[hsl(215,10%,45%)]">{msg.time}</span>
                {msg.out && (
                  <Icon
                    name={msg.status === "read" ? "CheckCheck" : "Check"}
                    size={12}
                    className={msg.status === "read" ? "text-[#00D4AA]" : "text-[hsl(215,10%,45%)]"}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-[hsl(220,12%,14%)]">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[hsl(220,12%,14%)] transition-colors flex-shrink-0">
            <Icon name="Paperclip" size={18} className="text-[hsl(215,10%,50%)]" />
          </button>
          <div className="flex-1 bg-[hsl(220,12%,14%)] rounded-2xl flex items-center px-4 py-2.5 gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Сообщение"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[hsl(215,10%,40%)]"
            />
            <button className="hover:opacity-70 transition-opacity">
              <Icon name="Smile" size={18} className="text-[hsl(215,10%,50%)]" />
            </button>
          </div>
          <button
            onClick={send}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#00D4AA] hover:bg-[#00BF99] transition-colors flex-shrink-0"
          >
            <Icon name="Send" size={16} className="text-[hsl(220,16%,6%)]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CallsTab() {
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

function VPNTab() {
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

function ContactsTab() {
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

const navItems: { id: Tab; icon: string; label: string }[] = [
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "vpn", icon: "Shield", label: "VPN" },
  { id: "contacts", icon: "Users", label: "Контакты" },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>("chats");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(220,18%,4%)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm h-[680px] bg-[hsl(220,16%,6%)] rounded-3xl overflow-hidden flex flex-col border border-[hsl(220,12%,16%)] shadow-2xl">
        <div className="flex-1 overflow-hidden relative">
          {chatOpen ? (
            <ChatView onBack={() => setChatOpen(false)} />
          ) : (
            <>
              {tab === "chats" && <ChatsTab onOpen={() => setChatOpen(true)} />}
              {tab === "calls" && <CallsTab />}
              {tab === "vpn" && <VPNTab />}
              {tab === "contacts" && <ContactsTab />}
            </>
          )}
        </div>

        {!chatOpen && (
          <div className="flex items-center border-t border-[hsl(220,12%,14%)] px-2 pb-2 pt-1 bg-[hsl(220,14%,8%)]">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                  tab === item.id ? "text-[#00D4AA]" : "text-[hsl(215,10%,40%)] hover:text-[hsl(215,10%,60%)]"
                }`}
              >
                <div className="relative">
                  <Icon name={item.icon} size={21} />
                  {item.id === "chats" && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#00D4AA] text-[hsl(220,16%,6%)] text-[8px] font-bold flex items-center justify-center">
                      7
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
