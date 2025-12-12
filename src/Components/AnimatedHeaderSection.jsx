import { useRef } from "react";
import AnimatedTextLines from "./AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];
  useGSAP(() => {
    if (!withScrollTrigger) return;
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contextRef.current,
        start: "top 90%", 
        toggleActions: "play reverse play reverse", 
      },
    });
  
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
  
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, [withScrollTrigger]);
  return (
    <div ref={contextRef}>
  <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
    <div
      ref={headerRef}
      className="flex flex-col justify-center gap-10 pt-20 sm:gap-14"
    >
     
      <p
        className={`text-xs sm:text-sm font-light tracking-[0.35rem] uppercase px-10 opacity-80 ${textColor}`}
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {subTitle}
      </p>

     
      <div className="px-10">
        <h1
          className={`flex flex-col gap-6 uppercase banner-text-responsive sm:gap-10 md:block ${textColor}`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.05em",
            lineHeight: 1.1,
          }}
        >
          {titleParts.map((part, index) => (
            <span key={index} className="leading-none">
              {part}
            </span>
          ))}
        </h1>
      </div>
    </div>
  </div>

  <div className={`relative px-10 ${textColor}`}> 
    <div className="absolute inset-x-0 border-t-2 opacity-50" />

    <div className="py-10 sm:py-14 text-end max-w-[900px] ml-auto">
      <AnimatedTextLines
        text={text}
        className={`font-light value-text-responsive ${textColor}`}
      />
    </div>
  </div>
</div>

  );
};

export default AnimatedHeaderSection;