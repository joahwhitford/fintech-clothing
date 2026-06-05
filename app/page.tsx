"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/typewriter";
export default function Home() {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <Header />

      <section className="relative flex flex-1 overflow-hidden pt-24">
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex w-full flex-col justify-center px-4 sm:px-6 lg:w-[55%] lg:px-12 xl:px-20"
        >
          <Badge className="mb-8 w-fit border-[#2d5ca2]/30 bg-[#f7f8f6]/70 text-[#2d5ca2]">
            Series A wardrobe. Public-market attitude.
          </Badge>
          <h1 className="font-display text-[clamp(3rem,7vw,7.5rem)] font-normal leading-[0.88] text-[#2d5ca2]">
            FinTech
            <span className="block">Clothing™</span>
          </h1>
          <p className="mt-8 max-w-md font-logo text-sm leading-6 text-[#2d5ca2]/65">
            Premium streetwear for AI founders, finance operators, and downtown
            teams shipping before last call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collections">
              <Button className="h-12 rounded-none bg-[#2d5ca2] px-8 font-logo text-xs uppercase tracking-logo text-[#f6f7f5] hover:bg-[#254f91]">
                Shop now <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/collections">
              <Button
                variant="outline"
                className="h-12 rounded-none border-[#2d5ca2]/30 bg-transparent px-8 font-logo text-xs uppercase tracking-logo text-[#2d5ca2] hover:bg-[#2d5ca2] hover:text-[#f6f7f5]"
              >
                View collections
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex gap-8 border-t border-[#2d5ca2]/15 pt-8">
            {[
              ["9", "Pieces"],
              ["3", "Collections"],
              ["300", "Ltd. units"],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-3xl text-[#2d5ca2]">{num}</p>
                <p className="mt-1 font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — slogan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="absolute inset-y-0 right-0 hidden w-[48%] cursor-default items-center justify-center border-l border-[#2d5ca2]/15 lg:flex"
        >
          <div className="max-w-lg px-12 font-display text-[clamp(2.2rem,4vw,4.5rem)] font-normal leading-[1.08] text-[#2d5ca2]/30">
            <Typewriter
              text={[
                "Built in Manhattan, by Claude, for Halfwits.",
                "Made for retard-maxers.",
                "Worn only by Guinness drinkers.",
              ]}
              speed={55}
              deleteSpeed={30}
              delay={2200}
              loop
              cursor="|"
              className="block"
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
