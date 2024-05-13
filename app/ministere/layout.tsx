// import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

const MinistereLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <section className="flex min-h-screen flex-1">
          <div className="w-full">{children}</div>
        </section>
      </div>
      {/* <Footer /> */}
    </main>
  );
};

export default MinistereLayout;
