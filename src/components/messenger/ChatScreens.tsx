import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, EncryptBadge, chats, messages } from "./shared";

export function ChatsTab({ onOpen }: { onOpen: () => void }) {
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

export function ChatView({ onBack }: { onBack: () => void }) {
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
