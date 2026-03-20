"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

interface Slide {
  category: string;
  text: string;
  source: string;
  tag: string;
  image?: string;
}

const slides: Slide[] = [
  {
    category: "Annual Health Camp",
    text: "Over 200 residents received free medical consultations at our annual health camp organised by the Shoukath Ali Charitable Clinic.",
    source: "Shoukath Ali Charitable Clinic",
    tag: "Hyderabad, 2024",
  },
  {
    category: "Workshop on Paramedical Courses",
    text: "Conducted a workshop on skill development and livelihood program partnering with North American Indian Muslim Association.",
    source: "North American Indian Muslim Association",
    tag: "2025",
  },
  {
    category: "3000+ Certified Teachers",
    text: "3000+ teaching professionals trained & certified in ECCE and PPTTC with government and ISO Certifications recognised globally. Ready to shape the next generation of learners.",
    source: "ECCE & PPTC Graduation Ceremony",
    tag: "Meezan Institute, 2024",
  },
  {
    category: "Faculty Development Programme",
    text: "Conducted FDP for 500+ faculty members of Government Junior college lecturers of the state of Telangana at Commissioner’s Office, TSBIE.",
    source: "TSBIE",
    tag: "Hyderabad, 2023",
  },
  {
    category: "SEED USA Partnership",
    text: "Partnered with SEED USA to support 105 underprivileged students through academic programmes in paramedics and teacher’s training",
    source: "Seed USA Partnership",
    tag: "2025",
  },

];

const AUTOPLAY_DURATION = 5000;

export default function CommunityCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);

  const goTo = useCallback((direction: "prev" | "next") => {
    setCurrent((prev) =>
      direction === "next"
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length
    );
    setProgress(0);
    progressRef.current = 0;
    startTimeRef.current = Date.now();
  }, []);

  // Autoplay with progress animation
  useEffect(() => {
    if (isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    startTimeRef.current = Date.now() - progressRef.current * AUTOPLAY_DURATION;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / AUTOPLAY_DURATION, 1);
      progressRef.current = pct;
      setProgress(pct);

      if (pct >= 1) {
        setCurrent((prev) => (prev + 1) % slides.length);
        progressRef.current = 0;
        setProgress(0);
        startTimeRef.current = Date.now();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, current]);

  const slide = slides[current];

  return (
    <section
      aria-labelledby="community-heading"
      className="w-full"
      style={{ backgroundColor: "#F4F6F9" }}
    >
      {/* ===== DESKTOP LAYOUT (lg+) ===== */}
      <div className="hidden lg:block">
        <div
          className="relative flex w-full"
          style={{ padding: "48px 40px 48px 0" }}
        >
          {/* LEFT PANEL */}
          <div
            className="relative flex flex-col justify-center shrink-0"
            style={{
              width: "38%",
              backgroundColor: "#F4F6F9",
              padding: "48px 80px 48px 40px",
            }}
          >
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block"
              style={{ color: "#29B8C1" }}
            >
              OUR PRESENCE
            </span>
            <h2
              id="community-heading"
              className="font-bold mb-0"
              style={{
                fontSize: "32px",
                lineHeight: 1.2,
                color: "#1A1A2E",
              }}
            >
              Meezan in the Community
            </h2>
            <p
              className="mt-4 leading-relaxed"
              style={{ fontSize: "15px", color: "#6B7280" }}
            >
              From healthcare outreach to teacher training events —
              Meezan&apos;s impact reaches far beyond the classroom.
            </p>

            {/* VERTICAL ARROWS — flush at right edge of left panel */}
            <div
              className="absolute flex flex-col z-20"
              style={{
                right: "-26px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => goTo("next")}
                className="flex items-center justify-center text-white cursor-pointer border-none outline-none"
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: "#29B8C1",
                  borderRadius: "6px 6px 0 0",
                }}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => goTo("prev")}
                className="flex items-center justify-center text-white cursor-pointer border-none outline-none"
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: "#29B8C1",
                  borderRadius: "0 0 6px 6px",
                }}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </motion.button>
            </div>
          </div>

          {/* RIGHT PANEL — dark card */}
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              backgroundColor: "#111827",
              marginTop: "-24px",
              marginBottom: "-24px",
              borderRadius: "8px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Watermark shapes */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute"
                style={{
                  width: "300px",
                  height: "300px",
                  bottom: "-60px",
                  right: "-40px",
                  backgroundColor: "#1F2937",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: "250px",
                  height: "250px",
                  bottom: "-30px",
                  right: "80px",
                  backgroundColor: "#1F2937",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  opacity: 0.4,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: "200px",
                  height: "200px",
                  bottom: "20px",
                  right: "200px",
                  backgroundColor: "#1F2937",
                  clipPath: "polygon(50% 10%, 0% 100%, 90% 100%)",
                  opacity: 0.3,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: "180px",
                  height: "180px",
                  bottom: "-20px",
                  right: "300px",
                  backgroundColor: "#1F2937",
                  clipPath: "polygon(40% 0%, 0% 100%, 100% 80%)",
                  opacity: 0.2,
                }}
              />
            </div>

            {/* Progress line */}
            <div className="flex w-full h-[3px] relative z-10">
              <div
                className="h-full"
                style={{
                  width: `${progress * 65}%`,
                  backgroundColor: "#29B8C1",
                  transition: "none",
                }}
              />
              <div className="h-full flex-1" style={{ backgroundColor: "#374151" }} />
            </div>

            {/* Slide content */}
            <div
              className="relative z-10"
              style={{ padding: "40px 48px 40px 48px" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {slide.image && (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={slide.image}
                        alt={slide.category}
                        fill
                        className="object-cover opacity-30"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: "rgba(17,24,39,0.7)" }}
                      />
                    </div>
                  )}

                  <span
                    className="inline-block text-white rounded-full px-3 py-1"
                    style={{
                      backgroundColor: "#29B8C1",
                      fontSize: "11px",
                      lineHeight: "1.4",
                    }}
                  >
                    {slide.category}
                  </span>

                  <p
                    className="text-white italic font-normal max-w-2xl"
                    style={{
                      fontSize: "20px",
                      lineHeight: 1.7,
                      marginTop: "20px",
                    }}
                  >
                    &ldquo;{slide.text}&rdquo;
                  </p>

                  <p
                    className="font-semibold"
                    style={{
                      color: "#29B8C1",
                      fontSize: "14px",
                      marginTop: "24px",
                    }}
                  >
                    — {slide.source}
                  </p>

                  <p
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "13px",
                      marginTop: "4px",
                    }}
                  >
                    {slide.tag}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tag badge — bottom right */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                bottom: "24px",
                right: "32px",
                width: "80px",
                height: "32px",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "6px",
                fontSize: "11px",
                color: "#111827",
                fontWeight: 600,
                zIndex: 15,
              }}
            >
              {slide.tag.split(",")[0]}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT (below lg) ===== */}
      <div className="lg:hidden">
        {/* Heading area */}
        <div style={{ backgroundColor: "#F4F6F9", padding: "32px 20px" }}>
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block"
            style={{ color: "#29B8C1" }}
          >
            OUR PRESENCE
          </span>
          <h2
            className="font-bold mb-0 lg:hidden"
            aria-hidden="true"
            style={{
              fontSize: "28px",
              lineHeight: 1.2,
              color: "#1A1A2E",
            }}
          >
            Meezan in the Community
          </h2>
          <p
            className="mt-4 leading-relaxed"
            style={{ fontSize: "15px", color: "#6B7280" }}
          >
            From healthcare outreach to teacher training events —
            Meezan&apos;s impact reaches far beyond the classroom.
          </p>
        </div>

        {/* Dark card */}
        <div
          className="relative overflow-hidden"
          style={{ backgroundColor: "#111827" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Watermark shapes */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute"
              style={{
                width: "200px",
                height: "200px",
                bottom: "-40px",
                right: "-20px",
                backgroundColor: "#1F2937",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                opacity: 0.6,
              }}
            />
            <div
              className="absolute"
              style={{
                width: "160px",
                height: "160px",
                bottom: "-10px",
                right: "60px",
                backgroundColor: "#1F2937",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                opacity: 0.35,
              }}
            />
          </div>

          {/* Progress line */}
          <div className="flex w-full h-[3px] relative z-10">
            <div
              className="h-full"
              style={{
                width: `${progress * 65}%`,
                backgroundColor: "#29B8C1",
                transition: "none",
              }}
            />
            <div className="h-full flex-1" style={{ backgroundColor: "#374151" }} />
          </div>

          {/* Slide content */}
          <div
            className="relative z-10"
            style={{ padding: "28px 24px 72px 24px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-${current}`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                {slide.image && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={slide.image}
                      alt={slide.category}
                      fill
                      className="object-cover opacity-30"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: "rgba(17,24,39,0.7)" }}
                    />
                  </div>
                )}

                <span
                  className="inline-block text-white rounded-full px-3 py-1"
                  style={{
                    backgroundColor: "#29B8C1",
                    fontSize: "11px",
                    lineHeight: "1.4",
                  }}
                >
                  {slide.category}
                </span>

                <p
                  className="text-white italic font-normal"
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.7,
                    marginTop: "20px",
                  }}
                >
                  &ldquo;{slide.text}&rdquo;
                </p>

                <p
                  className="font-semibold"
                  style={{
                    color: "#29B8C1",
                    fontSize: "14px",
                    marginTop: "24px",
                  }}
                >
                  — {slide.source}
                </p>

                <p
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "13px",
                    marginTop: "4px",
                  }}
                >
                  {slide.tag}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile horizontal arrows — bottom right */}
          <div className="absolute bottom-0 right-0 z-20 flex">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => goTo("prev")}
              className="flex items-center justify-center text-white cursor-pointer border-none outline-none"
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "#29B8C1",
                borderRadius: "8px 0 0 0",
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => goTo("next")}
              className="flex items-center justify-center text-white cursor-pointer border-none outline-none"
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "#29B8C1",
                borderRadius: "0",
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
