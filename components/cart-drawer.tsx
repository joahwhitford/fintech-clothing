"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, count } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-[#2d5ca2]/20 bg-[#f0f2f3] sm:w-[420px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2d5ca2]/15 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-[#2d5ca2]" />
                <span className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]">
                  Bag ({count})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="text-[#2d5ca2]/50 transition hover:text-[#2d5ca2]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="h-10 w-10 text-[#2d5ca2]/20" />
                  <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/45">
                    Your bag is empty
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.slug}-${item.size}`}
                      className="flex gap-4 border border-[#2d5ca2]/15 bg-[#f7f8f6] p-4"
                    >
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-[#edf0f1]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-lg text-[#2d5ca2]">
                              {item.name}
                            </p>
                            <p className="font-logo text-[11px] uppercase tracking-logo text-[#2d5ca2]/55">
                              Size {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.slug, item.size)}
                            className="text-[#2d5ca2]/35 transition hover:text-[#2d5ca2]"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-[#2d5ca2]/20">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.slug,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center text-[#2d5ca2]/55 transition hover:text-[#2d5ca2]"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center font-logo text-xs text-[#2d5ca2]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.slug,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center text-[#2d5ca2]/55 transition hover:text-[#2d5ca2]"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-display text-lg text-[#2d5ca2]">
                            ${item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="space-y-4 border-t border-[#2d5ca2]/15 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/60">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-[#2d5ca2]">
                    ${total}
                  </span>
                </div>
                <Button className="h-12 w-full rounded-none bg-[#2d5ca2] font-logo text-xs uppercase tracking-logo text-[#f6f7f5] hover:bg-[#254f91]">
                  Proceed to checkout
                </Button>
                <p className="text-center font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/38">
                  Shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
