// pages/index.js
import Head from "next/head";
import Header from "@/components/layout/Header";
import MainSection from "@/components/layout//MainSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>카카오테크</title>
        <meta
          name="description"
          content="카카오테크, 미래의 문턱을 낮추는 기술"
        />
      </Head>
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
}
