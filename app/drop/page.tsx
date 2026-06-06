"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Header } from "@/components/header";
import { useCart } from "@/lib/cart-context";

const hwbtVariants = [
  { id: 1, image: "/drop-hwbt-1.png", label: "I", type: "Tee" },
  { id: 2, image: "/drop-hwbt-2.png", label: "II", type: "Tee" },
  { id: 3, image: "/drop-hwbt-3.png", label: "III", type: "Tee" },
  { id: 4, image: "/drop-hwbt-4.png", label: "IV", type: "Tee" },
  { id: 5, image: "/drop-hwbt-hat.png", label: "Hat", type: "Hat" },
];

const singles = [
  {
    slug: "dont-fuck-it-up",
    name: "Don't Fuck It Up",
    teePrice: 89,
    hatPrice: 29,
    teeImage: "/drop-dfiu.png",
    hatImage: "/drop-dfiu-hat.png",
    description: "One rule. No exceptions. 420gsm washed black heavyweight tee.",
    index: 0,
  },
  {
    slug: "never-give-up",
    name: "Don't Give Up",
    teePrice: 89,
    hatPrice: 29,
    teeImage: "/drop-ngu.png",
    hatImage: "/drop-ngu-hat.png",
    description: "The only thing between you and the outcome. Garment-dyed, pre-shrunk, built to last.",
    index: 1,
  },
  {
    slug: "long-term-vision",
    name: "Long Term Vision",
    teePrice: 89,
    hatPrice: 29,
    teeImage: "/drop-ltv.png",
    hatImage: "/drop-ltv-hat.png",
    description: "Everyone's optimizing for the quarter. You're building for the decade. Washed black boxy tee.",
    index: 2,
  },
  {
    slug: "great-things",
    name: "Great Things Don't Come Overnight",
    teePrice: 89,
    hatPrice: 29,
    teeImage: "/drop-gtco.png",
    hatImage: "/drop-gtco-hat.png",
    description: "Patience is the edge nobody talks about. Italian fleece heavyweight tee.",
    index: 3,
  },
];

const teeSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const hatSizes = ["One Size"];

function AddToCartModal({
  item,
  onClose,
}: {
  item: { slug: string; name: string; price: number; image: string; isHat: boolean };
  onClose: () => void;
}) {
  const sizes = item.isHat ? hatSizes : teeSizes;
  const [selected, setSelected] = useState<string>(item.isHat ? "One Size" : "");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handle = () => {
    if (!selected) return;
    addItem({ slug: item.slug, name: item.name, price: item.price, image: item.image, size: selected, quantity: 1 });
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
        className="w-full max-w-md border border-[#2d5ca2]/20 bg-[#f0f2f3] p-6"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="font-display text-2xl text-[#2d5ca2]">{item.name}</p>
            <p className="font-display text-xl text-[#2d5ca2]/60">${item.price}</p>
          </div>
          <button onClick={onClose} className="text-[#2d5ca2]/40 hover:text-[#2d5ca2]"><X className="h-5 w-5" /></button>
        </div>
        {!item.isHat && (
          <>
            <p className="mb-3 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/45">Select size</p>
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
          </>
        )}
        {item.isHat && (
          <p className="mb-6 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/45">One Size — adjustable strap</p>
        )}
        <button
          onClick={handle}
          disabled={!selected}
          className={`h-12 w-full font-logo text-xs uppercase tracking-logo transition ${
            added ? "bg-green-700 text-white" : selected ? "bg-[#2d5ca2] text-[#f6f7f5] hover:bg-[#254f91]" : "bg-[#2d5ca2]/30 text-[#f6f7f5]/50 cursor-not-allowed"
          }`}
        >
          {added ? "Added ✓" : "Add to bag"}
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
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4">
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
          5 designs. Tees + hats. Limited quantities. No restocks.
        </motion.p>
      </motion.div>
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

function HWBTSection({ onAdd }: { onAdd: (item: { slug: string; name: string; price: number; image: string; isHat: boolean }) => void }) {
  const [active, setActive] = useState(0);

  const current = hwbtVariants[active];

  return (
    <div className="bg-[#0a0f1a] pb-2">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-baseline justify-between border-b border-[#f6f7f5]/10 pb-4"
        >
          <h2 className="font-display text-5xl text-[#f6f7f5] md:text-7xl">HWBT</h2>
          <span className="font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/35">
            4 tee colorways + hat — from $29
          </span>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="relative overflow-hidden bg-[#111827]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={current.image}
                alt={`HWBT ${current.label}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full object-cover"
                style={{ minHeight: "520px" }}
              />
            </AnimatePresence>
            <div className="absolute left-4 top-4 border border-[#f6f7f5]/20 bg-black/40 px-2 py-1 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/70">
              HWBT — {current.type} {current.label !== "Hat" ? current.label : ""}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 py-4">
            <div>
              <p className="font-display text-4xl text-[#f6f7f5]">Hard Work<br />Beats Talent.</p>
              <p className="mt-4 font-logo text-sm leading-6 text-[#f6f7f5]/45">
                The only edge that compounds with time. 4 tee colorways and a matching hat. Pick yours.
              </p>
            </div>

            {/* Variant grid — 4 tees + 1 hat */}
            <div>
              <p className="mb-3 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">Tees</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {hwbtVariants.slice(0, 4).map((v, i) => (
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
              <p className="mb-3 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">Hat</p>
              <button
                onClick={() => setActive(4)}
                className={`relative w-full overflow-hidden border transition ${active === 4 ? "border-[#f6f7f5]/60" : "border-[#f6f7f5]/10 opacity-50 hover:opacity-80"}`}
              >
                <img src={hwbtVariants[4].image} alt="HWBT Hat" className="h-20 w-full object-cover object-center" />
                <div className="absolute bottom-1 left-2 font-logo text-[8px] uppercase tracking-logo text-[#f6f7f5]/70">Hat — $29</div>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between border-t border-[#f6f7f5]/10 pt-4">
                <span className="font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/40">Price</span>
                <span className="font-display text-2xl text-[#f6f7f5]">
                  {current.type === "Hat" ? "$29" : "$89"}
                </span>
              </div>
              <button
                onClick={() => onAdd({
                  slug: `hwbt-${current.label.toLowerCase()}`,
                  name: `HWBT ${current.label}`,
                  price: current.type === "Hat" ? 29 : 89,
                  image: current.image,
                  isHat: current.type === "Hat",
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

function SingleCard({ item, onAdd }: {
  item: typeof singles[0];
  onAdd: (item: { slug: string; name: string; price: number; image: string; isHat: boolean }) => void;
}) {
  const [view, setView] = useState<"tee" | "hat">("tee");
  const isTee = view === "tee";
  const image = isTee ? item.teeImage : item.hatImage;
  const price = isTee ? item.teePrice : item.hatPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`group grid gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15 lg:grid-cols-[1fr_1fr]`}
    >
      {/* Image — alternating sides */}
      <div className={`relative overflow-hidden bg-[#edf0f1] ${item.index % 2 !== 0 ? "lg:order-last" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={view}
            src={image}
            alt={item.name}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="h-full w-full object-cover"
            style={{ minHeight: "420px" }}
          />
        </AnimatePresence>
        <div className="absolute left-4 top-4 border border-[#2d5ca2]/25 bg-[#f7f8f6]/80 px-2 py-1 font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]">
          NFC AUTH
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between bg-[#f7f8f6] p-8 md:p-12">
        <div>
          <p className="font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/40">
            Exclusive drop — {String(item.index + 1).padStart(2, "0")} / {String(singles.length).padStart(2, "0")}
          </p>
          <h3 className="mt-4 font-display text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.9] text-[#2d5ca2]">
            {item.name}
          </h3>
          <p className="mt-6 max-w-sm font-logo text-sm leading-6 text-[#2d5ca2]/60">
            {item.description}
          </p>

          {/* Tee / Hat toggle */}
          <div className="mt-8 inline-flex overflow-hidden border border-[#2d5ca2]/20">
            {(["tee", "hat"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setView(type)}
                className={`px-5 py-2 font-logo text-xs uppercase tracking-logo transition ${
                  view === type
                    ? "bg-[#2d5ca2] text-[#f6f7f5]"
                    : "bg-transparent text-[#2d5ca2]/55 hover:text-[#2d5ca2]"
                }`}
              >
                {type === "tee" ? `Tee — $${item.teePrice}` : `Hat — $${item.hatPrice}`}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between border-t border-[#2d5ca2]/15 pt-5">
            <span className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/45">
              {isTee ? "Oversized tee" : "Structured cap — one size"}
            </span>
            <span className="font-display text-3xl text-[#2d5ca2]">${price}</span>
          </div>
          <button
            onClick={() => onAdd({
              slug: `${item.slug}-${view}`,
              name: `${item.name} — ${isTee ? "Tee" : "Hat"}`,
              price,
              image,
              isHat: !isTee,
            })}
            className="flex h-12 w-full items-center justify-center gap-2 bg-[#2d5ca2] font-logo text-xs uppercase tracking-logo text-[#f6f7f5] transition hover:bg-[#254f91]"
          >
            Add to bag <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function DropPage() {
  const [modal, setModal] = useState<null | { slug: string; name: string; price: number; image: string; isHat: boolean }>(null);

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        <HeroSection />
        <HWBTSection onAdd={setModal} />

        {/* Mindset series */}
        <div className="bg-[#f0f2f3]">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 border-b border-[#2d5ca2]/20 pb-6"
            >
              <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/50">Tee + hat for each</p>
              <h2 className="mt-2 font-display text-5xl text-[#2d5ca2] md:text-7xl">The Mindset<br />Series</h2>
            </motion.div>
            <div className="space-y-2">
              {singles.map((item) => (
                <SingleCard key={item.slug} item={item} onAdd={setModal} />
              ))}
            </div>
          </div>
        </div>

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
