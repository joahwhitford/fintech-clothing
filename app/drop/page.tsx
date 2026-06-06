"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Header } from "@/components/header";
import { useCart } from "@/lib/cart-context";

const hwbtVariants = [
  { id: 1, image: "/drop-hwbt-1.png", label: "I" },
  { id: 2, image: "/drop-hwbt-2.png", label: "II" },
  { id: 3, image: "/drop-hwbt-3.png", label: "III" },
  { id: 4, image: "/drop-hwbt-4.png", label: "IV" },
];

const singles = [
  {
    slug: "dont-fuck-it-up",
    name: "Don't Fuck It Up",
    price: "$158",
    priceNum: 158,
    image: "/drop-dfiu.png",
    description: "One rule. No exceptions. 420gsm washed black heavyweight tee.",
    index: 0,
  },
  {
    slug: "never-give-up",
    name: "Don't Give Up",
    price: "$148",
    priceNum: 148,
    image: "/drop-ngu.png",
    description: "The only thing between you and the outcome. Garment-dyed, pre-shrunk, built to last.",
    index: 1,
  },
  {
    slug: "long-term-vision",
    name: "Long Term Vision",
    price: "$168",
    priceNum: 168,
    image: "/drop-ltv.png",
    description: "Everyone's optimizing for the quarter. You're building for the decade. Washed black boxy tee.",
    index: 2,
  },
  {
    slug: "great-things",
    name: "Great Things Don't Come Overnight",
    price: "$178",
    priceNum: 178,
    image: "/drop-gtco.png",
    description: "Patience is the edge nobody talks about. Italian fleece heavyweight tee.",
    index: 3,
  },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

function AddToCartModal({
  item,
  onClose,
}: {
  item: (typeof singles)[0] | { slug: string; name: string; price: string; priceNum: number; image: string; description: string };
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handle = () => {
    if (!selected) return;
    addItem({ slug: item.slug, name: item.name, price: item.priceNum, image: item.image, size: selected, quantity: 1 });
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md border border-[#2d5ca2]/20 bg-[#f0f2f3] p-6 sm:rounded-none"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="font-display text-2xl text-[#2d5ca2]">{item.name}</p>
            <p className="font-display text-xl text-[#2d5ca2]/60">{item.price}</p>
          </div>
          <button onClick={onClose} className="text-[#2d5ca2]/40 hover:text-[#2d5ca2]"><X className="h-5 w-5" /></button>
        </div>
        <p className="mb-5 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/45">Select size</p>
        <div className="mb-6 grid grid-cols-6 gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelected(s)}
              className={`h-10 border font-logo text-xs uppercase tracking-logo transition ${
                selected === s ? "border-[#2d5ca2] bg-[#2d5ca2] text-[#f6f7f5]" : "border-[#2d5ca2]/25 text-[#2d5ca2]/65 hover:border-[#2d5ca2]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={handle}
          disabled={!selected}
          className={`h-12 w-full font-logo text-xs uppercase tracking-logo transition ${
            added ? "bg-green-700 text-white" : selected ? "bg-[#2d5ca2] text-[#f6f7f5] hover:bg-[#254f91]" : "bg-[#2d5ca2]/30 text-[#f6f7f5]/50 cursor-not-allowed"
          }`}
        >
          {added ? "Added ✓" : selected ? "Add to bag" : "Select a size"}
        </button>
      </motion.div>
    </motion.div>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={ref} className="relative flex h-screen items-center justify-center overflow-hidden bg-[#0a0f1a]">
      <motion.div style={{ y, opacity }} className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.22em" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6 font-logo text-xs uppercase tracking-[0.22em] text-[#f6f7f5]/40"
        >
          FinTech Clothing — Exclusive Drop
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-display text-[clamp(4rem,14vw,14rem)] font-normal leading-[0.85] text-[#f6f7f5]"
        >
          Hard Work
          <span className="block text-[#f6f7f5]/25">Beats Talent.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/35"
        >
          5 designs. Limited quantities. No restocks.
        </motion.p>
      </motion.div>
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(45,92,162,0.15)_0%,_transparent_70%)]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/25"
        >
          Scroll
        </motion.div>
      </motion.div>
    </div>
  );
}

function HWBTSection({ onAdd }: { onAdd: (item: { slug: string; name: string; price: string; priceNum: number; image: string; description: string }) => void }) {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-[#0a0f1a] pb-2">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-baseline justify-between border-b border-[#f6f7f5]/10 pb-4"
        >
          <h2 className="font-display text-5xl text-[#f6f7f5] md:text-7xl">HWBT</h2>
          <span className="font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/35">4 colorways — $168</span>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Main image */}
          <div className="relative overflow-hidden bg-[#111827]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={hwbtVariants[active].image}
                alt={`HWBT ${hwbtVariants[active].label}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full object-cover"
                style={{ minHeight: "520px" }}
              />
            </AnimatePresence>
            <div className="absolute left-4 top-4 border border-[#f6f7f5]/20 bg-black/40 px-2 py-1 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/70">
              HWBT {hwbtVariants[active].label}
            </div>
          </div>

          {/* Variant picker + info */}
          <div className="flex flex-col justify-between gap-6 py-4">
            <div>
              <p className="font-display text-4xl text-[#f6f7f5]">Hard Work<br />Beats Talent.</p>
              <p className="mt-4 font-logo text-sm leading-6 text-[#f6f7f5]/45">
                The only edge that compounds with time. 420gsm washed heavyweight tee in 4 colorways. Pick yours.
              </p>
            </div>

            {/* Colorway thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {hwbtVariants.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActive(i)}
                  className={`relative overflow-hidden border transition ${active === i ? "border-[#f6f7f5]/60" : "border-[#f6f7f5]/10 opacity-50 hover:opacity-80"}`}
                >
                  <img src={v.image} alt={`Colorway ${v.label}`} className="aspect-square w-full object-cover" />
                  <div className="absolute bottom-1 left-1 font-logo text-[8px] uppercase tracking-logo text-[#f6f7f5]/70">{v.label}</div>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between border-t border-[#f6f7f5]/10 pt-4">
                <span className="font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/40">Price</span>
                <span className="font-display text-2xl text-[#f6f7f5]">$168</span>
              </div>
              <button
                onClick={() => onAdd({
                  slug: `hwbt-${hwbtVariants[active].label.toLowerCase()}`,
                  name: `HWBT ${hwbtVariants[active].label}`,
                  price: "$168",
                  priceNum: 168,
                  image: hwbtVariants[active].image,
                  description: "Hard Work Beats Talent.",
                })}
                className="flex h-12 w-full items-center justify-center gap-2 bg-[#f6f7f5] font-logo text-xs uppercase tracking-logo text-[#0a0f1a] transition hover:bg-[#d8e1ec]"
              >
                Add to bag <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SinglesSection({ onAdd }: { onAdd: (item: typeof singles[0]) => void }) {
  return (
    <div className="bg-[#f0f2f3]">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 border-b border-[#2d5ca2]/20 pb-6"
        >
          <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/50">Also dropping</p>
          <h2 className="mt-2 font-display text-5xl text-[#2d5ca2] md:text-7xl">The Mindset<br />Series</h2>
        </motion.div>

        {/* Staggered layout */}
        <div className="space-y-2">
          {singles.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group grid gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15 ${
                i % 2 === 0 ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1fr_1fr]"
              }`}
            >
              {/* Image — alternating sides */}
              <div className={`relative overflow-hidden bg-[#edf0f1] ${i % 2 !== 0 ? "lg:order-last" : ""}`}>
                <motion.img
                  src={item.image}
                  alt={item.name}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full object-cover"
                  style={{ minHeight: "420px" }}
                />
                <div className="absolute left-4 top-4 border border-[#2d5ca2]/25 bg-[#f7f8f6]/80 px-2 py-1 font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]">
                  NFC AUTH
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between bg-[#f7f8f6] p-8 md:p-12">
                <div>
                  <p className="font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/40">
                    Exclusive drop — {String(i + 1).padStart(2, "0")} / {String(singles.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.9] text-[#2d5ca2]">
                    {item.name}
                  </h3>
                  <p className="mt-6 max-w-sm font-logo text-sm leading-6 text-[#2d5ca2]/60">
                    {item.description}
                  </p>
                </div>

                <div className="mt-10 space-y-4">
                  <div className="flex items-center justify-between border-t border-[#2d5ca2]/15 pt-5">
                    <span className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/45">Price</span>
                    <span className="font-display text-3xl text-[#2d5ca2]">{item.price}</span>
                  </div>
                  <button
                    onClick={() => onAdd(item)}
                    className="flex h-12 w-full items-center justify-center gap-2 bg-[#2d5ca2] font-logo text-xs uppercase tracking-logo text-[#f6f7f5] transition hover:bg-[#254f91]"
                  >
                    Add to bag <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DropPage() {
  const [modal, setModal] = useState<null | {
    slug: string; name: string; price: string; priceNum: number; image: string; description: string;
  }>(null);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24">
        <HeroSection />
        <HWBTSection onAdd={setModal} />
        <SinglesSection onAdd={setModal} />

        {/* Footer strip */}
        <div className="bg-[#0a0f1a] py-8 text-center">
          <p className="font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/25">
            FinTech Clothing™ — Exclusive Drop — Limited quantities — No restocks
          </p>
        </div>
      </div>

      <AnimatePresence>
        {modal && <AddToCartModal item={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </main>
  );
}
