// pages/index.js

import Header from "@/components/layout/Header";
import MainSection from "@/components/layout//MainSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <h1 className="colors.tx">안녕하세요!</h1>
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}
