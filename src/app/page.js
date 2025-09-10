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
      
      {/* MV Section */}
      <div className="
      flex 
      h-[600px] sm:h-[700px] lg:h-[810px] 
      px-6 sm:px-12 lg:px-20 
      justify-center 
      items-center 
      self-stretch
      
      /* Mobile styles */
      max-sm:flex-col 
      max-sm:justify-center 
      max-sm:items-center 
      max-sm:w-full 
      max-sm:h-[810px] sm:max-sm:h-[900px] md:max-sm:h-[1130px]
      max-sm:px-6
      
      /* Tablet styles */
      sm:max-lg:flex-col 
      sm:max-lg:justify-start 
      sm:max-lg:items-center 
      sm:max-lg:py-24 
      sm:max-lg:px-6 
      sm:max-lg:h-auto
    ">
      
      {/* Left div */}
      <div className="
        flex 
        flex-col 
        items-start 
        gap-8 lg:gap-16 
        flex-1
        max-w-fit
        
        /* Mobile styles */
        max-sm:self-center 
        max-sm:flex-none 
        max-sm:w-auto 
        max-sm:max-w-full 
        max-sm:order-1
        max-sm:gap-8
        
        /* Tablet styles */
        sm:max-lg:self-center 
        sm:max-lg:w-full 
        sm:max-lg:max-w-full 
        sm:max-lg:order-1 
        sm:max-lg:flex-shrink-0
        sm:max-lg:gap-12
      ">
        <div className="
          font-bold 
          text-[clamp(28px,6vw,40px)]   /* mobile fluid scaling */
          sm:text-[clamp(57px,5vw,56px)] /* tablet scaling */
          lg:text-[clamp(40px,4vw,52px)]
          

          leading-[150%] 
          text-black 
          inline-block 
          whitespace-pre-line
          
        " style={{ fontFamily: '"Noto Sans JP", sans-serif' }}>
          ただ作るのではなく、<br />
          成果につながる<br />
          「本質的なものづくり」を。
        </div>
        
        {/* Button - only shows on desktop */}
        <div className="block sm:max-lg:hidden max-sm:hidden">
          <Button1PC 
            text="お問い合わせはこちら"
            href="/contact"
          />
        </div>
      </div>
      
      {/* Right div - Lottie Animation */}
      <div className="
        flex 
        h-[400px] lg:h-[695px] md:h-[800px]
        max-w-[480px] lg:max-w-[640px] 
        max-h-[680px] lg:max-h-[695px] 
        flex-col 
        justify-center 
        items-center 
        flex-1

        /* Mobile (≤639px) */
        max-sm:self-center 
        max-sm:flex-none 
        max-sm:w-auto 
        max-sm:max-w-full 
        max-sm:order-2
        max-sm:h-[500px]

        /* Tablet (640px–1023px) */
        sm:self-center 
        sm:w-full 
        sm:max-w-full 
        sm:h-[400px]
        sm:order-2 
        lg:self-auto 
        lg:w-auto 
        lg:max-w-[640px] 
        lg:h-[695px] 
        lg:order-none

      ">
        <div className="
          w-full 
          h-full 
          flex 
          justify-center 
          items-center
        ">
          <LottieAnimation className="
            flex 
            pl-5 
            h-[690px] 
            max-w-[620px] 
            max-h-[690px] 
            flex-col 
            justify-center 
            items-center 
            flex-1
            
            /* Mobile & Tablet styles - using CSS aspect ratios instead of JS */
            max-lg:w-full 
            max-lg:max-w-full 
            max-lg:h-auto 
            max-lg:block 
            max-lg:mx-auto 
            max-lg:overflow-hidden 
            max-lg:box-border 
            max-lg:flex-shrink-0
            max-lg:pl-0
            max-lg:[aspect-ratio:800/868]
            lg:[aspect-ratio:93/101]
          " />
        </div>
      </div>
      
      {/* Button for tablet/mobile - shows outside the divs */}
      <div className="
        hidden 
        max-lg:flex 
        max-lg:justify-center 
        max-lg:items-center 
        max-lg:order-3 
        max-lg:w-full
        max-lg:mt-8
      ">
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