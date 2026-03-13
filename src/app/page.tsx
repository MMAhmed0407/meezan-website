import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import TeachersTrainingSection from "@/components/home/TeachersTrainingSection";
import ClinicSection from "@/components/home/ClinicSection";
import CoachingSection from "@/components/home/CoachingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LeadCaptureSection from "@/components/home/LeadCaptureSection";
import ContactSection from "@/components/home/ContactSection";
import { FAQSchema } from "@/components/global/SchemaOrg";

export default function Home() {
  return (
    <>
      <FAQSchema />
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <WhyChooseSection />
      <TeachersTrainingSection />
      <ClinicSection />
      <CoachingSection />
      <TestimonialsSection />
      <LeadCaptureSection />
      <ContactSection />
    </>
  );
}
