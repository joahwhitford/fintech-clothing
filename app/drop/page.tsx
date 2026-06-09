"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ChevronDown } from "lucide-react";
import { Header } from "@/components/header";
import { useCart } from "@/lib/cart-context";

// ─── Data ──────────────────────────────────────────────────────────────────

const hwbtVariants = [
  { id: 1, image: "/drop-hwbt-1.png", label: "I",   type: "Tee" },
  { id: 2, image: "/drop-hwbt-2.png", label: "II",  type: "Tee" },
  { id: 3, image: "/drop-hwbt-3.png", label: "III", type: "Tee" },
  { id: 4, image: "/drop-hwbt-4.png", label: "IV",  type: "Tee" },
  { id: 5, image: "/drop-hwbt-hat.png", label: "Hat", type: "Hat" },
];

const mindsetSingles = [
  { slug: "dont-fuck-it-up",  name: "Don't Fuck It Up",              teePrice: 89, hatPrice: 29, teeImage: "/drop-dfiu.png",  hatImage: "/drop-dfiu-hat.png",  description: "One rule. No exceptions. 420gsm washed black heavyweight tee." },
  { slug: "never-give-up",    name: "Don't Give Up",                  teePrice: 89, hatPrice: 29, teeImage: "/drop-ngu.png",   hatImage: "/drop-ngu-hat.png",   description: "The only thing between you and the outcome. Garment-dyed, pre-shrunk, built to last." },
  { slug: "long-term-vision", name: "Long Term Vision",               teePrice: 89, hatPrice: 29, teeImage: "/drop-ltv.png",   hatImage: "/drop-ltv-hat.png",   description: "Everyone's optimizing for the quarter. You're building for the decade." },
  { slug: "great-things",     name: "Great Things Don't Come Overnight", teePrice: 89, hatPrice: 29, teeImage: "/drop-gtco.png",  hatImage: "/drop-gtco-hat.png",  description: "Patience is the edge nobody talks about. Italian fleece heavyweight tee." },
];

const summerFinanceDesigns = [
  { id: 1, image: "/TEAM/Suwanee/design-1.png", name: "Summer Finance I" },
  { id: 2, image: "/TEAM/Suwanee/design-2.png", name: "Summer Finance II" },
  { id: 3, image: "/TEAM/Suwanee/design-3.png", name: "Summer Finance III" },
  { id: 4, image: "/TEAM/Suwanee/design-4.png", name: "Summer Finance IV" },
];

const teeSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const hatSizes = ["One Size"];

// ─── Add-to-cart modal ─────────────────────────────────────────────────────

function AddToCartModal({ item, onClose }: {
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
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
                <button key={s} onClick={() => setSelected(s)}
                  className={`h-10 border font-logo text-xs uppercase tracking-logo transition ${selected === s ? "border-[#2d5ca2] bg-[#2d5ca2] text-[#f6f7f5]" : "border-[#2d5ca2]/25 text-[#2d5ca2]/65 hover:border-[#2d5ca2]"}`}>
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
        {item.isHat && <p className="mb-6 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/45">One Size — adjustable strap</p>}
        <button onClick={handle} disabled={!selected}
          className={`h-12 w-full font-logo text-xs uppercase tracking-logo transition ${added ? "bg-green-700 text-white" : selected ? "bg-[#2d5ca2] text-[#f6f7f5] hover:bg-[#254f91]" : "bg-[#2d5ca2]/30 text-[#f6f7f5]/50 cursor-not-allowed"}`}>
          {added ? "Added ✓" : "Add to bag"}
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={ref} className="relative flex h-screen items-center justify-center overflow-hidden bg-[#0a0f1a]">
      <motion.div style={{ y, opacity }} className="relative z-10 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.22em" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6 font-logo text-xs uppercase tracking-[0.22em] text-[#f6f7f5]/40"
        >
          FinTech Clothing — Three Collections
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-display text-[clamp(4rem,14vw,14rem)] font-normal leading-[0.85] text-[#f6f7f5]"
        >
          The Drop
          <span className="block text-[#f6f7f5]/20">001</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/35"
        >
          HWBT · Summer Finance · Rayek — Limited quantities. No restocks.
        </motion.p>
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(45,92,162,0.15)_0%,_transparent_70%)]" />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/25">
          Scroll
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Accordion wrapper ─────────────────────────────────────────────────────

function CollectionRow({ id, name, tag, isOpen, onToggle, children }: {
  id: string; name: string; tag: string;
  isOpen: boolean; onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#f6f7f5]/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-8 text-left sm:px-6 lg:px-8"
      >
        <div className="flex items-baseline gap-6">
          <span className="font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">{id}</span>
          <h2 className="font-display text-4xl text-[#f6f7f5] md:text-6xl">{name}</h2>
          <span className="hidden font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/25 sm:block">{tag}</span>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35 }}>
          <ChevronDown className="h-5 w-5 text-[#f6f7f5]/35" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-14">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mindset single card ───────────────────────────────────────────────────

function MindsetCard({ item, onAdd }: {
  item: typeof mindsetSingles[0];
  onAdd: (item: { slug: string; name: string; price: number; image: string; isHat: boolean }) => void;
}) {
  const [view, setView] = useState<"tee" | "hat">("tee");
  const isTee = view === "tee";
  return (
    <div className="flex flex-col bg-[#0d1525]">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img key={view} src={isTee ? item.teeImage : item.hatImage} alt={item.name}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} className="h-72 w-full object-cover" />
        </AnimatePresence>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-display text-2xl text-[#f6f7f5]">{item.name}</h3>
          <p className="mt-2 font-logo text-xs leading-5 text-[#f6f7f5]/40">{item.description}</p>
          <div className="mt-4 inline-flex overflow-hidden border border-[#f6f7f5]/15">
            {(["tee", "hat"] as const).map((type) => (
              <button key={type} onClick={() => setView(type)}
                className={`px-4 py-1.5 font-logo text-[10px] uppercase tracking-logo transition ${view === type ? "bg-[#f6f7f5] text-[#0a0f1a]" : "text-[#f6f7f5]/40 hover:text-[#f6f7f5]"}`}>
                {type === "tee" ? `Tee $${item.teePrice}` : `Hat $${item.hatPrice}`}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => onAdd({ slug: `${item.slug}-${view}`, name: `${item.name} — ${isTee ? "Tee" : "Hat"}`, price: isTee ? item.teePrice : item.hatPrice, image: isTee ? item.teeImage : item.hatImage, isHat: !isTee })}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 border border-[#f6f7f5]/20 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/60 transition hover:border-[#f6f7f5]/60 hover:text-[#f6f7f5]"
        >
          Add to bag <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

// ─── HWBT collection ───────────────────────────────────────────────────────

function HWBTCollection({ onAdd }: { onAdd: (item: { slug: string; name: string; price: number; image: string; isHat: boolean }) => void }) {
  const [active, setActive] = useState(0);
  const current = hwbtVariants[active];

  return (
    <div className="mx-auto max-w-[1500px] space-y-12 px-4 sm:px-6 lg:px-8">
      {/* Main HWBT picker */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="relative overflow-hidden bg-[#111827]">
          <AnimatePresence mode="wait">
            <motion.img key={active} src={current.image} alt={`HWBT ${current.label}`}
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }} className="h-full w-full object-cover" style={{ minHeight: "520px" }} />
          </AnimatePresence>
          <div className="absolute left-4 top-4 border border-[#f6f7f5]/20 bg-black/40 px-2 py-1 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/70">
            HWBT — {current.type}{current.label !== "Hat" ? ` ${current.label}` : ""}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 py-4">
          <div>
            <p className="font-display text-4xl text-[#f6f7f5]">Hard Work<br />Beats Talent.</p>
            <p className="mt-4 font-logo text-sm leading-6 text-[#f6f7f5]/45">
              The only edge that compounds with time. 4 tee colorways and a matching hat. Pick yours.
            </p>
          </div>
          <div>
            <p className="mb-3 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">Tees</p>
            <div className="mb-4 grid grid-cols-4 gap-2">
              {hwbtVariants.slice(0, 4).map((v, i) => (
                <button key={v.id} onClick={() => setActive(i)}
                  className={`relative overflow-hidden border transition ${active === i ? "border-[#f6f7f5]/60" : "border-[#f6f7f5]/10 opacity-50 hover:opacity-80"}`}>
                  <img src={v.image} alt={`Colorway ${v.label}`} className="aspect-square w-full object-cover" />
                  <div className="absolute bottom-1 left-1 font-logo text-[8px] uppercase tracking-logo text-[#f6f7f5]/70">{v.label}</div>
                </button>
              ))}
            </div>
            <p className="mb-3 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">Hat</p>
            <button onClick={() => setActive(4)}
              className={`relative w-full overflow-hidden border transition ${active === 4 ? "border-[#f6f7f5]/60" : "border-[#f6f7f5]/10 opacity-50 hover:opacity-80"}`}>
              <img src={hwbtVariants[4].image} alt="HWBT Hat" className="h-20 w-full object-cover object-center" />
              <div className="absolute bottom-1 left-2 font-logo text-[8px] uppercase tracking-logo text-[#f6f7f5]/70">Hat — $29</div>
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-t border-[#f6f7f5]/10 pt-4">
              <span className="font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/40">Price</span>
              <span className="font-display text-2xl text-[#f6f7f5]">{current.type === "Hat" ? "$29" : "$89"}</span>
            </div>
            <button
              onClick={() => onAdd({ slug: `hwbt-${current.label.toLowerCase()}`, name: `HWBT ${current.label}`, price: current.type === "Hat" ? 29 : 89, image: current.image, isHat: current.type === "Hat" })}
              className="flex h-12 w-full items-center justify-center gap-2 bg-[#f6f7f5] font-logo text-xs uppercase tracking-logo text-[#0a0f1a] transition hover:bg-[#d8e1ec]"
            >
              Add to bag <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mindset singles */}
      <div>
        <p className="mb-6 border-t border-[#f6f7f5]/10 pt-6 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">
          Also in HWBT — The Mindset Series
        </p>
        <div className="grid gap-px bg-[#f6f7f5]/10 sm:grid-cols-2">
          {mindsetSingles.map((item) => (
            <MindsetCard key={item.slug} item={item} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Summer Finance collection ─────────────────────────────────────────────

function SummerFinanceCollection() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main image */}
        <div className="relative overflow-hidden bg-[#111827]">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={summerFinanceDesigns[active].image}
              alt={summerFinanceDesigns[active].name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full object-cover"
              style={{ minHeight: "520px" }}
            />
          </AnimatePresence>
          <div className="absolute left-4 top-4 border border-[#f6f7f5]/20 bg-black/40 px-2 py-1 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/70">
            Summer Finance — {summerFinanceDesigns[active].name}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col justify-between py-4">
          <div>
            <p className="font-display text-4xl text-[#f6f7f5]">Summer<br />Finance.</p>
            <p className="mt-4 font-logo text-sm leading-6 text-[#f6f7f5]/45">
              The market doesn't take summers off. Neither do you. Four designs. Lightweight, breathable, built for the season.
            </p>
          </div>

          <div>
            <p className="mb-3 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">Designs</p>
            <div className="grid grid-cols-2 gap-2">
              {summerFinanceDesigns.map((d, i) => (
                <button key={d.id} onClick={() => setActive(i)}
                  className={`relative overflow-hidden border transition ${active === i ? "border-[#f6f7f5]/60" : "border-[#f6f7f5]/10 opacity-50 hover:opacity-80"}`}>
                  <img src={d.image} alt={d.name} className="aspect-square w-full object-cover" />
                  <div className="absolute bottom-1 left-1 font-logo text-[8px] uppercase tracking-logo text-[#f6f7f5]/70">{d.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-[#f6f7f5]/10 pt-5">
            <p className="font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">Pricing & availability dropping soon</p>
            <div className="mt-3 flex h-12 w-full items-center justify-center border border-[#f6f7f5]/15 font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/30">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Rayek collection ──────────────────────────────────────────────────────

function RayekCollection() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="relative overflow-hidden bg-[#111827]">
          <img src="/TEAM/Rayek/design-1.png" alt="RAYEK Design"
            className="h-full w-full object-cover" style={{ minHeight: "520px" }} />
          <div className="absolute left-4 top-4 border border-[#f6f7f5]/20 bg-black/40 px-2 py-1 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/70">
            RAYEK — 001
          </div>
        </div>

        <div className="flex flex-col justify-between py-4">
          <div>
            <p className="font-display text-4xl text-[#f6f7f5]">RAYEK.</p>
            <p className="mt-4 font-logo text-sm leading-6 text-[#f6f7f5]/45">
              Collection in progress. More designs incoming. This is just the beginning.
            </p>
          </div>
          <div className="border-t border-[#f6f7f5]/10 pt-5">
            <p className="font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/30">Full collection — Coming Soon</p>
            <div className="mt-3 flex h-12 w-full items-center justify-center border border-[#f6f7f5]/15 font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/30">
              Stay tuned
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function DropPage() {
  const [modal, setModal] = useState<null | { slug: string; name: string; price: number; image: string; isHat: boolean }>(null);
  const [open, setOpen] = useState<string>("HWBT");

  const toggle = (name: string) => setOpen((prev) => (prev === name ? "" : name));

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        <HeroSection />

        {/* Collections */}
        <div className="bg-[#0a0f1a]">
          <div className="mx-auto max-w-[1500px]">
            <div className="border-t border-[#f6f7f5]/10 px-4 pb-2 pt-6 sm:px-6 lg:px-8">
              <p className="font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/25">
                FinTech Clothing — Scroll to explore each collection
              </p>
            </div>
          </div>

          <CollectionRow id="01" name="HWBT" tag="5 designs · Tees + Hat" isOpen={open === "HWBT"} onToggle={() => toggle("HWBT")}>
            <HWBTCollection onAdd={setModal} />
          </CollectionRow>

          <CollectionRow id="02" name="Summer Finance" tag="4 designs · Coming soon" isOpen={open === "Summer Finance"} onToggle={() => toggle("Summer Finance")}>
            <SummerFinanceCollection />
          </CollectionRow>

          <CollectionRow id="03" name="RAYEK" tag="Collection in progress" isOpen={open === "RAYEK"} onToggle={() => toggle("RAYEK")}>
            <RayekCollection />
          </CollectionRow>

          <div className="py-8 text-center">
            <p className="font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/20">
              FinTech Clothing™ — Exclusive Drop 001 — Limited quantities — No restocks
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modal && <AddToCartModal item={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </main>
  );
}
