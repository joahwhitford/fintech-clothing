"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import CardCarousel from "@/components/card-carousel";

// ─── Placeholder helper ────────────────────────────────────────────────────
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

// ─── Team data ─────────────────────────────────────────────────────────────
// Replace imgUrl values with real paths once images are dropped into /public/TEAM/<NAME>/
const team = [
  {
    id: "01",
    name: "Sienna",
    designs: [
      { id: 1, imgUrl: "/TEAM/SIENNA/ChatGPT%20Image%20Jun%208%2C%202026%20at%2011_11_29%20AM.png", content: "Sienna — Design 1" },
      { id: 2, imgUrl: ph("Sienna", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Sienna", 2), content: "Coming soon" },
    ],
  },
  {
    id: "02",
    name: "Phil",
    designs: [
      { id: 1, imgUrl: ph("Phil", 0), content: "Coming soon" },
      { id: 2, imgUrl: ph("Phil", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Phil", 2), content: "Coming soon" },
    ],
  },
  {
    id: "03",
    name: "Miller",
    designs: [
      { id: 1, imgUrl: ph("Miller", 0), content: "Coming soon" },
      { id: 2, imgUrl: ph("Miller", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Miller", 2), content: "Coming soon" },
    ],
  },
  {
    id: "04",
    name: "Heinboi",
    designs: [
      { id: 1, imgUrl: "/TEAM/Heinboi/ChatGPT%20Image%208%20jun%202026%2C%2011_21_00.png", content: "Heinboi — Design 1" },
      { id: 2, imgUrl: ph("Heinboi", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Heinboi", 2), content: "Coming soon" },
    ],
  },
  {
    id: "05",
    name: "Arman",
    designs: [
      { id: 1, imgUrl: ph("Arman", 0), content: "Coming soon" },
      { id: 2, imgUrl: ph("Arman", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Arman", 2), content: "Coming soon" },
    ],
  },
  {
    id: "06",
    name: "Paloma",
    designs: [
      { id: 1, imgUrl: ph("Paloma", 0), content: "Coming soon" },
      { id: 2, imgUrl: ph("Paloma", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Paloma", 2), content: "Coming soon" },
    ],
  },
  {
    id: "07",
    name: "Joah",
    designs: [
      { id: 1,  imgUrl: "/TEAM/JOAH/DROP/HWBT%201.png",                                  content: "HWBT 1" },
      { id: 2,  imgUrl: "/TEAM/JOAH/DROP/HWBT%202.png",                                  content: "HWBT 2" },
      { id: 3,  imgUrl: "/TEAM/JOAH/DROP/HWBT%203.png",                                  content: "HWBT 3" },
      { id: 4,  imgUrl: "/TEAM/JOAH/DROP/HWBT%204.png",                                  content: "HWBT 4" },
      { id: 5,  imgUrl: "/TEAM/JOAH/DROP/HWBT%20hat.png",                                content: "HWBT Hat" },
      { id: 6,  imgUrl: "/TEAM/JOAH/DROP/Dont%20fuck%20it%20up.png",                     content: "Don't Fuck It Up" },
      { id: 7,  imgUrl: "/TEAM/JOAH/DROP/Dont%20fuck%20it%20up%20hat.png",               content: "Don't Fuck It Up — Hat" },
      { id: 8,  imgUrl: "/TEAM/JOAH/DROP/Great%20Things%20dont%20come%20overnight.png",  content: "Great Things Don't Come Overnight" },
      { id: 9,  imgUrl: "/TEAM/JOAH/DROP/Great%20things%20dont%20come%20overnight%20hat.png", content: "Great Things Don't Come Overnight — Hat" },
      { id: 10, imgUrl: "/TEAM/JOAH/DROP/Long%20term%20vision.png",                      content: "Long Term Vision" },
      { id: 11, imgUrl: "/TEAM/JOAH/DROP/Long%20term%20vision%20hat.png",                content: "Long Term Vision — Hat" },
      { id: 12, imgUrl: "/TEAM/JOAH/DROP/never%20give%20up.png",                         content: "Never Give Up" },
      { id: 13, imgUrl: "/TEAM/JOAH/DROP/Never%20give%20up%20hat.png",                   content: "Never Give Up — Hat" },
      { id: 14, imgUrl: "/TEAM/JOAH/DROP/wolf%20of%20manhattan.png",                     content: "Wolf of Manhattan" },
      { id: 15, imgUrl: "/TEAM/JOAH/Football/PSG%20x%20Fintech%20collective.png",        content: "PSG × FinTech Collective" },
      { id: 16, imgUrl: "/TEAM/JOAH/Football/Let%20it%20all%20work%20out%20tee.png",     content: "Let It All Work Out" },
      { id: 17, imgUrl: "/TEAM/JOAH/Football/My%20agent%20Predicted%20it%20tee.png",     content: "My Agent Predicted It" },
      { id: 18, imgUrl: "/TEAM/JOAH/Movies/American%20Founder.png",                      content: "American Founder" },
      { id: 19, imgUrl: "/TEAM/JOAH/Movies/Harry%20Pitcher.png",                         content: "Harry Pitcher" },
      { id: 20, imgUrl: "/TEAM/JOAH/Movies/Happy%20Feet.png",                            content: "Happy Feet" },
      { id: 21, imgUrl: "/TEAM/JOAH/Movies/Manhattan%20emperor.png",                     content: "Manhattan Emperor" },
      { id: 22, imgUrl: "/TEAM/JOAH/AI/Claude%20generated%20this%20hangover%20tee.png",  content: "Claude Generated This Hangover Tee" },
      { id: 23, imgUrl: "/TEAM/JOAH/AI/In%20agents%20wee%20trust%20tee.png",             content: "In Agents We Trust" },
      { id: 24, imgUrl: "/TEAM/JOAH/AI/My%20coworker%20is%20an%20agent.png",             content: "My Coworker Is an Agent" },
      { id: 25, imgUrl: "/TEAM/JOAH/Music/Another%20One%20Raises%20Funds.png",           content: "Another One Raises Funds" },
      { id: 26, imgUrl: "/TEAM/JOAH/Music/Fund%20me%20maybe.png",                        content: "Fund Me Maybe" },
      { id: 27, imgUrl: "/TEAM/JOAH/Music/sweet%20VC%20Of%20mine.png",                   content: "Sweet VC of Mine" },
    ],
  },
  {
    id: "08",
    name: "Suwanee",
    designs: [
      { id: 1, imgUrl: ph("Suwanee", 0), content: "Coming soon" },
      { id: 2, imgUrl: ph("Suwanee", 1), content: "Coming soon" },
      { id: 3, imgUrl: ph("Suwanee", 2), content: "Coming soon" },
    ],
  },
  {
    id: "09",
    name: "Rayek",
    designs: [
      { id: 1, imgUrl: "/TEAM/Rayek/ChatGPT%20Image%20Jun%204%2C%202026%2C%2004_29_15%20PM.PNG", content: "Rayek — Design 1" },
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

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 border-b border-[#2d5ca2]/20 pb-10"
        >
          <Badge className="border-[#2d5ca2]/30 text-[#2d5ca2]">The designers</Badge>
          <h1 className="mt-4 font-display text-6xl font-normal text-[#2d5ca2] md:text-8xl">
            Who made<span className="block text-[#2d5ca2]/30">the drops</span>
          </h1>
          <p className="mt-6 max-w-xl font-logo text-sm leading-6 text-[#2d5ca2]/55">
            Nine designers. Nine visions. Every piece on this site was conceived, argued
            over, and shipped by the team below. Hover any card to see what it is.
          </p>
        </motion.div>

        {/* Team rows */}
        <div className="divide-y divide-[#2d5ca2]/10 border-t border-[#2d5ca2]/10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * i }}
              className="py-10"
            >
              {/* Row header */}
              <div className="mb-6 flex items-baseline justify-between px-4">
                <div className="flex items-baseline gap-5">
                  <span className="font-logo text-[10px] uppercase tracking-logo text-[#2d5ca2]/35">
                    {member.id}
                  </span>
                  <h2 className="font-display text-4xl font-normal text-[#2d5ca2] sm:text-5xl md:text-6xl">
                    {member.name}
                  </h2>
                </div>
                <span className="hidden font-logo text-[9px] uppercase tracking-logo text-[#2d5ca2]/30 sm:block">
                  {member.designs.length} designs
                </span>
              </div>

              {/* Carousel */}
              <CardCarousel data={member.designs} cardsPerView={3} />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 border border-[#2d5ca2]/12 bg-[#f7f8f6] p-6">
          <p className="font-logo text-[9px] uppercase tracking-logo text-[#2d5ca2]/35">
            * Hover any design card to read its story. Folders are live — new drops appear here as they ship.
          </p>
        </div>

      </div>
    </main>
  );
}
