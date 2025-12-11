import  { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { platforms } from "../Constants";

gsap.registerPlugin(ScrollTrigger);

const ProblemSolving = () => {
 
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !numberRefs.current.includes(el)) {
      numberRefs.current.push(el);
    }
  };

  useGSAP(
    () => {
      numberRefs.current.forEach((el, index) => {
        const wrapper = el.parentElement;
        const label = wrapper.querySelector(".label");
        const line = wrapper.querySelector(".line");


        wrapper.addEventListener("mouseenter", () => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power2.out",
              transformOrigin: "left center"
            }
          );
        });

        wrapper.addEventListener("mouseleave", () => {
          gsap.set(line, { scaleX: 1 });
        });

        const endValue = platforms[index].solved;
        let counter = { val: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          counter,
          { val: 0 },
          {
            val: endValue,
            duration: 2,
            ease: "power1.out",
            onUpdate: () => {
              el.innerText = Math.round(counter.val);
            },
          }
        );

     
        tl.fromTo(
          label,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=1.4"
        );

        tl.fromTo(
          line,
          { scaleX: 0, opacity: 0.15 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            transformOrigin: "left center",
          },
          "-=1"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="bg-[#E7E5D9] py-20 sm:py-28 md:py-36 px-6 sm:px-10"
    >
      <h2
        className="text-center font-serif mb-16 sm:mb-24 md:mb-32 
                 text-[2.5rem] sm:text-[4rem] md:text-[5rem] text-[#160000]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Coding & Problem-Solving Stats
      </h2>

      <div
        className="
        max-w-6xl mx-auto
        grid 
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-16 sm:gap-20 md:gap-24
      "
      >
        {platforms.map((p) => (
          <a target="_blank" rel="noopener noreferrer" href={p.ctaLink} key={p.name} className="relative cursor-pointer">
              <p
                ref={addToRefs}
                className="
                font-bold text-[#F40C3F] leading-none
                text-[4rem] 
                sm:text-[5rem]
                md:text-[6rem]
                lg:text-[7rem]
                xl:text-[8rem]
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
              >
                0
              </p>

              <span
                className="
                label
                absolute top-1 right-1
                text-[8px] sm:text-[9px] md:text-[10px]
                tracking-widest text-[#160000] uppercase
              "
              style={{
                fontFamily: "'Raleway', sans-serif",
              }}
              >
                {p.name}
              </span>

              <div className="line mt-3 sm:mt-4 h-0.5 w-12 sm:w-16 bg-[#D22]/40"></div>
            </a>
        ))}
      </div>
    </section>
  );
};

export default ProblemSolving;
