"use client";

import Image from "next/image";
import { useState } from "react";
import { getFacultyImage } from "@/utils/supabase";
import { 
    GraduationCap, ShieldCheck, Brain, Globe, Sparkles, 
    Activity, Stethoscope, HeartPulse, Ribbon, BookOpen 
} from "lucide-react";

const IconMap: Record<string, any> = {
    GraduationCap,
    ShieldCheck,
    Brain,
    Globe,
    Sparkles,
    Activity,
    Stethoscope,
    HeartPulse,
    Ribbon,
    BookOpen
};

interface LeadershipCardProps {
    member: {
        name: string;
        role: string;
        bio: string;
        initials: string;
        priority?: boolean;
        credentials?: { iconName: string; label: string }[];
    };
    imageFileName?: string;
}

export default function LeadershipCard({ member, imageFileName }: LeadershipCardProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`bg-white rounded-2xl border border-border hover:shadow-2xl hover:shadow-teal-500/10 hover:scale-[1.02] transition-all duration-300 group flex flex-col sm:flex-row items-center sm:items-stretch overflow-hidden`}>
             
            {/* Left Side: Photo Container */}
            <div className={`p-6 sm:p-8 flex shrink-0 items-center justify-center sm:border-r border-border bg-[#FDFDFD] relative z-20`}>
                <div className="relative flex items-center justify-center bg-white rounded-full overflow-hidden w-[175px] h-[175px] md:w-[188px] md:h-[188px] shrink-0 border-[4px] border-white outline outline-1 outline-[#008080] group-hover:ring-[6px] group-hover:ring-[#008080]/20 transition-all duration-500 ease-out shadow-sm z-10">
                    
                    {/* Skeleton loading state */}
                    {isLoading && !hasError && imageFileName && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
                    )}

                    {/* Image from Supabase */}
                    {!hasError && imageFileName && (
                        <Image
                            src={getFacultyImage(imageFileName)}
                            alt={`${member.name} - ${member.role}`}
                            fill
                            className={`object-cover transition-all duration-500 ease-out group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                            priority={member.priority}
                            unoptimized={true}
                            onLoad={() => setIsLoading(false)}
                            onError={() => {
                                setIsLoading(false);
                                setHasError(true);
                            }}
                            sizes="(max-width: 768px) 175px, 188px"
                        />
                    )}

                    {/* Fallback to Initials */}
                    {(hasError || !imageFileName) && (
                        <div className="z-0 absolute inset-0 bg-[#008080] flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
                            <span className="text-white text-[48px] md:text-[54px] font-bold tracking-tight">{member.initials}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Content Box */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center text-center sm:text-left relative z-20">
                <h3 className="text-[22px] md:text-[26px] text-[#008080] mb-1 font-bold leading-tight group-hover:text-[#0D7A82] transition-colors">{member.name}</h3>
                <p className="text-[#1A1A2E] font-bold text-[15px] md:text-[17px] mb-2">{member.role}</p>

                {/* Credentials Tooltip Bar */}
                {member.credentials && member.credentials.length > 0 && (
                    <div className="flex flex-row items-center justify-center sm:justify-start gap-3 my-4">
                        {member.credentials.map((cred, idx) => {
                            const Icon = IconMap[cred.iconName];
                            if (!Icon) return null;
                            return (
                                <div key={idx} className="group/tooltip relative flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#E8F8F9] hover:bg-[#008080] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1">
                                    <Icon size={18} className="text-[#008080] group-hover/tooltip:text-white transition-colors" />
                                    
                                    {/* Floating Tooltip */}
                                    <div className="absolute bottom-full mb-3 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 translate-y-2 group-hover/tooltip:translate-y-0 pointer-events-none z-30 flex flex-col items-center">
                                        <div className="bg-[#1A1A2E] text-white text-[12px] font-semibold tracking-wide px-4 py-2 rounded-lg shadow-xl border border-[#29B8C1]/30 whitespace-nowrap">
                                            {cred.label}
                                        </div>
                                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#1A1A2E] -mt-[1px]" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {member.bio && (
                    <div className="text-[#5A5A72] text-[14px] md:text-[15.5px] leading-relaxed space-y-4 mt-3">
                        {member.bio.split('\n\n').map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
