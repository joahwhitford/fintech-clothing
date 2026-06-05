"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

const features = ["Cut in NYC", "420 GSM fleece", "Garment washed", "Collective blue"];

const editorials = [
  {
    tag: "Series A/W 26",
    headline: "The downtown operator uniform.",
    body: "Garments for people who closed a round last quarter and are back in the same coffee shop this morning. Dense cotton, sharp proportions, private-market references, and zero startup merch energy.",
    icon: <Bot className="h-8 w-8 text-[#2d5ca2]/65" />,
  },
  {
    tag: "Why we build",
    headline: "Luxury objects for artificial work-life balance.",
    body: "Everything we make starts from the same question: what would you actually want to wear at 2am when the deploy goes through? Not a branded hoodie. Not a startup polo. Something worth keeping.",
    icon: <Sparkles className="h-8 w-8 text-[#2d5ca2]/65" />,
  },
  {
    tag: "The collections",
    headline: "AI. Football. Music. Three verticals, one fabric weight.",
    body: "We didn't set out to make three collections. We just noticed the same people were at the match on Sunday, in the studio on Tuesday, and shipping code at 11pm Thursday. So we made clothes for all three.",
    icon: <Zap className="h-8 w-8 text-[#2d5ca2]/65" />,
  },
];

export default function EditorialPage() {
  const featured = products.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f0f2f3]">
      <Header />
      <div className="mx-auto max-w-[1500px] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-16 border-b border-[#2d5ca2]/20 pb-8">
          <Badge className="border-[#2d5ca2]/30 text-[#2d5ca2]">Editorial</Badge>
          <h1 className="mt-4 font-display text-6xl font-normal text-[#2d5ca2] md:text-8xl">
            Series<span className="block text-[#2d5ca2]/40">A/W 26</span>
          </h1>
        </div>

        {/* Hero editorial block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 grid gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15 lg:grid-cols-[1fr_1fr]"
        >
          <div className="relative min-h-[520px] overflow-hidden bg-[#edf0f1]">
            <img
              src={products[0].image}
              alt="Editorial"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d5ca2]/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]/70">
                Featured
              </p>
              <p className="font-display text-3xl text-[#f6f7f5]">{products[0].name}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between bg-[#f7f8f6] p-8 md:p-10">
            <Bot className="h-9 w-9 text-[#2d5ca2]/65" />
            <div>
              <p className="font-display text-[clamp(3rem,6vw,6rem)] font-normal leading-[0.9] text-[#2d5ca2]">
                Series
                <span className="block text-[#2d5ca2]/40">A/W 26</span>
              </p>
              <p className="mt-6 max-w-sm font-logo text-sm leading-6 text-[#2d5ca2]/62">
                Garments for the downtown operator: dense cotton, sharp proportions,
                private-market references, and no startup merch softness.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Three editorial cards */}
        <div className="mb-4 grid gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15 md:grid-cols-3">
          {editorials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex flex-col justify-between bg-[#f7f8f6] p-7"
            >
              {item.icon}
              <div className="mt-8">
                <p className="mb-3 font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/48">
                  {item.tag}
                </p>
                <h3 className="font-display text-2xl font-normal leading-tight text-[#2d5ca2]">
                  {item.headline}
                </h3>
                <p className="mt-4 font-logo text-sm leading-6 text-[#2d5ca2]/60">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Details grid */}
        <div className="mb-12 grid gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15 sm:grid-cols-2 md:grid-cols-4">
          {features.map((item) => (
            <div key={item} className="bg-[#f7f8f6] p-5 font-logo text-sm uppercase tracking-logo text-[#2d5ca2]/60">
              {item}
            </div>
          ))}
        </div>

        {/* Featured products */}
        <div className="border-t border-[#2d5ca2]/20 pt-12">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-4xl text-[#2d5ca2]">Featured picks</h2>
            <Link
              href="/collections"
              className="flex items-center gap-1 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/55 transition hover:text-[#2d5ca2]"
            >
              All drops <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15 sm:grid-cols-3">
            {featured.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group block bg-[#f7f8f6]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#edf0f1]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="font-display text-xl text-[#2d5ca2]">{product.name}</p>
                    <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/50">{product.collection}</p>
                  </div>
                  <p className="font-display text-lg text-[#2d5ca2]">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 border border-[#2d5ca2]/15 bg-[#2d5ca2] px-8 py-12 text-center text-[#f6f7f5]">
          <p className="font-logo text-xs uppercase tracking-logo text-[#f6f7f5]/65">
            Limited quantities
          </p>
          <h2 className="font-display text-5xl md:text-6xl">
            Enter the cap table
          </h2>
          <p className="max-w-md font-logo text-sm leading-6 text-[#f6f7f5]/65">
            Once a piece is gone, it&apos;s gone. No restocks. No pre-orders. Just the next drop.
          </p>
          <Link href="/collections" className="mt-2">
            <Button className="h-12 rounded-none bg-[#f6f7f5] px-8 font-logo text-xs uppercase tracking-logo text-[#2d5ca2] hover:bg-[#e8eaeb]">
              Shop now <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
