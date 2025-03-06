import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[90vh]">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
