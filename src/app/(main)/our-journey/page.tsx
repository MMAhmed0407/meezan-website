import Link from "next/link";
import { Trophy } from "lucide-react";
import JourneyTimeline from "@/components/about/JourneyTimeline";

export const metadata = {
  title: 'Our Journey',
  description: 'From a vision to 500+ lives changed — the story of Meezan Educational Institute, our milestones, leadership team, and recognition over the years in Hyderabad.',
}

// TODO: Replace avatar initials with real photos once received from client
const team = [
    { name: "Dr. Ayesha K.", role: "Principal Director", bio: "Leading Meezan Institute with 20+ years of educational excellence.", initials: "AK" },
    { name: "Mr. Mohammed S.", role: "Head of Paramedical Studies", bio: "Former chief nurse turned dedicated healthcare educator.", initials: "MS" },
    { name: "Ms. Sarah J.", role: "Head of Teacher's Training", bio: "Expert in early childhood education and pedagogical innovation.", initials: "SJ" }
];

// TODO: Replace placeholder awards with real data from client form response
const awards = [
  {
    name: "Excellence in Community Education",
    year: "2023",
    awardedBy: "Telangana Education Board",
    description: "Recognised for outstanding contribution to accessible education in underserved communities.",
  },
  {
    name: "Healthcare Outreach Award",
    year: "2022",
    awardedBy: "Hyderabad Healthcare Foundation",
    description: "Awarded for the Shoukath Ali Charitable Clinic's impact on community healthcare delivery.",
  },
  {
    name: "Best Paramedical Training Institute",
    year: "2021",
    awardedBy: "South India Skills Council",
    description: "Recognised as a leading institute for paramedical training and placement outcomes.",
  },
  {
    name: "Seed USA Community Partner",
    year: "2020",
    awardedBy: "Seed USA",
    description: "Formally recognised as a Seed USA community education partner for free student sponsorship programme.",
  },
];

export default function OurJourneyPage() {
    return (
        <div className="w-full overflow-hidden">
            {/* HERO SECTION */}
            <section className="bg-[#0D7A82] w-full py-24 px-4 sm:px-8 lg:px-16 flex flex-col items-center justify-center text-center relative">
                <p className="text-[#A8DEE2] font-semibold tracking-[3px] text-[11px] mb-4">
                    MEEZAN EDUCATIONAL INSTITUTE
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[800] text-white leading-[1.1] mt-4 max-w-5xl">
                    From a Vision to 500+ Lives Changed
                </h1>
                <p className="text-[18px] text-white/75 max-w-[600px] mt-4 mx-auto">
                    The story of how one institute in Hyderabad set out to educate the underserved — and never stopped growing.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">
                    <span className="bg-white/12 border border-white/25 text-white text-[14px] px-6 py-2.5 rounded-full">
                        500+ Students Trained
                    </span>
                    <span className="bg-white/12 border border-white/25 text-white text-[14px] px-6 py-2.5 rounded-full">
                        10+ Courses Offered
                    </span>
                    <span className="bg-white/12 border border-white/25 text-white text-[14px] px-6 py-2.5 rounded-full">
                        Serving Hyderabad Since Our Founding
                    </span>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#29B8C1]" />
            </section>

            {/* TIMELINE SECTION */}
            <JourneyTimeline />

            {/* TEAM SECTION */}
            <section className="bg-[#F4F6F9] py-20 px-4 sm:px-8 lg:px-16" aria-labelledby="leadership-heading">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <p className="text-[#29B8C1] text-sm font-semibold tracking-widest uppercase mb-3">
                            THE TEAM
                        </p>
                        <h2 id="leadership-heading" className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A2E]">
                            Our Leadership
                        </h2>
                        <p className="text-[#5A5A72] max-w-2xl text-[16px]">
                            The dedicated individuals behind Meezan&apos;s mission — educators, healthcare professionals, and community leaders.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all group"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden flex items-center justify-center bg-white border-b border-border">
                                    <div style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#29B8C1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <span style={{ color: "white", fontSize: "36px", fontWeight: 700 }}>{member.initials}</span>
                                    </div>
                                </div>
                                <div className="p-8 text-center bg-white relative z-10 -mt-6 mx-4 rounded-xl border border-border shadow-md">
                                    <h3 className="text-xl text-[#1A1A2E] mb-1 font-bold">{member.name}</h3>
                                    <p className="text-[#29B8C1] font-semibold text-sm mb-4">{member.role}</p>
                                    <p className="text-[#5A5A72] text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AWARDS & RECOGNITION SECTION */}
            <section className="bg-white py-20 px-4 sm:px-8 lg:px-16" aria-labelledby="awards-heading">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-left">
                        <p className="text-[#29B8C1] text-sm font-semibold tracking-widest uppercase mb-3">
                            RECOGNITION
                        </p>
                        <h2 id="awards-heading" className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A2E]">
                            Awards & Recognition
                        </h2>
                        <p className="text-[#5A5A72] max-w-2xl text-[16px]">
                            Milestones of trust, impact and excellence recognised by our community and partners.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {awards.map((award, i) => (
                            <div key={i} className="bg-white border border-[#E0EDEF] rounded-xl p-6 lg:p-[28px_24px] border-t-[3px] border-t-[#29B8C1] shadow-sm">
                                <Trophy size={28} className="text-[#29B8C1]" />
                                <h3 className="text-[16px] font-bold text-[#1A1A2E] mt-3">
                                    {award.name}
                                </h3>
                                <p className="text-[#29B8C1] text-[13px] font-semibold mt-1">
                                    {award.year}
                                </p>
                                <p className="text-[#5A5A72] text-[13px] mt-1">
                                    {award.awardedBy}
                                </p>
                                <p className="text-[#888888] text-[13px] mt-2 leading-[1.5]">
                                    {award.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section className="py-16 md:py-20 bg-[#0D7A82] px-4 flex flex-col items-center justify-center text-center">
                <div className="mx-auto w-full max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Be Part of the Meezan Story
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Whether you are a student, a partner, or someone who believes in our mission — we would love to hear from you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/courses" className="bg-[#29B8C1] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-[#0D7A82] transition-colors shadow-sm hover:-translate-y-1">
                            Explore Courses
                        </Link>
                        <Link href="/#contact" className="px-8 py-3.5 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white hover:text-[#0D7A82] transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
