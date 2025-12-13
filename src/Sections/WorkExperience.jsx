import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { timelineData } from "../Constants";

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
    const containerRef = useRef(null);
    const railRef = useRef(null);
    const sectionRefs = useRef([]);
    const titleRefs = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
         
            gsap.fromTo(
                railRef.current,
                {
                    scaleY: 0,
                    opacity: 0,
                    transformOrigin: "top",
                },
                {
                    scaleY: 1,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 15%",
                        end: "bottom 70%",
                        scrub: 0.4,
                    },
                }
            );

            sectionRefs.current.forEach((section, i) => {
                gsap.from([section, titleRefs.current[i]], {
                    opacity: 0,
                    y: 60,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                        end: "top 40%",
                        scrub: 0.3,
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={containerRef}
            className="relative w-full bg-[#F40C3F] px-4 md:px-10 overflow-hidden"
        >
          
            <div className="max-w-7xl mx-auto py-20">
                <h2
                    className="text-2xl md:text-4xl lg:text-5xl mb-4 text-[#160000] max-w-4xl font-semibold"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                    My Professional Experience
                </h2>

                <p
                    className="text-[#E7E5D9] text-base md:text-lg max-w-sm font-medium"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                    A closer look at the roles I’ve worked in and the responsibilities I handled.
                </p>
            </div>

           
            <div className="relative max-w-7xl mx-auto pb-20">
              
                <div className="absolute left-6 top-0 h-full flex justify-center">
                    <div
                        ref={railRef}
                        className="w-1 h-full bg-[#E7E5D9] rounded-full"
                    />
                </div>

                {timelineData.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => (sectionRefs.current[i] = el)}
                        className="relative flex flex-col md:flex-row gap-6 pt-16"
                    >
                     
                        <div className="absolute left-6.5 -translate-x-1/2 h-10 w-10 md:h-12 md:w-12  bg-[#F40C3F] rounded-full p-2 z-10">
                            <img
                                src={item.logo}
                                alt={item.company}
                                className="w-full h-full object-cover"
                            />
                        </div>

                       
                        <h3
                            ref={(el) => (titleRefs.current[i] = el)}
                            className="pl-12 md:pl-20 text-lg md:text-3xl lg:text-4xl font-bold text-[#160000]"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            {item.title}
                        </h3>

                       
                        <div className="pl-12 md:pl-20 pr-2 md:pr-4 w-full">
                            <div className="space-y-4">
                                <p
                                    className="text-[#160000] font-medium leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    <strong>
                                        {item.company} — {item.role}
                                    </strong>
                                    <br />
                                    <span className="text-sm sm:text-base md:text-lg">
                                        {item.summary}
                                    </span>
                                </p>

                                <ul
                                    className="list-disc list-inside text-[#E7E5D9] font-medium space-y-2 text-xs sm:text-sm md:text-base lg:text-lg"
                                    style={{ fontFamily: "'Raleway', sans-serif" }}
                                >
                                    {item.points.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>

                                <p
                                    className="text-[#160000] font-medium text-xs sm:text-sm md:text-base"
                                    style={{ fontFamily: "'Manrope', sans-serif" }}
                                >
                                    <strong>Skills:</strong> {item.skills.join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkExperience;
