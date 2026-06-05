import { getProductBySlug, getProductsByCollection, products } from "@/lib/products";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { Header } from "@/components/header";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getProductsByCollection(product.collection).filter(
    (p) => p.slug !== product.slug
  );

  return (
    <main className="min-h-screen bg-[#f0f2f3]">
      <Header />
      <div className="mx-auto max-w-[1500px] px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/collections"
          className="mb-10 inline-flex items-center gap-2 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/50 transition hover:text-[#2d5ca2]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to collections
        </Link>

        {/* Main product */}
        <div className="grid gap-12 lg:grid-cols-[1fr_480px]">
          {/* Image */}
          <div className="overflow-hidden border border-[#2d5ca2]/15 bg-[#edf0f1]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-8">
            <div>
              <Badge className="mb-4 border-[#2d5ca2]/30 text-[#2d5ca2]">
                {product.collection} Collection
              </Badge>
              <h1 className="font-display text-6xl font-normal leading-none text-[#2d5ca2] lg:text-7xl">
                {product.name}
              </h1>
              <p className="mt-4 font-logo text-sm uppercase tracking-logo text-[#2d5ca2]/55">
                {product.tagline}
              </p>
              <p className="mt-3 font-display text-4xl text-[#2d5ca2]">{product.price}</p>
            </div>

            <div className="border-t border-[#2d5ca2]/15 pt-6 space-y-2">
              <p className="font-logo text-sm leading-6 text-[#2d5ca2]/68">
                {product.description}
              </p>
              <p className="font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/42">
                {product.type}
              </p>
            </div>

            <AddToCart product={product} />

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15">
              {[
                ["Material", "420gsm heavyweight cotton"],
                ["Origin", "Cut & sewn in NYC"],
                ["Wash", "Garment washed"],
                ["Fit", "Oversized boxy"],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#f7f8f6] px-4 py-4">
                  <p className="font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/42">
                    {label}
                  </p>
                  <p className="mt-1 font-logo text-xs text-[#2d5ca2]/75">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="mb-8 flex items-end justify-between border-b border-[#2d5ca2]/20 pb-4">
              <h2 className="font-display text-4xl text-[#2d5ca2]">
                More from {product.collection}
              </h2>
              <Link
                href="/collections"
                className="flex items-center gap-1 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/55 transition hover:text-[#2d5ca2]"
              >
                All drops <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-px overflow-hidden border border-[#2d5ca2]/15 bg-[#2d5ca2]/15 sm:grid-cols-2">
              {related.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group block bg-[#f7f8f6]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#edf0f1]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-display text-2xl text-[#2d5ca2]">{p.name}</p>
                      <p className="mt-1 font-logo text-xs uppercase tracking-logo text-[#2d5ca2]/48">{p.type}</p>
                    </div>
                    <p className="font-display text-xl text-[#2d5ca2]">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
