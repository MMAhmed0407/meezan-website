import Link from "next/link";
import { Trophy, GraduationCap, ShieldCheck, Brain, Globe, Sparkles } from "lucide-react";
import JourneyTimeline from "@/components/about/JourneyTimeline";

export const metadata = {
    title: 'Our Journey',
    description: 'From a vision to 12500+ lives changed — the story of Meezan Educational Institute, our milestones, leadership team, and recognition over the years in Hyderabad.',
}

// TODO: Replace avatar initials with real photos once received from client
const team = [
    { name: "M. Muqtar Ahmed", role: "Founder, Educator", bio: "Muqtar Ahmed is an Internationally Certified Career Coach and seasoned educationist with 30+ years of experience in teaching, counseling and student empowerment. He specializes in career guidance, coaching, mental health awareness and skill development impacting students and communities with purpose-driven learning.", initials: "MA", priority: true },
    { name: "Ms. Zaibunnisa", role: "Principal, Educator", bio: "Dr. Zaibunnisa Begum is a dedicated academic leader and healthcare professional with a distinguished career in nursing education and clinical practice.\n\nShe has served as Principal at Medwin School of Nursing and Yashoda College of Nursing, and also led TGMREIS–Khairatabad (G-1) as Principal, demonstrating exceptional administrative and educational expertise. Earlier in her career, she worked as a Clinical Specialist Neonatologist at Nice Hospital, bringing valuable medical insight into her teaching and leadership.\n\nCurrently, she serves wholeheartedly as Principal and Educator at Meezan Educational Institute, where she stands as a pillar of strength and guidance. Alongside her husband, founder Md. Muqtar Ahmed, she forms the bedrock of the institution, contributing tirelessly to its growth, vision, and commitment to excellence in education.", initials: "ZB", priority: true },
    { name: "Ms. Zaheda", role: "Vice Principal, Clinical", bio: "Zaheda Begum is a highly experienced healthcare professional with over two decades of dedicated service in the medical field.\n\nRenowned for her clinical expertise, she has served as ICU Incharge at Nice Hospital and Neo-Candy Hospital, where she played a vital role in critical care management and patient safety.\n\nCurrently, she contributes her vast practical knowledge as a Clinical Instructor at Meezan Educational Institute, where she is committed to shaping skilled and compassionate healthcare professionals through hands-on training and mentorship.", initials: "ZB", priority: true },
    { name: "Ms. Saleha", role: "Senior Faculty", bio: "Saleha Begum, GNM, is a skilled healthcare professional and subject expert with a strong foundation in nursing education. With her in-depth knowledge and practical understanding of the field, she has earned recognition as a dedicated educator. She currently serves as a Faculty member at Meezan Educational Institute, where she plays a key role in guiding and mentoring students toward academic and professional excellence in healthcare.", initials: "SB", priority: false },
    { name: "Ms. Afra", role: "BSc B.ed - Faculty of ECCE", bio: "", initials: "A", priority: false },
    { name: "Ms. Rubeena", role: "MSc B.ed - Faculty of teacher's training", bio: "", initials: "R", priority: false },
    { name: "Ms. Prema Babita M", role: "Junior Lecturer", bio: "", initials: "PB", priority: false },
    { name: "Ms. Santhoshi", role: "GNM - Clinical Instructor", bio: "", initials: "S", priority: false }
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

function CredentialIconBar() {
    const credentials = [
        { icon: GraduationCap, label: "MBA/MA" },
        { icon: ShieldCheck, label: "NET Qualification" },
        { icon: Brain, label: "Psychology & Mental Health" },
        { icon: Globe, label: "International CDA Certification" },
        { icon: Sparkles, label: "Life Coaching & Change Making" }
    ];

    return (
        <div className="flex flex-row items-center justify-center md:justify-start gap-3 my-4">
            {credentials.map((cred, idx) => {
                const Icon = cred.icon;
                return (
                    <div key={idx} className="group/icon relative flex items-center justify-center w-10 h-10 rounded-full bg-[#E6F2F2] hover:bg-[#D5EAEA] transition-colors cursor-pointer">
                        <Icon size={18} className="text-[#008080]" />
                        <div className="absolute bottom-full mb-2 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none z-30 flex flex-col items-center">
                            <div className="bg-[#1A1A2E] text-white text-[11px] font-medium px-3 py-1.5 rounded-md shadow-xl whitespace-nowrap">
                                {cred.label}
                            </div>
                            <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#1A1A2E] -mt-[1px]" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function OurJourneyPage() {
    return (
        <div className="w-full overflow-hidden">
            {/* HERO SECTION */}
            <section className="bg-[#0D7A82] w-full py-24 px-4 sm:px-8 lg:px-16 flex flex-col items-center justify-center text-center relative">
                <p className="text-[#A8DEE2] font-semibold tracking-[3px] text-[11px] mb-4">
                    MEEZAN EDUCATIONAL INSTITUTE
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[800] text-white leading-[1.1] mt-4 max-w-5xl">
                    From a Vision to 12500+ Lives Changed
                </h1>
                <p className="text-[18px] text-white/75 max-w-[600px] mt-4 mx-auto">
                    The story of how one institute in Hyderabad set out to educate the underserved — and never stopped growing.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">
                    <span className="bg-white/12 border border-white/25 text-white text-[14px] px-6 py-2.5 rounded-full">
                        12500+ Students Trained
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

            {/* TEAM SECTION (ASYMMETRIC GRID) */}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {team.map((member, i) => (
                            <div
                                key={i}
                                className={`bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all group flex flex-col ${i === 0 ? 'md:col-span-2 md:flex-row items-center md:items-start' : 'lg:flex-row items-center lg:items-start'}`}
                            >
                                {/* Left Side: Photo Container */}
                                <div className={`p-6 md:p-8 flex shrink-0 items-center justify-center ${i === 0 ? 'md:border-r border-border md:bg-[#FDFDFD]' : 'lg:border-r border-border lg:bg-[#FDFDFD]'}`}>
                                    <div className="relative flex items-center justify-center bg-white border border-[#29B8C1] shadow-sm overflow-hidden" style={{ width: "120px", height: "120px", borderRadius: "50%" }}>
                                        {/* TODO: Implement next/image when photos are provided. priority={member.priority} */}
                                        <div style={{ backgroundColor: "#E8F8F9", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <span style={{ color: "#29B8C1", fontSize: "36px", fontWeight: 700 }}>{member.initials}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Content Box */}
                                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center text-center md:text-left lg:text-left">
                                    <h3 className="text-[22px] md:text-[24px] text-[#008080] mb-1 font-bold leading-tight">{member.name}</h3>
                                    <p className="text-[#1A1A2E] font-bold text-[15px] md:text-[16px] mb-2">{member.role}</p>

                                    {i === 0 && <CredentialIconBar />}

                                    {member.bio && (
                                        <div className="text-[#5A5A72] text-[13.5px] md:text-[15px] leading-relaxed space-y-4 mt-2">
                                            {member.bio.split('\n\n').map((paragraph, pIdx) => (
                                                <p key={pIdx}>{paragraph}</p>
                                            ))}
                                        </div>
                                    )}
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
