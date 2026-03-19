import Link from "next/link";
import { Trophy } from "lucide-react";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import LeadershipCard from "@/components/about/LeadershipCard";

export const metadata = {
    title: 'Our Journey',
    description: 'From a vision to 12500+ lives changed — the story of Meezan Educational Institute, our milestones, leadership team, and recognition over the years in Hyderabad.',
}

// Avatars pulled dynamically from Supabase
const team = [
    { name: "M. Muqtar Ahmed", role: "Founder, Educator", bio: "Muqtar Ahmed is an Internationally Certified Career Coach and seasoned educationist with over 30 years of experience in teaching, counseling, and student empowerment.\n\nHe specializes in career guidance, mental health awareness, and skill development, passionately dedicating his career to impacting students and communities through purpose-driven learning.", initials: "MA", priority: true, imageFileName: "Faculty_MMAhmed.webp", credentials: [{ iconName: "GraduationCap", label: "MBA/MA" }, { iconName: "ShieldCheck", label: "NET Qualified" }, { iconName: "Brain", label: "Psychology Expert" }, { iconName: "Globe", label: "CDA Certified" }, { iconName: "Sparkles", label: "Life Coach" }] },
    { name: "Ms. Zaibunnisa", role: "Principal, Educator", bio: "Dr. Zaibunnisa Begum is a dedicated academic leader and healthcare professional with a distinguished career in nursing education, having previously served as Principal at Medwin School of Nursing and Yashoda College of Nursing.\n\nCurrently, she serves wholeheartedly as Principal and Educator at Meezan Educational Institute, where she stands as a pillar of strength, continuously driving its growth, vision, and commitment to excellence.", initials: "ZB", priority: true, imageFileName: "Faculty_Zaibunnisa.webp", credentials: [{ iconName: "GraduationCap", label: "Doctorate" }, { iconName: "Stethoscope", label: "Clinical Specialist" }, { iconName: "HeartPulse", label: "Neonatologist" }, { iconName: "Ribbon", label: "Academic Leader" }] },
    { name: "Ms. Zaheda", role: "Vice Principal, Clinical", bio: "Zaheda Begum is a highly experienced healthcare professional with over two decades of dedicated service in the medical field, including key roles as ICU Incharge at prominent hospitals.\n\nAt Meezan Educational Institute, she contributes her vast practical knowledge as a Clinical Instructor, shaping skilled and compassionate healthcare professionals through expert hands-on training.", initials: "ZB", priority: true, imageFileName: "Faculty_Zaheda.webp", credentials: [{ iconName: "Activity", label: "ICU Specialist" }, { iconName: "HeartPulse", label: "Critical Care" }, { iconName: "Ribbon", label: "Clinical Lead" }, { iconName: "BookOpen", label: "Mentorship" }] },
    { name: "Ms. Saleha", role: "Senior Faculty", bio: "Saleha Begum, GNM, is a skilled healthcare professional and subject expert with a strong foundation in nursing education and practical field experience.\n\nShe currently serves as a core Faculty member at Meezan Educational Institute, playing a pivotal role in guiding and mentoring students toward academic and professional healthcare excellence.", initials: "SB", priority: false, imageFileName: "Faculty_Saleha.webp", credentials: [] },
    { name: "Ms. Afra", role: "BSc B.ed - Faculty of ECCE", bio: "Afra is a dedicated educator holding a BSc and B.Ed, specializing in Early Childhood Care and Education (ECCE) methodologies.\n\nShe brings dynamic teaching strategies to Meezan Educational Institute, fostering foundational learning and holistic development for young learners.", initials: "A", priority: false, credentials: [] },
    { name: "Ms. Rubeena", role: "MSc B.ed - Faculty of teacher's training", bio: "Rubeena holds an MSc and B.Ed, bringing advanced academic insights and rigorous teacher training expertise to the institution.\n\nHer focus lies in empowering the next generation of educators with modern pedagogical skills and practical classroom management strategies.", initials: "R", priority: false, credentials: [] },
    { name: "Ms. Prema Babita M", role: "Junior Lecturer", bio: "Prema Babita M serves as a Junior Lecturer, offering foundational support and dedicated academic instruction to our diverse student body.\n\nShe is passionate about interactive learning and consistently strives to create an engaging and inclusive educational environment.", initials: "PB", priority: false, credentials: [] },
    { name: "Ms. Santhoshi", role: "GNM - Clinical Instructor", bio: "Santhoshi is a certified General Nursing and Midwifery (GNM) professional with extensive practical insights in patient care.\n\nAs a Clinical Instructor, she bridges the gap between theoretical knowledge and real-world clinical application for aspiring nursing students.", initials: "S", priority: false, credentials: [] }
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
                        20+ Courses Offered
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

                    <div className="flex flex-col gap-8 max-w-[850px] mx-auto w-full">
                        {team.map((member, i) => (
                            <LeadershipCard
                                key={i}
                                member={member}
                                imageFileName={member.imageFileName || ""}
                            />
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
