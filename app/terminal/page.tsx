"use client";

import { motion } from "framer-motion";
import { ChartNoAxesCombined } from "lucide-react";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";

const metrics = [
  ["DROP VOL", "12,948", "+22.7%"],
  ["HOODIE FUT", "$248.00", "+4.8%"],
  ["AGENT IDX", "91.40", "+15.1%"],
  ["NYC BETA", "1.34", "+2.6%"],
  ["HAPPY HR", "17:00", "LIVE"],
  ["DEPLOY", "GREEN", "+99.9%"],
];

const tape = [
  "AI COLLECTION — AGNT +31.4%",
  "FOOTBALL COLLECTION — FCNY +09.8%",
  "MUSIC COLLECTION — LBLE +22.1%",
  "HANGOVER TEE — BID $148 / ASK $162",
  "PSG X FTC — LIMITED 300 — SCARCE",
  "SWEET VC OF MINE — HOODIE FUT +8.2%",
  "DEPLOY STATUS — GREEN — 99.9% UPTIME",
];

const feed = [
  { time: "09:34:12", msg: "Large order: Hangover Tee × 4 (size L) — AI Collection" },
  { time: "09:31:08", msg: "PSG x FTC restock confirmed — 47 units remaining" },
  { time: "09:28:55", msg: "Sweet VC of Mine hoodie futures up 8.2% pre-market" },
  { time: "09:22:33", msg: "Co-Worker Tee trending — 3rd most viewed this session" },
  { time: "09:18:41", msg: "Fund Me Maybe crewneck: bid depth institutional" },
  { time: "09:14:09", msg: "Agent Predicted It tee spread tightening — low inventory" },
  { time: "09:09:27", msg: "Music Collection aggregate volume: +22.1% vs prior session" },
];

export default function TerminalPage() {
  return (
    <main className="min-h-screen bg-[#f0f2f3]">
      <Header />
      <div className="mx-auto max-w-[1500px] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-10 border-b border-[#2d5ca2]/20 pb-8">
          <Badge className="border-[#2d5ca2]/30 text-[#2d5ca2]">FTC Terminal</Badge>
          <h1 className="mt-4 font-display text-6xl font-normal text-[#2d5ca2] md:text-8xl">
            Market<span className="block">tape</span>
          </h1>
        </div>

        {/* Scrolling tape */}
        <div className="mb-6 overflow-hidden border border-[#2d5ca2]/20 bg-[#2d5ca2] py-3">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...tape, ...tape].map((item, i) => (
              <span key={i} className="font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/80">
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Main terminal block */}
        <div className="overflow-hidden border border-[#2d5ca2]/25 bg-[#f7f8f6] shadow-luxe scanline">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-[#2d5ca2]/20 px-4 py-3">
            <div className="flex items-center gap-3">
              <ChartNoAxesCombined className="h-4 w-4 text-[#2d5ca2]/70" />
              <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/70">
                FTC terminal / live market data
              </p>
            </div>
            <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/45">
              NY 09:30:00
            </p>
          </div>

          {/* Metrics grid */}
          <div className="grid border-b border-[#2d5ca2]/15 md:grid-cols-6">
            {metrics.map(([label, value, delta]) => (
              <div key={label} className="border-b border-r border-[#2d5ca2]/12 p-5 md:border-b-0">
                <p className="font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/45">
                  {label}
                </p>
                <p className="mt-4 font-display text-3xl font-normal text-[#2d5ca2]">{value}</p>
                <p className={`mt-2 font-logo text-xs ${delta === "LIVE" ? "text-green-600" : "text-[#2d5ca2]/60"}`}>
                  {delta}
                </p>
              </div>
            ))}
          </div>

          {/* Chart + sidebar */}
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-r border-[#2d5ca2]/12 p-6">
              <p className="mb-4 font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/45">
                Drop volume — 12 sessions
              </p>
              <div className="terminal-grid h-48 border border-[#2d5ca2]/18 p-4">
                <div className="flex h-full items-end gap-2">
                  {[42, 58, 36, 72, 64, 88, 54, 96, 76, 112, 84, 126].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="flex-1 bg-[#2d5ca2]"
                      style={{ opacity: 0.2 + i * 0.035 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6">
              <div>
                <Badge className="border-[#2d5ca2]/30 bg-[#edf0f1] text-[#2d5ca2]">
                  Realtime sentiment
                </Badge>
                <h2 className="mt-5 font-display text-4xl font-normal text-[#2d5ca2] md:text-5xl">
                  Bloomberg energy,<br />Soho execution.
                </h2>
              </div>
              <div className="mt-6 space-y-2 font-logo text-sm uppercase tracking-logo text-[#2d5ca2]/60">
                <p>AI collection bid depth: institutional</p>
                <p>Founder fleece spread: tightening</p>
                <p>Match-day knit liquidity: scarce</p>
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div className="border-t border-[#2d5ca2]/15">
            <div className="border-b border-[#2d5ca2]/10 px-4 py-2">
              <p className="font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/45">
                Order flow / live feed
              </p>
            </div>
            {feed.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex gap-6 border-b border-[#2d5ca2]/8 px-4 py-3 last:border-0"
              >
                <span className="shrink-0 font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/40">
                  {row.time}
                </span>
                <span className="font-logo text-xs text-[#2d5ca2]/70">{row.msg}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
