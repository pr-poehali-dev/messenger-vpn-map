import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar } from "./shared";

export function IncomingCall({ caller, onAccept, onDecline }: { caller: string; onAccept: () => void; onDecline: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 animate-fade-in"
      style={{ background: "linear-gradient(180deg, hsl(220,22%,8%) 0%, hsl(220,16%,5%) 100%)" }}
    >
      <div className="flex flex-col items-center gap-3 mt-8">
        <span className="text-xs font-mono text-[#00D4AA] tracking-widest uppercase animate-blink">Входящий звонок</span>
        <div className="relative mt-4">
          <div className="absolute inset-0 rounded-full bg-[#00D4AA] opacity-10 animate-pulse-ring" style={{ transform: "scale(1.6)" }} />
          <div className="absolute inset-0 rounded-full bg-[#00D4AA] opacity-6 animate-pulse-ring" style={{ transform: "scale(2.0)", animationDelay: "0.6s" }} />
          <div className="absolute inset-0 rounded-full bg-[#00D4AA] opacity-3 animate-pulse-ring" style={{ transform: "scale(2.4)", animationDelay: "1.2s" }} />
          <Avatar name={caller} size="lg" />
        </div>
        <h2 className="text-2xl font-semibold mt-6">{caller}</h2>
        <div className="flex items-center gap-1.5 text-xs text-[#00D4AA] opacity-70">
          <Icon name="Lock" size={11} />
          <span className="font-mono">Зашифрованный звонок</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-16 w-full">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onDecline}
            className="w-16 h-16 rounded-full bg-[hsl(0,65%,50%)] hover:bg-[hsl(0,65%,45%)] flex items-center justify-center transition-all active:scale-95 shadow-lg"
            style={{ boxShadow: "0 0 20px hsl(0,65%,50%,0.3)" }}
          >
            <Icon name="PhoneOff" size={26} className="text-white" />
          </button>
          <span className="text-xs text-[hsl(215,10%,50%)]">Отклонить</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onAccept}
            className="w-16 h-16 rounded-full bg-[#00D4AA] hover:bg-[#00BF99] flex items-center justify-center transition-all active:scale-95"
            style={{ boxShadow: "0 0 20px #00D4AA44" }}
          >
            <Icon name="Phone" size={26} className="text-[hsl(220,16%,6%)]" />
          </button>
          <span className="text-xs text-[hsl(215,10%,50%)]">Принять</span>
        </div>
      </div>
    </div>
  );
}

export function ActiveCall({ caller, onEnd }: { caller: string; onEnd: () => void }) {
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useState(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  });

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 animate-fade-in"
      style={{ background: "linear-gradient(180deg, hsl(168,30%,8%) 0%, hsl(220,16%,5%) 100%)" }}
    >
      <div className="flex flex-col items-center gap-3 mt-8">
        <span className="text-xs font-mono text-[#00D4AA] tracking-widest uppercase">Активный звонок</span>
        <div className="relative mt-4">
          <Avatar name={caller} size="lg" />
        </div>
        <h2 className="text-2xl font-semibold mt-6">{caller}</h2>
        <span className="text-lg font-mono text-[#00D4AA]">{fmt(seconds)}</span>
        <div className="flex items-center gap-1.5 text-xs text-[#00D4AA] opacity-60">
          <Icon name="Lock" size={11} />
          <span className="font-mono">E2E шифрование</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => setMuted(m => !m)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${muted ? "bg-[#00D4AA22] text-[#00D4AA]" : "bg-[hsl(220,12%,16%)] text-[hsl(215,10%,60%)]"}`}
          >
            <Icon name={muted ? "MicOff" : "Mic"} size={22} />
          </button>
          <button
            onClick={() => setSpeakerOn(s => !s)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${speakerOn ? "bg-[#00D4AA22] text-[#00D4AA]" : "bg-[hsl(220,12%,16%)] text-[hsl(215,10%,60%)]"}`}
          >
            <Icon name={speakerOn ? "Volume2" : "VolumeX"} size={22} />
          </button>
          <button className="w-14 h-14 rounded-full bg-[hsl(220,12%,16%)] text-[hsl(215,10%,60%)] flex items-center justify-center transition-all hover:bg-[hsl(220,12%,20%)]">
            <Icon name="MessageCircle" size={22} />
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onEnd}
            className="w-16 h-16 rounded-full bg-[hsl(0,65%,50%)] hover:bg-[hsl(0,65%,45%)] flex items-center justify-center transition-all active:scale-95"
            style={{ boxShadow: "0 0 20px hsl(0,65%,50%,0.3)" }}
          >
            <Icon name="PhoneOff" size={26} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
