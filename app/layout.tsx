import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { PasswordGate } from "@/components/password-gate";

export const metadata: Metadata = {
  title: "FinTech Clothing™",
  description:
    "Premium startup streetwear for AI operators, finance founders, and post-deploy nightlife.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <PasswordGate>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </PasswordGate>
      </body>
    </html>
  );
}
