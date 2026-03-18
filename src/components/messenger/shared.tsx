import Icon from "@/components/ui/icon";

export type Tab = "chats" | "calls" | "vpn" | "contacts";

export const chats = [
  { id: 1, name: "Алексей Петров", lastMsg: "Документы отправил", time: "14:32", unread: 2, online: true, encrypted: true },
  { id: 2, name: "Рабочая группа", lastMsg: "Встреча в 17:00", time: "13:10", unread: 0, online: false, encrypted: true, isGroup: true },
  { id: 3, name: "Мария Иванова", lastMsg: "Окей, договорились 👌", time: "11:55", unread: 0, online: true, encrypted: true },
  { id: 4, name: "Сергей Кузнецов", lastMsg: "Позвони когда сможешь", time: "вчера", unread: 5, online: false, encrypted: true },
  { id: 5, name: "Анна Смирнова", lastMsg: "Спасибо за помощь!", time: "вчера", unread: 0, online: false, encrypted: true },
];

export const messages = [
  { id: 1, text: "Привет! Как дела с проектом?", out: false, time: "14:20", status: "read" },
  { id: 2, text: "Всё идёт по плану. Документы почти готовы.", out: true, time: "14:22", status: "read" },
  { id: 3, text: "Когда ждать финальную версию?", out: false, time: "14:25", status: "read" },
  { id: 4, text: "Завтра пришлю до обеда. Осталось согласовать пару деталей.", out: true, time: "14:28", status: "read" },
  { id: 5, text: "Документы отправил", out: false, time: "14:32", status: "delivered" },
];

export const calls = [
  { id: 1, name: "Алексей Петров", type: "incoming", missed: false, time: "сегодня 14:10", duration: "5:32", encrypted: true },
  { id: 2, name: "Мария Иванова", type: "outgoing", missed: false, time: "сегодня 11:30", duration: "2:15", encrypted: true },
  { id: 3, name: "Сергей Кузнецов", type: "incoming", missed: true, time: "вчера 19:45", duration: "", encrypted: true },
  { id: 4, name: "Рабочая группа", type: "incoming", missed: false, time: "вчера 16:00", duration: "22:10", encrypted: true, isGroup: true },
  { id: 5, name: "Анна Смирнова", type: "outgoing", missed: false, time: "2 дня назад", duration: "8:45", encrypted: true },
];

export const contacts = [
  { id: 1, name: "Алексей Петров", status: "Онлайн", online: true },
  { id: 2, name: "Анна Смирнова", status: "Была 2ч назад", online: false },
  { id: 3, name: "Дмитрий Волков", status: "Онлайн", online: true },
  { id: 4, name: "Мария Иванова", status: "Онлайн", online: true },
  { id: 5, name: "Николай Фёдоров", status: "Был вчера", online: false },
  { id: 6, name: "Сергей Кузнецов", status: "Был 5ч назад", online: false },
];

export function Avatar({ name, size = "md", online }: { name: string; size?: "sm" | "md" | "lg"; online?: boolean }) {
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

export function EncryptBadge() {
  return (
    <span className="flex items-center gap-0.5 text-[10px] text-[#00D4AA] font-mono opacity-70">
      <Icon name="Lock" size={9} />
      E2E
    </span>
  );
}
