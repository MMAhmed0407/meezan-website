import type { Metadata } from "next";
import TeachersTrainingPageContent from "./TeachersTrainingPageContent";
import { BreadcrumbSchema } from "@/components/global/SchemaOrg";

export const metadata: Metadata = {
    title: "Teacher's Training | Meezan Educational Institute",
    description:
        "Explore ECCE, ASD, Life Skills, ADHD and other teacher training programmes at Meezan Educational Institute Hyderabad.",
};

export default function TeachersTrainingPage() {
    return (
        <>
            <BreadcrumbSchema
                crumbs={[
                    { name: "Home", url: "/" },
                    { name: "Teacher's Training", url: "/teachers-training" },
                ]}
            />
            <TeachersTrainingPageContent />
        </>
    );
}
