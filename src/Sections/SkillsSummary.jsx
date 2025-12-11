import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger,SplitText);
const SkillsSummary = () => {

  useGSAP(()=>{
    const titleHeading = gsap.utils.toArray(".title h1");
    const splits = [];

    titleHeading.forEach((heading) => {
      const split = SplitText.create(heading, {
        type: "chars",
      })
      splits.push(split);

      split.chars.forEach((char, i) => {
        const charInitialY = i % 2 == 0 ? -150 : 150;
        gsap.set(char, {
          y: charInitialY,
        })
      })
    })

    const titles = gsap.utils.toArray(".title");

    titles.forEach((title, index) => {
      const titleContainer = title.querySelector(".title-container");
      const titleContaineInitialX = index % 2 == 0 ? -100 : 100;
      const split = splits[index];
      const charCount = split.chars.length;

      ScrollTrigger.create({
        trigger: title,
        start: "top bottom",
        end: "top -25%",
        scrub: true,
        onUpdate: (self) => {

          const titleContainerX = titleContaineInitialX - self.progress * titleContaineInitialX;
          gsap.set(titleContainer, {
            x: `${titleContainerX}%`
          });

          split.chars.forEach((char, i) => {
            let charStaggerIndex;
            if (index == 1) {
              charStaggerIndex = charCount - 1 - i;
            } else {
              charStaggerIndex = i;
            }

            const charStartDelay = 0.1;
            const charTimelineSpan = 1 - charStartDelay;
            const staggerFactor = Math.min(0.75, charTimelineSpan * 0.75);
            const delay = charStartDelay + (charStaggerIndex / charCount) * staggerFactor;
            const duration = charTimelineSpan - (staggerFactor * (charCount - 1)) / charCount;
            const start = delay;

            let charProgress = 0;
            if (self.progress >= start) {
              charProgress = Math.min(1, (self.progress - start) / duration);
            }

            const charInitialY = i % 2 == 0 ? -150 : 150;
            const charY = charInitialY - charProgress * charInitialY;
            gsap.set(char, {
              y: charY
            })
          })
        }
      })
    })
  },[])

  return (
    <section
      className="
    animated-titles 
    relative w-full overflow-hidden text-center"
    >
      
      <div className="title h-[65svh] flex items-center bg-[#E7E5D9]">
        <div className="title-container relative w-full flex justify-center items-center will-change-transform px-6">
          <h1
            className="
          text-[#160000]
          font-[Manrope] font-extrabold tracking-tight leading-none

          text-[2rem]          
          sm:text-[2.6rem]     
          md:text-[3.2rem]    
          lg:text-[4rem]      
          xl:text-[4.75rem]   
        "
          >
            Full-Stack Development
          </h1>
        </div>
      </div>

     
      <div className="title h-[65svh] flex items-center bg-[#F40C3F]">
        <div className="title-container relative w-full flex justify-center items-center will-change-transform px-6">
          <h1
            className="
          text-[#160000]
          font-[Manrope] font-extrabold tracking-tight leading-none

          text-[2rem]
          sm:text-[2.6rem]
          md:text-[3.2rem]
          lg:text-[4rem]
          xl:text-[4.75rem]
        "
          >
            Frontend State & Animations
          </h1>
        </div>
      </div>

     
      <div className="title h-[65svh] flex items-center bg-[#E7E5D9]">
        <div className="title-container relative w-full flex justify-center items-center will-change-transform px-6">
          <h1
            className="
          text-[#160000]
          font-[Raleway] font-bold tracking-tight leading-tight

          text-[1.8rem]
          sm:text-[2.4rem]
          md:text-[3rem]
          lg:text-[3.5rem]
          xl:text-[4rem]
        "
          >
            Backend APIs · Real-Time Messaging · Job Queues
          </h1>
        </div>
      </div>

      <div className="title h-[65svh] flex items-center bg-[#F40C3F]">
        <div className="title-container relative w-full flex justify-center items-center will-change-transform px-6">
          <h1
            className="
          text-[#160000]
          font-[Manrope] font-extrabold tracking-tight leading-none

          text-[2rem]
          sm:text-[2.6rem]
          md:text-[3.2rem]
          lg:text-[4rem]
          xl:text-[4.75rem]
        "
          >
            Databases & Cloud
          </h1>
        </div>
      </div>
    </section>
  )
}

export default SkillsSummary