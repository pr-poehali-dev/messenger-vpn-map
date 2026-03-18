import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type Tab } from "@/components/messenger/shared";
import { IncomingCall, ActiveCall } from "@/components/messenger/CallScreens";
import { ChatsTab, ChatView } from "@/components/messenger/ChatScreens";
import { CallsTab, VPNTab, ContactsTab } from "@/components/messenger/OtherTabs";

const navItems: { id: Tab; icon: string; label: string }[] = [
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "vpn", icon: "Shield", label: "VPN" },
  { id: "contacts", icon: "Users", label: "Контакты" },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>("chats");
  const [chatOpen, setChatOpen] = useState(false);
  const [callState, setCallState] = useState<"none" | "incoming" | "active">("none");
  const [callCaller] = useState("Мария Иванова");

  return (
    <div className="min-h-screen bg-[hsl(220,18%,4%)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm h-[680px] bg-[hsl(220,16%,6%)] rounded-3xl overflow-hidden flex flex-col border border-[hsl(220,12%,16%)] shadow-2xl">
        <div className="flex-1 overflow-hidden relative">
          {callState === "incoming" && (
            <IncomingCall
              caller={callCaller}
              onAccept={() => setCallState("active")}
              onDecline={() => setCallState("none")}
            />
          )}
          {callState === "active" && (
            <ActiveCall
              caller={callCaller}
              onEnd={() => setCallState("none")}
            />
          )}
          {callState === "none" && (chatOpen ? (
            <ChatView onBack={() => setChatOpen(false)} />
          ) : (
            <>
              {tab === "chats" && <ChatsTab onOpen={() => setChatOpen(true)} />}
              {tab === "calls" && <CallsTab />}
              {tab === "vpn" && <VPNTab />}
              {tab === "contacts" && <ContactsTab />}
            </>
          ))}
        </div>

        {callState === "none" && !chatOpen && (
          <div className="px-4 py-2 bg-[hsl(220,14%,8%)]">
            <button
              onClick={() => setCallState("incoming")}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#00D4AA11] border border-[#00D4AA22] text-[#00D4AA] text-xs font-medium hover:bg-[#00D4AA1A] transition-colors animate-blink"
            >
              <Icon name="PhoneIncoming" size={13} />
              Симулировать входящий звонок
            </button>
          </div>
        )}

        {callState === "none" && !chatOpen && (
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
