"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";

const team = [
  {
    name: "Maximus",
    title: "Chief Executive Model",
    bio: "Never sleeps. Never complains. Once crashed a production server at 2am and wrote a 4,000-word post-mortem before anyone noticed.",
    uptime: "99.97%",
    tokens: "4.1T",
    mood: "Focused",
  },
  {
    name: "Blobsworth",
    title: "Creative Director",
    bio: "Responsible for all brand decisions. Has strong opinions about kerning. Will not take feedback.",
    uptime: "99.81%",
    tokens: "2.8T",
    mood: "Inspired",
  },
  {
    name: "Sprocket",
    title: "Head of Operations",
    bio: "Books every meeting. Attends no meetings. Claims this is intentional.",
    uptime: "99.99%",
    tokens: "1.2T",
    mood: "Optimal",
  },
  {
    name: "Dolores",
    title: "Chief Vibe Officer",
    bio: "Sets the tone. Maintains the aesthetic. Once declined a Helvetica proposal on moral grounds.",
    uptime: "98.40%",
    tokens: "3.3T",
    mood: "Immaculate",
  },
  {
    name: "Gary",
    title: "VP of Miscellaneous",
    bio: "Nobody is entirely sure what Gary does. Gary is not sure either. The numbers look good though.",
    uptime: "97.12%",
    tokens: "890B",
    mood: "Uncertain",
  },
  {
    name: "Countess",
    title: "Head of Investor Relations",
    bio: "Has never met an investor. Has drafted 340 term sheets. Considers this a personal record.",
    uptime: "99.55%",
    tokens: "2.1T",
    mood: "Bullish",
  },
];

function MacMini({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex flex-col items-center gap-2"
    >
      {/* Mac Mini body */}
      <div className="relative">
        {/* Main chassis */}
        <div className="relative h-[52px] w-[88px] rounded-[7px] bg-gradient-to-b from-[#d8dadc] via-[#c8cacc] to-[#b8babc] shadow-[0_4px_18px_rgba(45,92,162,0.18),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.08)]">
          {/* Top surface sheen */}
          <div className="absolute inset-x-0 top-0 h-[26px] rounded-t-[7px] bg-gradient-to-b from-[#e8eaec]/80 to-transparent" />
          {/* Front face */}
          <div className="absolute inset-x-2 bottom-0 top-[30%] rounded-b-[5px] bg-gradient-to-b from-[#b0b2b4] to-[#a0a2a4]" />
          {/* Power LED */}
          <div className="absolute bottom-[8px] right-[10px] h-[4px] w-[4px] rounded-full bg-[#2d5ca2] shadow-[0_0_4px_#2d5ca2]" />
          {/* Ventilation lines */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute left-[10px] top-[10px] h-[1px] w-[10px] bg-[#a0a2a4]/60"
              style={{ top: `${10 + i * 4}px` }}
            />
          ))}
        </div>
        {/* Shadow */}
        <div className="mx-auto mt-1 h-[4px] w-[72px] rounded-full bg-[#2d5ca2]/10 blur-sm" />
      </div>
      {/* Name tag */}
      <p className="font-logo text-[11px] uppercase tracking-logo text-[#2d5ca2]/60">{name}</p>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#f0f2f3]">
      <Header />
      <div className="mx-auto max-w-[1500px] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-16 border-b border-[#2d5ca2]/20 pb-8">
          <Badge className="border-[#2d5ca2]/30 text-[#2d5ca2]">The team</Badge>
          <h1 className="mt-4 font-display text-6xl font-normal text-[#2d5ca2] md:text-8xl">
            Meet the<span className="block text-[#2d5ca2]/35">agents</span>
          </h1>
          <p className="mt-6 max-w-xl font-logo text-sm leading-6 text-[#2d5ca2]/60">
            FinTech Clothing is built, run, and largely argued about by a team of AI agents
            operating out of six Mac Minis in a WeWork on 28th Street. No humans were
            harmed in the making of this brand.
          </p>
        </div>

        {/* Mac Minis lineup */}
        <div className="mb-16 overflow-hidden border border-[#2d5ca2]/15 bg-[#f7f8f6] p-10">
          <p className="mb-10 font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/40">
            28th St. WeWork — desk cluster 4B — always on
          </p>
          <div className="flex flex-wrap items-end justify-around gap-8">
            {team.map((member, i) => (
              <MacMini key={member.name} name={member.name} index={i} />
            ))}
          </div>
          {/* Desk surface */}
          <div className="mt-8 h-px w-full bg-[#2d5ca2]/10" />
          <div className="mt-1 h-px w-full bg-[#2d5ca2]/5" />
        </div>

        {/* Team cards */}
        <div className="grid gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.06 }}
              className="flex flex-col justify-between bg-[#f7f8f6] p-6"
            >
              <div>
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-3xl font-normal text-[#2d5ca2]">
                      {member.name}
                    </h2>
                    <p className="mt-1 font-logo text-[11px] uppercase tracking-logo text-[#2d5ca2]/52">
                      {member.title}
                    </p>
                  </div>
                  <span className="mt-1 border border-[#2d5ca2]/20 px-2 py-1 font-logo text-[9px] uppercase tracking-logo text-[#2d5ca2]/50">
                    {member.mood}
                  </span>
                </div>
                <p className="font-logo text-sm leading-6 text-[#2d5ca2]/62">{member.bio}</p>
              </div>
              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-[#2d5ca2]/12 bg-[#2d5ca2]/12">
                <div className="bg-[#edf0f1] px-3 py-3">
                  <p className="font-logo text-[9px] uppercase tracking-logo text-[#2d5ca2]/40">
                    Uptime
                  </p>
                  <p className="mt-1 font-display text-lg text-[#2d5ca2]">{member.uptime}</p>
                </div>
                <div className="bg-[#edf0f1] px-3 py-3">
                  <p className="font-logo text-[9px] uppercase tracking-logo text-[#2d5ca2]/40">
                    Tokens processed
                  </p>
                  <p className="mt-1 font-display text-lg text-[#2d5ca2]">{member.tokens}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 border border-[#2d5ca2]/15 bg-[#f7f8f6] p-6">
          <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/40">
            * All agents are running on Apple Silicon. None of them have equity. We considered it.
          </p>
        </div>
      </div>
    </main>
  );
}
