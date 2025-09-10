'use client';
import Button1PC from "@/components/buttons/button1PC";
import Navbar from "@/components/Navbar";
import TopService from "@/components/TopService";
import BlogSection from "@/components/blogSection";
import FooterCta from "@/components/footerCTA";
import Footer from "@/components/footer";
import Image from "next/image";
import dynamic from "next/dynamic";

export default function Home() {
  const samplePost = {
  "id": "SAMPLE",
  "slug": "sample-post", 
  "title": "Sample Post (Replace with your own)",
  "thumbnail": "https://picsum.photos/seed/1/1200/630",
  "tags": ["sample", "replace-me"],
  "createdAt": "2025-08-01",
  "content": "<h2>Heading</h2><p>Sample paragraph…</p>"
};


const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), { ssr: false });

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Navbar/>
      
      <div className="mv-section">

        <div className="mv-left">
          <div className="headline">
            ただ作るのではなく、<br />
            成果につながる<br />
            「本質的なものづくり」を。
          </div>
          
          <div className="mv-button-desktop">
            <Button1PC 
              text="お問い合わせはこちら"
              href="/contact"
            />
          </div>
        </div>
        
        
        <div className="mv-right">
          <div className="mv-lottie-container">
            <LottieAnimation className="mv-lottie-animation" />
          </div>
        </div>
        
        
        <div className="mv-button-mobile">
          <Button1PC 
            text="お問い合わせはこちら"
            href="/contact"
          />
        </div>
      </div>

      <TopService />
      <BlogSection/>
      <FooterCta/>
      <Footer/>

    </div>
    
  );
}
