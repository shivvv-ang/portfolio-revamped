import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { titles } from "../Constants";
import PortfolioReveal from "../Components/PortfolioReveal";


gsap.registerPlugin(SplitText);

export default function Hero() {
  
  const textRef = useRef(null);

  useLayoutEffect(() => {
    let index = 0;
    let splitext = new SplitText(textRef.current, { type: "chars" });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });

    const animateText = () => {
      tl.clear();

      // animate IN
      tl.from(splitext.chars, {
        opacity: 0,
        y: 80,
        rotateX: -90,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.out",
      });

      // animate OUT
      tl.to(splitext.chars, {
        opacity: 0,
        y: -80,
        rotateX: 90,
        stagger: 0.03,
        duration: 0.8,
        ease: "power3.in",
        delay: 0.7,
        onComplete: () => {

          splitext.revert();

          index = (index + 1) % titles.length;
    
          textRef.current.textContent = titles[index];

          splitext = new SplitText(textRef.current, { type: "chars" });

          animateText();
        },
      });
    };

    animateText();

    return () => {
      splitext.revert();
      tl.kill();
    };
  }, []);


  return (
    <>
    {/* <PortfolioReveal/> */}
    <section  id="home" className="bg-[#F40C3F] h-screen w-screen relative overflow-hidden">
     
     <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <span
          className="text-[#6A0226] font-bold leading-none select-none italic"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "130rem",
            transform: "translate(20%, -5%)",
            lineHeight: "1",
          }}
        >
          S
        </span>
      </div>

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
        <span
          className="text-[#E7E5D9] font-bold leading-none select-none italic"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "130rem",
            transform: "translate(10%, -5%)",
            lineHeight: "0.8",
          }}
        >
          S
        </span>
      </div>

      <div className="relative z-20 h-full flex flex-col justify-between p-10">
        <h1
          className="text-[#6A0226] font-medium text-4xl sm:text-5xl tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          SHIVANG HARIAKAR
        </h1>

        <div className="flex flex-col gap-4">
          <p className="text-[#160000] font-extrabold text-6xl sm:text-8xl leading-none"
            style={{
              fontFamily: "'Manrope', sans-serif",
              letterSpacing: "-0.02em"
            }}
            ref={textRef}
          >
           Frontend
          </p>
          <p
            className="text-[#160000] font-bold text-6xl sm:text-8xl leading-none"
            style={{ 
              fontFamily: "'Raleway', sans-serif",
              }}
          >
            Dev
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
