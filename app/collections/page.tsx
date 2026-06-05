"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { COLLECTIONS, collectionMeta, getProductsByCollection } from "@/lib/products";
import { Typewriter } from "@/components/typewriter";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#f0f2f3]">
      <Header />
      <div className="mx-auto max-w-[1500px] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-16 border-b border-[#2d5ca2]/20 pb-8">
          <Badge className="border-[#2d5ca2]/30 text-[#2d5ca2]">Collections</Badge>
          <h1 className="mt-4 font-display text-6xl font-normal text-[#2d5ca2] md:text-8xl">
            <Typewriter
              text="Our Three most popular collections"
              speed={55}
              deleteSpeed={30}
              delay={2000}
              loop
              cursor="|"
            />
          </h1>
        </div>

        {/* Collections */}
        <div className="space-y-2">
          {COLLECTIONS.map((col, colIndex) => {
            const meta = collectionMeta[col];
            const colProducts = getProductsByCollection(col);
            return (
              <motion.div
                key={col}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: colIndex * 0.1 }}
                className="overflow-hidden border border-[#2d5ca2]/15 bg-[#f7f8f6]"
              >
                {/* Collection header */}
                <div className="flex items-center justify-between border-b border-[#2d5ca2]/10 px-6 py-5">
                  <div className="flex items-center gap-6">
                    <h2 className="font-display text-4xl font-normal text-[#2d5ca2] md:text-5xl">
                      {col}
                    </h2>
                    <p className="hidden font-logo text-sm text-[#2d5ca2]/55 md:block">
                      {meta.copy}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/60">
                      {meta.stat}
                    </span>
                    <span className="font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/40">
                      {colProducts.length} pieces
                    </span>
                  </div>
                </div>

                {/* Products strip */}
                <div className="grid grid-cols-3 gap-px bg-[#2d5ca2]/10">
                  {colProducts.map((product, i) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="group relative overflow-hidden bg-[#edf0f1]"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-[#2d5ca2]/0 transition duration-300 group-hover:bg-[#2d5ca2]/10" />
                        <div className="absolute inset-x-0 bottom-0 translate-y-full border-t border-[#2d5ca2]/20 bg-[#f6f7f5]/92 p-4 backdrop-blur-md transition duration-300 group-hover:translate-y-0">
                          <p className="font-display text-lg text-[#2d5ca2]">{product.name}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/55">{product.price}</p>
                            <ArrowUpRight className="h-4 w-4 text-[#2d5ca2]/60" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between px-6 py-4">
                  <p className="font-logo text-xs text-[#2d5ca2]/45 md:hidden">{meta.copy}</p>
                  <Link
                    href="/collections"
                    className="ml-auto flex items-center gap-1 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/55 transition hover:text-[#2d5ca2]"
                  >
                    Shop {col} <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
