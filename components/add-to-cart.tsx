"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function AddToCart({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.priceNum,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-3 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/55">
          Select size
        </p>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "h-11 border font-logo text-xs uppercase tracking-logo transition",
                selectedSize === size
                  ? "border-[#2d5ca2] bg-[#2d5ca2] text-[#f6f7f5]"
                  : "border-[#2d5ca2]/25 text-[#2d5ca2]/70 hover:border-[#2d5ca2] hover:text-[#2d5ca2]"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleAdd}
        disabled={!selectedSize}
        className={cn(
          "h-12 w-full rounded-none font-logo text-xs uppercase tracking-logo transition-colors",
          added
            ? "bg-[#1a6b3a] text-white hover:bg-[#1a6b3a]"
            : "bg-[#2d5ca2] text-[#f6f7f5] hover:bg-[#254f91]",
          !selectedSize && "cursor-not-allowed opacity-50"
        )}
      >
        {added ? "Added to bag ✓" : selectedSize ? "Add to bag" : "Select a size"}
      </Button>

      {product.limited && (
        <p className="font-logo text-[11px] uppercase tracking-logo text-[#2d5ca2]/50">
          {product.limited} — while stocks last
        </p>
      )}
    </div>
  );
}
