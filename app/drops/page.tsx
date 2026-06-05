"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { COLLECTIONS, getProductsByCollection, type Product } from "@/lib/products";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.slug}`} className="group block bg-[#f7f8f6]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#edf0f1]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute left-4 top-4 border border-[#2d5ca2]/25 bg-[#f7f8f6]/80 px-2 py-1 font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]">
            NFC AUTH
          </div>
          {product.limited && (
            <div className="absolute bottom-4 right-4 bg-[#2d5ca2] px-2 py-1 font-logo text-[10px] uppercase tracking-logo text-[#f6f7f5]">
              {product.limited}
            </div>
          )}
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-logo text-[11px] uppercase tracking-logo text-[#2d5ca2]/50">
                {product.collection} Collection
              </p>
              <h3 className="mt-1 font-display text-2xl font-normal leading-tight text-[#2d5ca2]">
                {product.name}
              </h3>
            </div>
            <p className="font-display text-xl text-[#2d5ca2]">{product.price}</p>
          </div>
          <p className="font-logo text-sm text-[#2d5ca2]/55">{product.type}</p>
          <div className="flex h-11 items-center justify-center border border-[#2d5ca2]/25 font-logo text-xs uppercase tracking-logo text-[#2d5ca2] transition group-hover:bg-[#2d5ca2] group-hover:text-[#f6f7f5]">
            View product
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DropsPage() {
  return (
    <main className="min-h-screen bg-[#f0f2f3]">
      <Header />
      <div className="mx-auto max-w-[1500px] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12 flex flex-col justify-between gap-4 border-b border-[#2d5ca2]/20 pb-8 md:flex-row md:items-end">
          <div>
            <Badge className="border-[#2d5ca2]/30 text-[#2d5ca2]">All drops</Badge>
            <h1 className="mt-4 font-display text-6xl font-normal text-[#2d5ca2] md:text-8xl">
              Post-deploy<span className="block">essentials</span>
            </h1>
          </div>
          <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/50">
            9 pieces / 3 collections
          </p>
        </div>

        {/* Products grouped by collection */}
        {COLLECTIONS.map((col) => {
          const colProducts = getProductsByCollection(col);
          return (
            <div key={col} className="mb-16">
              <div className="mb-6 border-b border-[#2d5ca2]/10 pb-3">
                <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/55">
                  {col} Collection — {colProducts.length} pieces
                </p>
              </div>
              <div className="grid gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15 sm:grid-cols-2 xl:grid-cols-3">
                {colProducts.map((product, i) => (
                  <ProductCard key={product.slug} product={product} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
