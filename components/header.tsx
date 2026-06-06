"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/drop", label: "Drop" },
  { href: "/collections", label: "Collections" },
  { href: "/team", label: "Team" },
  { href: "/editorial", label: "Editorial" },
];

export function Header() {
  const { count, openCart } = useCart();
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#2d5ca2]/15 bg-[#f0f2f3]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="block h-[72px] w-[146px] shrink-0"
          aria-label="FinTech Clothing home"
        >
          <img
            src="/fintech_clothing_logo_v2.png"
            alt="FinTech Clothing"
            width="292"
            height="144"
            className="brand-logo h-full w-full object-contain"
          />
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-8 font-logo text-xs uppercase tracking-logo md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition",
                pathname === href
                  ? "text-[#2d5ca2]"
                  : "text-[#2d5ca2]/55 hover:text-[#2d5ca2]"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 text-[#2d5ca2]">
          <Button size="icon" variant="ghost" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <button
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-[#2d5ca2]/8"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2d5ca2] font-logo text-[9px] text-[#f6f7f5]">
                {count}
              </span>
            )}
          </button>
          <Button size="icon" variant="ghost" className="md:hidden" aria-label="Menu">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
