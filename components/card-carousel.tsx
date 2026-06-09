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

// ─── Lightbox — fully controlled, no internal index ───────────────────────
function Lightbox({
  images,
  index,
  onPrev,
  onNext,
  onClose,
}: {
  images: CardData[];
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#080f1a]/92 backdrop-blur-sm" onClick={onClose} />

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="relative z-10 flex max-h-[90vh] max-w-[90vw] flex-col items-center"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
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
      </AnimatePresence>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-20 font-logo text-[11px] uppercase tracking-logo text-white/40 transition hover:text-white"
      >
        Close
      </button>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white/10 px-4 py-3 font-logo text-sm text-white/70 backdrop-blur-sm transition hover:bg-white/20 hover:text-white"
          >
            ←
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white/10 px-4 py-3 font-logo text-sm text-white/70 backdrop-blur-sm transition hover:bg-white/20 hover:text-white"
          >
            →
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { /* jump handled via index prop */ }}
              className={`h-[3px] w-5 transition-all duration-300 ${i === index ? "bg-white" : "bg-white/25"}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Carousel ──────────────────────────────────────────────────────────────
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

  // Lightbox navigation — shared with carousel arrows when open
  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) => i === null ? null : (i - 1 + data.length) % data.length);
  }, [data.length]);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => i === null ? null : (i + 1) % data.length);
  }, [data.length]);

  // Carousel slide — skips if lightbox is open
  const nextSlide = useCallback(() => {
    if (lightboxIndex !== null) { lightboxNext(); return; }
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
  }, [lightboxIndex, lightboxNext, isAnimating, showCarousel, data, cardsPerView, currentIndex, cardWidth]);

  const prevSlide = useCallback(() => {
    if (lightboxIndex !== null) { lightboxPrev(); return; }
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
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [lightboxIndex, lightboxPrev, isAnimating, showCarousel, data, cardsPerView, currentIndex, cardWidth]);

  const getVisibleCards = () => {
    if (!showCarousel || !data) return data || [];
    const result = [];
    for (let i = 0; i < cardsPerView + 1; i++) {
      const idx = (currentIndex + i) % data.length;
      result.push({ ...data[idx], _pos: i });
    }
    return result;
  };

  if (!data || data.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={data}
            index={lightboxIndex}
            onPrev={lightboxPrev}
            onNext={lightboxNext}
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
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#2d5ca2] text-white px-3 py-2 hover:bg-[#1e4080] transition-all duration-300 font-logo text-xs tracking-logo"
                disabled={isAnimating}
                aria-label="Next"
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
                width: showCarousel ? `${(cardsPerView + 1) * 100 / cardsPerView}%` : '100%',
              }}
            >
              {getVisibleCards().map((card, idx) => {
                const realIndex = (currentIndex + ((card as any)._pos ?? idx)) % data.length;
                return (
                  <div
                    key={`${currentIndex}-${idx}`}
                    style={{
                      width: showCarousel
                        ? `${100 / (cardsPerView + 1)}%`
                        : `${100 / Math.min(cardsPerView, data.length)}%`,
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
                      {/* Shine sweep */}
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
