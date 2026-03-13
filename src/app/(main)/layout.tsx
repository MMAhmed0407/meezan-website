import AnnouncementBar from "@/components/global/AnnouncementBar";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import FloatingButtons from "@/components/global/FloatingButtons";
import FloatingContact from "@/components/global/FloatingContact";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer />
            <FloatingButtons />
            <FloatingContact />
        </>
    );
}
