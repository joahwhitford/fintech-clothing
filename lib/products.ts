export type Product = {
  slug: string
  name: string
  collection: "AI" | "Football" | "Music" | "Movies"
  price: string
  priceNum: number
  tagline: string
  description: string
  image: string
  type: string
  sizes: string[]
  limited?: string
}

export const products: Product[] = [
  // AI Collection
  {
    slug: "hangover-tee",
    name: "Hangover Tee",
    collection: "AI",
    price: "$79",
    priceNum: 79,
    tagline: "Claude generated this hangover",
    description:
      "Washed black heavyweight tee. 420gsm. Because the model told you one more drink was statistically optimal.",
    image: "/ai-1.png",
    type: "Washed black heavyweight tee",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "coworker-tee",
    name: "Co-Worker Tee",
    collection: "AI",
    price: "$79",
    priceNum: 79,
    tagline: "My co-worker is an agent",
    description:
      "Boxy washed black tee for teams where the headcount includes non-humans. 380gsm garment-washed cotton.",
    image: "/ai-2.png",
    type: "Boxy washed black oversized tee",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "in-agents-we-trust",
    name: "In Agents We Trust",
    collection: "AI",
    price: "$79",
    priceNum: 79,
    tagline: "In agents we trust",
    description:
      "For the operators who handed off their calendar, their inbox, and their judgment. 420gsm garment-dyed.",
    image: "/ai-3.png",
    type: "Garment-dyed black tee",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  // Football Collection
  {
    slug: "psg-x-ftc",
    name: "PSG x FTC",
    collection: "Football",
    price: "$79",
    priceNum: 79,
    tagline: "PSG x Fintech Collective",
    description:
      "The collab nobody asked for but everyone needed. Italian merino blend. Cut for founders who treat Sunday like an operating system.",
    image: "/football-1.png",
    type: "Italian merino blend knit",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    limited: "Limited 300",
  },
  {
    slug: "let-it-work-out",
    name: "Let It Work Out",
    collection: "Football",
    price: "$79",
    priceNum: 79,
    tagline: "Let it all work out",
    description:
      "For the founders who sent the term sheet and went to the gym. Premium fleece, terrace proportions. 500gsm loopback.",
    image: "/football-2.png",
    type: "Heavyweight loopback fleece crewneck",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "agent-predicted-it",
    name: "Agent Predicted It",
    collection: "Football",
    price: "$79",
    priceNum: 79,
    tagline: "My agent predicted it",
    description:
      "When the model called it and you still didn't believe it. Heavy boxy tee with clean terrace proportions.",
    image: "/football-3.png",
    type: "Oversized heavyweight tee",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "fireworks-hat",
    name: "Fireworks Hat",
    collection: "Football",
    price: "$29",
    priceNum:  29,
    tagline: "Fireworks",
    description:
      "The hat you wear when the deal closes and the final whistle goes at the same time. Structured 6-panel, embroidered logo, adjustable strap.",
    image: "/football-4.png",
    type: "Structured 6-panel cap",
    sizes: ["One Size"],
  },
  // Music Collection
  {
    slug: "another-one-raises-funds",
    name: "Another One Raises Funds",
    collection: "Music",
    price: "$79",
    priceNum: 79,
    tagline: "Another one raises funds",
    description:
      "DJ Khaled understood the assignment. Garment-washed black tee for the operators dropping rounds like hits.",
    image: "/music-1.png",
    type: "Garment-washed black tee",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "fund-me-maybe",
    name: "Fund Me Maybe",
    collection: "Music",
    price: "$79",
    priceNum: 79,
    tagline: "Fund me maybe",
    description:
      "Hey, I just met you. And this is crazy. But here's my deck — fund me maybe. Italian fleece crewneck.",
    image: "/music-2.png",
    type: "Italian fleece crewneck",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "sweet-vc-of-mine",
    name: "Sweet VC of Mine",
    collection: "Music",
    price: "$79",
    priceNum: 79,
    tagline: "Sweet VC of mine",
    description:
      "Where do we go now? To the cap table. Luxury heavyweight hoodie. 560gsm. No venue logos. Just the weight.",
    image: "/music-3.png",
    type: "Heavyweight 560gsm hoodie",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    limited: "Limited 200",
  },
  // Movies Collection
  {
    slug: "american-founder",
    name: "American Founder",
    collection: "Movies",
    price: "$79",
    priceNum: 79,
    tagline: "American Founder",
    description:
      "For the ones who watched The Social Network and took notes. Heavyweight washed tee, zero startup softness.",
    image: "/movies-1.png",
    type: "Garment-washed heavyweight tee",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "harry-pitcher",
    name: "Harry Pitcher",
    collection: "Movies",
    price: "$79",
    priceNum: 79,
    tagline: "Harry Pitcher",
    description:
      "You're a founder, Harry. 420gsm washed cotton for the chosen ones who raise their Series A before 30.",
    image: "/movies-2.png",
    type: "Washed black boxy tee",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "happy-feet",
    name: "Happy Feet",
    collection: "Movies",
    price: "$79",
    priceNum: 79,
    tagline: "Happy Feet",
    description:
      "When the wire hits and your feet can't stop moving. Garment-dyed, pre-shrunk, structurally sound.",
    image: "/movies-3.png",
    type: "Garment-dyed oversized tee",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "manhattan-emperor",
    name: "Manhattan Emperor",
    collection: "Movies",
    price: "$79",
    priceNum: 79,
    tagline: "Manhattan Emperor",
    description:
      "The city is the empire. Italian fleece crewneck for downtown operators who run their block like a fund.",
    image: "/movies-4.png",
    type: "Italian fleece crewneck",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    limited: "Limited 150",
  },
]

export const COLLECTIONS = ["AI", "Football", "Music", "Movies"] as const
export type Collection = (typeof COLLECTIONS)[number]

export const collectionMeta: Record<
  Collection,
  { copy: string; stat: string }
> = {
  AI: {
    copy:
      "For model whisperers, prompt floor traders, and people whose calendar is mostly inference.",
    stat: "AGNT +31.4%",
  },
  Football: {
    copy:
      "Luxury terrace silhouettes cut for founders who treat Sunday as an operating system.",
    stat: "FCNY +09.8%",
  },
  Music: {
    copy:
      "Studio-weight essentials for operators who run music like a capital allocation problem.",
    stat: "LBLE +22.1%",
  },
  Movies: {
    copy:
      "Cinematic references, heavyweight cotton. For people who quote films in pitch decks.",
    stat: "FILM +14.6%",
  },
}

export function getProductsByCollection(collection: Collection) {
  return products.filter((p) => p.collection === collection)
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}
