"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PASSWORD = "STAYMAGICAL";
const STORAGE_KEY = "ftc_access";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  useEffect(() => {
    if (unlocked === false) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [unlocked]);

  const attempt = () => {
    if (value.trim().toUpperCase() === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 1200);
    }
  };

  // Still checking storage
  if (unlocked === null) return null;

  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0a0f1a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(45,92,162,0.12)_0%,_transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-10 px-6 text-center"
      >
        {/* Logo / brand */}
        <div>
          <img
            src="/fintech_clothing_logo_v2.png"
            alt="FinTech Clothing"
            className="mx-auto h-16 w-auto opacity-90"
          />
        </div>

        <div>
          <p className="font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">
            Private access
          </p>
          <h1 className="mt-3 font-display text-4xl text-[#f6f7f5] sm:text-5xl">
            Enter password
          </h1>
        </div>

        {/* Input */}
        <div className="w-full max-w-xs">
          <motion.div
            animate={error ? { x: [-8, 8, -6, 6, 0] } : {}}
            transition={{ duration: 0.35 }}
          >
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && attempt()}
              placeholder="••••••••••••"
              className="w-full border border-[#f6f7f5]/15 bg-transparent px-4 py-3 text-center font-logo text-sm uppercase tracking-logo text-[#f6f7f5] placeholder-[#f6f7f5]/20 outline-none transition focus:border-[#f6f7f5]/40"
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 font-logo text-[10px] uppercase tracking-logo text-red-400/70"
              >
                Incorrect password
              </motion.p>
            )}
          </AnimatePresence>

          <button
            onClick={attempt}
            className="mt-4 w-full bg-[#f6f7f5] py-3 font-logo text-xs uppercase tracking-logo text-[#0a0f1a] transition hover:bg-[#d8e1ec]"
          >
            Enter
          </button>
        </div>
      </motion.div>
    </div>
  );
}
