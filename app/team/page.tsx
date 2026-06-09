"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import CardCarousel from "@/components/card-carousel";

function ph(name: string, variant: 0 | 1 | 2 = 0): string {
  const fills = ["#1a3d6e", "#2d5ca2", "#223358"];
  const fill = fills[variant];
  const letter = name[0].toUpperCase();
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="480">` +
      `<rect width="600" height="480" fill="${fill}"/>` +
      `<text x="300" y="220" font-family="Georgia,serif" font-size="180" fill="rgba(255,255,255,0.06)" text-anchor="middle" dominant-baseline="middle">${letter}</text>` +
      `<text x="300" y="330" font-family="Helvetica Neue,sans-serif" font-size="9" fill="rgba(255,255,255,0.22)" text-anchor="middle" letter-spacing="7">COMING SOON</text>` +
      `</svg>`
    )
  );
}

const team = [
  {
    id: "01", name: "Siena",
    designs: [
      { id: 1, imgUrl: "/TEAM/SIENNA/design-1.png", content: "Siena — Design 1" },
      { id: 2, imgUrl: "/TEAM/SIENNA/design-2.png", content: "Siena — Design 2" },
      { id: 3, imgUrl: "/TEAM/SIENNA/design-3.png", content: "Siena — Design 3" },
      { id: 4, imgUrl: "/TEAM/SIENNA/design-4.png", content: "Siena — Design 4" },
    ],
  },
  {
    id: "02", name: "Phil",
    designs: [
      { id: 1, imgUrl: "/TEAM/Phil/design-1.png", content: "Phil — Design 1" },
      { id: 2, imgUrl: ph("Phil", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Phil", 2), content: "Coming soon" },
    ],
  },
  {
    id: "03", name: "Miller",
    designs: [
      { id: 1, imgUrl: ph("Miller", 0), content: "Coming soon" },
      { id: 2, imgUrl: ph("Miller", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Miller", 2), content: "Coming soon" },
    ],
  },
  {
    id: "04", name: "Heinboi",
    designs: [
      { id: 1, imgUrl: "/TEAM/Heinboi/design-2.png", content: "Heinboi — Design 1" },
      { id: 2, imgUrl: ph("Heinboi", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Heinboi", 2), content: "Coming soon" },
    ],
  },
  {
    id: "05", name: "Arman",
    designs: [
      { id: 1, imgUrl: ph("Arman", 0), content: "Coming soon" },
      { id: 2, imgUrl: ph("Arman", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Arman", 2), content: "Coming soon" },
    ],
  },
  {
    id: "06", name: "Paloma",
    designs: [
      { id: 1, imgUrl: "/TEAM/Paloma/design-1.png", content: "Paloma — Design 1" },
      { id: 2, imgUrl: "/TEAM/Paloma/design-2.png", content: "Paloma — Design 2" },
      { id: 3, imgUrl: "/TEAM/Paloma/design-3.png", content: "Paloma — Design 3" },
      { id: 4, imgUrl: "/TEAM/Paloma/design-4.png", content: "Paloma — Design 4" },
      { id: 5, imgUrl: "/TEAM/Paloma/design-5.png", content: "Paloma — Design 5" },
      { id: 6, imgUrl: "/TEAM/Paloma/design-6.png", content: "Paloma — Design 6" },
    ],
  },
  {
    id: "07", name: "Joah",
    designs: [
      { id: 1, imgUrl: ph("Joah", 0), content: "Coming soon" },
      { id: 2, imgUrl: ph("Joah", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Joah", 2), content: "Coming soon" },
    ],
  },
  {
    id: "08", name: "Suwanee",
    designs: [
      { id: 1, imgUrl: "/TEAM/Suwanee/design-1.png", content: "Summer Finance I" },
      { id: 2, imgUrl: "/TEAM/Suwanee/design-2.png", content: "Summer Finance II" },
      { id: 3, imgUrl: "/TEAM/Suwanee/design-3.png", content: "Summer Finance III" },
      { id: 4, imgUrl: "/TEAM/Suwanee/design-4.png", content: "Summer Finance IV" },
    ],
  },
  {
    id: "09", name: "Caroline",
    designs: [
      { id: 1, imgUrl: "/TEAM/Caroline/design-1.jpg", content: "Caroline — Design 1" },
      { id: 2, imgUrl: ph("Caroline", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Caroline", 2), content: "Coming soon" },
    ],
  },
  {
    id: "10", name: "Rayek",
    designs: [
      { id: 1, imgUrl: "/TEAM/Rayek/design-1.png", content: "Rayek — Design 1" },
      { id: 2, imgUrl: ph("Rayek", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Rayek", 2), content: "Coming soon" },
    ],
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#f0f2f3]">
      <Header />

      <div className="mx-auto max-w-[1500px] px-4 pt-32 pb-24 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 border-b border-[#2d5ca2]/20 pb-10"
        >
          <Badge className="border-[#2d5ca2]/30 text-[#2d5ca2]">The designers</Badge>
          <h1 className="mt-4 font-display text-6xl font-normal text-[#2d5ca2] md:text-8xl">
            The Team's<span className="block text-[#2d5ca2]/30">Designs & Collections</span>
          </h1>
        </motion.div>

        <div className="divide-y divide-[#2d5ca2]/10 border-t border-[#2d5ca2]/10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * i }}
              className="py-10"
            >
              <div className="mb-6 flex items-baseline justify-between px-4">
                <div className="flex items-baseline gap-5">
                  <span className="font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/35">
                    {member.id}
                  </span>
                  <h2 className="font-display text-4xl font-normal text-[#2d5ca2] sm:text-5xl md:text-6xl">
                    {member.name}
                  </h2>
                </div>
              </div>
              <CardCarousel data={member.designs} cardsPerView={3} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 border border-[#2d5ca2]/12 bg-[#f7f8f6] p-6">
          <p className="font-logo text-[9px] uppercase tracking-logo text-[#2d5ca2]/35">
            * Designs dropping soon. Check back when the team goes live.
          </p>
        </div>

      </div>
    </main>
  );
}
