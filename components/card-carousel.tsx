'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardData {
  id: number;
  imgUrl: string;
  content: string;
}

interface CardProps {
  data: CardData[];
  showCarousel?: boolean;
  cardsPerView?: number;
}

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: CardData[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#080f1a]/92 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Image */}
      <motion.div
        key={index}
        className="relative z-10 flex max-h-[90vh] max-w-[90vw] flex-col items-center"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src={images[index].imgUrl}
          alt={images[index].content}
          className="max-h-[80vh] max-w-[80vw] object-contain"
        />
        {images[index].content && images[index].content !== "Coming soon" && (
          <p className="mt-4 font-logo text-[11px] uppercase tracking-logo text-white/40">
            {images[index].content}
          </p>
        )}
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-20 font-logo text-[11px] uppercase tracking-logo text-white/40 transition hover:text-white"
      >
        Close
      </button>

      {/* Arrows — only if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 z-20 -translate-y-1/2 font-logo text-[11px] uppercase tracking-logo text-white/40 transition hover:text-white"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-6 top-1/2 z-20 -translate-y-1/2 font-logo text-[11px] uppercase tracking-logo text-white/40 transition hover:text-white"
          >
            →
          </button>
        </>
      )}

      {/* Index indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-[3px] w-5 transition-all duration-300 ${
                i === index ? "bg-white" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

const CardCarousel = ({ data, showCarousel = true, cardsPerView = 3 }: CardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSingleCard, setIsSingleCard] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSingleCard(data?.length === 1);
  }, [data]);

  const cardWidth = 75 / cardsPerView;

  const nextSlide = () => {
    if (isAnimating || !showCarousel || !data) return;
    if (data.length <= cardsPerView) return;
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % data.length;
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 500ms ease";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = "translateX(0)";
          void containerRef.current.offsetWidth;
          setIsAnimating(false);
        }
      }, 500);
    }
  };

  const prevSlide = () => {
    if (isAnimating || !showCarousel || !data) return;
    if (data.length <= cardsPerView) return;
    setIsAnimating(true);
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    if (containerRef.current) {
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;
      setCurrentIndex(prevIndex);
      void containerRef.current.offsetWidth;
      containerRef.current.style.transition = "transform 500ms ease";
      containerRef.current.style.transform = "translateX(0)";
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const getVisibleCards = () => {
    if (!showCarousel || !data) return data || [];
    const visibleCards = [];
    const totalCards = data.length;
    for (let i = 0; i < cardsPerView + 1; i++) {
      const index = (currentIndex + i) % totalCards;
      visibleCards.push({ ...data[index], _visiblePos: i });
    }
    return visibleCards;
  };

  // Find the real index of a visible card in the original data array
  const getRealIndex = (visiblePos: number) => {
    return (currentIndex + visiblePos) % data.length;
  };

  if (!data || data.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={data}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      <div className="w-full px-4">
        <div className={`relative ${isSingleCard ? 'max-w-sm mx-auto' : 'w-full'}`}>
          {showCarousel && data.length > cardsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#2d5ca2] text-white px-3 py-2 hover:bg-[#1e4080] transition-all duration-300 font-logo text-xs tracking-logo"
                disabled={isAnimating}
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#2d5ca2] text-white px-3 py-2 hover:bg-[#1e4080] transition-all duration-300 font-logo text-xs tracking-logo"
                disabled={isAnimating}
                aria-label="Next slide"
              >
                →
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="flex"
              style={{
                transform: "translateX(0)",
                width: showCarousel ? `${(cardsPerView + 1) * 100 / cardsPerView}%` : '100%'
              }}
            >
              {getVisibleCards().map((card, idx) => {
                const realIndex = getRealIndex((card as any)._visiblePos ?? idx);
                return (
                  <div
                    key={`card-${currentIndex}-${idx}`}
                    style={{
                      width: showCarousel
                        ? `${100 / (cardsPerView + 1)}%`
                        : `${100 / Math.min(cardsPerView, data.length)}%`
                    }}
                    className="px-2"
                  >
                    <div
                      className="group relative overflow-hidden cursor-pointer"
                      onClick={() => setLightboxIndex(realIndex)}
                    >
                      <div className="w-full h-80 overflow-hidden">
                        <img
                          src={card.imgUrl}
                          alt={card.content}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        />
                      </div>
                      {/* Shine sweep on hover */}
                      <div className="pointer-events-none absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;
