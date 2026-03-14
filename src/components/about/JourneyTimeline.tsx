"use client";

import { motion } from "framer-motion";

// TODO: Replace placeholder milestone data with real data from client form response
const milestones = [
  {
    year: "2004",
    label: "The Beginning",
    title: "Meezan Educational Institute Founded",
    description: "Founded in Hyderabad with a singular mission — to provide quality education and professional training to underserved communities.",
  },
  {
    year: "2008",
    label: "Healthcare Initiative",
    title: "Shoukath Ali Charitable Clinic Established",
    description: "Launched the charitable clinic to extend Meezan's mission beyond education into direct community healthcare service.",
  },
  {
    year: "2012",
    label: "Growing Reach",
    title: "Paramedical Sciences Programme Launched",
    description: "Introduced the flagship paramedical and health services programme, training students for real careers in India's growing healthcare sector.",
  },
  {
    year: "2016",
    label: "Teacher Training",
    title: "ECCE & Teacher Training Programmes Begin",
    description: "Expanded into teacher education — ECCE, ASD, Life Skills and ADHD programmes — certifying educators who shape the next generation.",
  },
  {
    year: "2020",
    label: "Partnership",
    title: "Seed USA Partnership Formalised",
    description: "Formalised our partnership with Seed USA, enabling continued free education for students who cannot afford tuition.",
  },
  {
    year: "2024",
    label: "500+ Lives",
    title: "500+ Students Trained Across All Programmes",
    description: "Crossed a significant milestone — over 500 students have now completed their training and gone on to careers and community impact.",
  },
  {
    year: "2026",
    label: "Today",
    title: "Continuing the Mission",
    description: "Meezan continues to grow — new courses, a digital presence, and an unwavering commitment to Encourage, Educate, and Empower.",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="bg-white" aria-labelledby="journey-timeline-heading">
      {/* Section Header */}
      <div className="pt-20 pb-8 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <p className="text-[#29B8C1] text-sm font-semibold tracking-widest uppercase mb-3">
          OUR HISTORY
        </p>
        <h2 id="journey-timeline-heading" className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">
          The Meezan Journey
        </h2>
        <p className="text-[16px] text-[#5A5A72] max-w-3xl">
          Every milestone a life changed, every year a new chapter in our mission to educate and empower.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 overflow-hidden pb-20">
        <div className="relative">
          {milestones.map((milestone, i) => (
            <div key={i} className="relative flex flex-col lg:flex-row w-full mb-8 lg:mb-0">
              
              {/* DESKTOP LEFT COLUMN: Watermark Year */}
              <div className="hidden lg:block lg:w-[40%] relative min-h-[140px] pr-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="absolute bottom-0 left-0 leading-none pointer-events-none select-none z-0"
                  style={{
                    fontSize: "120px",
                    fontWeight: 900,
                    color: "#E8F8F9",
                    transform: "translateY(15%)", 
                  }}
                >
                  {milestone.year}
                </motion.div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 text-right pr-4 tracking-[1px]">
                    <span className="text-[13px] font-semibold text-[#29B8C1] uppercase">
                        {milestone.label}
                    </span>
                </div>
              </div>

              {/* CENTRE COLUMN: Line and Dot */}
              <div className="absolute left-[12px] lg:left-[40%] lg:w-[4%] h-full flex flex-col items-center z-10">
                {/* Continuous Line */}
                <div className="w-[2px] h-full bg-[#29B8C1] absolute" />
                {/* Dot */}
                <div className="absolute top-[48px] lg:top-1/2 lg:-translate-y-1/2 w-[14px] h-[14px] bg-white border-[3px] border-[#29B8C1] rounded-full z-20" />
              </div>

              {/* RIGHT COLUMN: Content Card */}
              <div className="w-full pl-[36px] lg:pl-0 lg:w-[56%] z-10 py-4 lg:py-6">
                 <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-white border border-[#E0EDEF] rounded-xl p-6 lg:p-[24px_28px] lg:ml-[24px] shadow-sm relative"
                  style={{ borderLeft: "3px solid #29B8C1", margin: "16px 0 32px 24px" }}
                 >
                    {/* Year Badge */}
                    <div className="inline-block bg-[#E8F8F9] text-[#29B8C1] text-[12px] font-semibold px-3 py-1 rounded-full mb-2">
                      {milestone.year}
                    </div>

                    <h3 className="text-[18px] font-bold text-[#1A1A2E] mt-2">
                      {milestone.title}
                    </h3>
                    <p className="text-[15px] text-[#5A5A72] mt-2 leading-[1.6]">
                      {milestone.description}
                    </p>
                 </motion.div>
              </div>

            </div>
          ))}
          {/* Cap the line at the top and bottom if needed, but it should be fine. */}
        </div>
      </div>
    </section>
  );
}
