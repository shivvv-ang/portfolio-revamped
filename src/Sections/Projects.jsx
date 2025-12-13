import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { projectData } from "../Constants";

gsap.registerPlugin(ScrollTrigger);


const Projects = () => {

  const stickySectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const countContainerRef = useRef(null);


  const cardsRef = useRef([]);


  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };


  useGSAP(() => {
    const stickySection = stickySectionRef.current;
    const cards = cardsRef.current;
    const countContainer = countContainerRef.current;
    const totalCards = cards.length;

    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;

    const getRadius = () => {
      const w = window.innerWidth;
      if (w < 640) return w * 5;
      if (w < 1024) return w * 3.5;
      return w * 2.5;
    };

    function positionCards(progress = 0) {
      const radius = getRadius();
      const totalTravel = 1 + totalCards / 7.5;
      const adjustedProgress = (progress * totalTravel - 1) * 0.75;

      cards.forEach((card, i) => {
        const normalized = (totalCards - 1 - i) / totalCards;
        const cardProgress = normalized + adjustedProgress;
        const angle = startAngle + arcAngle * cardProgress;

        gsap.set(card, {
          x: Math.cos(angle) * radius,
          y: -Math.sin(angle) * radius + radius,
          rotation: -(angle - Math.PI / 2) * (180 / Math.PI),
          force3D: true,
        });
      });
    }

    function updateCounter(progress) {
      const index = Math.min(
        totalCards - 1,
        Math.floor(progress * totalCards)
      );

      const lineHeight =
        countContainer.querySelector("h1")?.offsetHeight || 0;

      gsap.to(countContainer, {
        y: lineHeight - index * lineHeight,
        duration: 0.3,
        ease: "power1.out",
        overwrite: true,
      });
    }

    positionCards(0);

    const mm = gsap.matchMedia();

   
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * (totalCards - 2)}`,
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          positionCards(self.progress);
          updateCounter(self.progress);
        },
      });
    });

  
    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * (totalCards - 1.5)}`,
        pin: true,
        scrub: 0.2,
        pinType: "fixed",
        onUpdate: (self) => {
          positionCards(self.progress);
          updateCounter(self.progress);
        },
      });
    });

   
    mm.add("(max-width: 639px)", () => {
      ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: `+=${window.innerHeight * (totalCards - 1)}`,
        pin: true,
        scrub: false, 
        pinType: "fixed",
        onUpdate: (self) => {
          positionCards(self.progress);
          updateCounter(self.progress);
        },
      });
    });

    return () => mm.revert(); 
  }, { scope: stickySectionRef });
  

  return (
    <section
      id="projects"
      ref={stickySectionRef}
      className="steps relative w-screen h-svh  overflow-hidden  bg-[#E7E5D9] p-4"
    >
 
      <div className="step-counter absolute flex flex-col space-y-2">
        <h1
          className="uppercase font-black leading-none tracking-[-0.04em] text-[clamp(40px,10vw,120px)]"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Projects
        </h1>

        <div className="count relative h-[clamp(50px,12vw,140px)] overflow-hidden -top-1 md:top-0 z-10">
          <div
            className="count-container relative will-change-transform translate-y-[clamp(40px,12vw,140px)]"
            ref={countContainerRef}
          >
            {["01", "02", "03", "04"].map((num) => (
              <h1
                key={num}
                className="uppercase font-black  text-[clamp(40px,12vw,140px)] leading-none tracking-[-0.04em]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {num}
              </h1>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={cardsContainerRef}
        className="cards absolute top-[25%] left-[50%] w-full h-full -translate-x-1/2 -translate-y-1/2"
      >
        {projectData.map((data, index) => (
          <a
            target="_blank" rel="noopener noreferrer" href={data.ctaLink} 
            key={index}
            ref={addCardRef}
            className="
              card absolute bg-[#F40C3F] border-[6px] border-[#160000]
              w-[340px] sm:w-80 md:w-96 lg:w-[420px]
              h-[580px] sm:h-[620px] md:h-[680px]
              left-1/2 top-1/2 
              flex flex-col
              p-4 sm:p-5 md:p-6 rounded-2xl 
              shadow-[0_0_25px_rgba(244,12,63,0.3)]
              "
          >
        
            <div className="flex items-center justify-between mb-3 md:mb-4 shrink-0">
              <h2
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#160000] line-clamp-1 pr-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {data.title}
              </h2>

              <span
                className="text-base sm:text-lg md:text-xl font-extrabold text-[#E7E5D9] whitespace-nowrap"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                ✦ XP {data.xp}
              </span>
            </div>

            <div className="rounded-xl overflow-hidden border-4 border-[#160000] shadow-inner h-36 sm:h-40 md:h-48 mb-3 md:mb-4 shrink-0">
              <img className="w-full h-full object-cover" src={data.image} alt={data.title} />
            </div>

            <div className="mb-8 shrink-0">
              <p
                className="text-xs sm:text-sm md:text-base text-[#160000] font-medium leading-relaxed line-clamp-4"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {data.description}
              </p>
            </div>

            <div className="mb-3 md:mb-4 grow overflow-y-auto scrollbar-thin scrollbar-thumb-[#F40C3F] scrollbar-track-transparent">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {data.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-1 bg-[#E7E5D9] text-[#F40C3F] text-[10px] sm:text-xs font-semibold rounded-xl shadow-lg whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t-2 border-[#160000] pt-3 md:pt-4 text-[#160000] font-medium shrink-0 mt-auto">
              <div className="text-[10px] sm:text-xs md:text-sm w-1/2 pr-1 sm:pr-2">
                <span className="font-bold">Weakness:</span> {data.weakness}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm w-1/2 text-right pl-1 sm:pl-2">
                <span className="font-bold">Retreat:</span> {data.retreatCost}
              </div>
            </div>
          </a>
        ))}
        {["01", "02"].map((index) => (<div key={index} ref={addCardRef} className=" card absolute bg-[#F40C3F] border-[5px] border-[#160000]
            max-w-sm md:max-w-md lg:max-w-lg 2xl:max-w-xl
            left-1/2 top-1/2 
            flex flex-col gap-5 p-5 rounded-xl shadow-lg opacity-0"> </div>))}
      </div>
    </section>
  );
};

export default Projects;
