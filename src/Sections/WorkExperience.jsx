import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { timelineData } from "../Constants";
gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);
    const sectionRefs = useRef([]);
    const titleRefs = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const totalHeight = container.scrollHeight;

            gsap.fromTo(
                lineRef.current,
                { height: 0, opacity: 0 },
                {
                    height: totalHeight,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 10%",
                        end: "bottom 60%",
                        scrub: true,
                    },
                }
            );

            sectionRefs.current.forEach((sec, i) => {
                gsap.from(sec, {
                    opacity: 0,
                    y: 80,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: sec,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: true,
                    },
                });

                gsap.to(titleRefs.current[i], {
                    y: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: sec,
                        start: "top 60%",
                        end: "top 20%",
                        scrub: true,
                    },
                });
            });
        });

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
                    A closer look at the roles I've excelled in and the responsibilities that have defined my career so far.
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto pb-20">
                <div
                    ref={lineRef}
                    className="absolute left-3 md:left-8 top-0 w-1 bg-[#E7E5D9] opacity-0 rounded-full"
                />

                {timelineData.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => (sectionRefs.current[i] = el)}
                        className="flex flex-col md:flex-row justify-start pt-10 md:pt-20 md:gap-10 relative"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 w-10 md:h-12 md:w-12 absolute left-0 md:left-2.5 flex items-center justify-center bg-[#F40C3F] rounded-full p-2">
                                <img src={item.logo} alt={item.company} className="w-full h-full object-cover" />
                            </div>

                            <h3
                                ref={(el) => (titleRefs.current[i] = el)}
                                className="text-sm md:text-3xl lg:text-4xl pl-12 md:pl-20 font-bold text-[#F40C3F] opacity-0 translate-y-5 mb-3 md:mb-0"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-12 pr-2 md:pl-4 md:pr-4 w-full">
                            <div className="p-4 md:p-8 space-y-4">
                                <p
                                    className="text-[#160000] font-medium leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[26px]"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    <strong>{item.company} — {item.role}</strong>
                                    <br />
                                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px]">
                                        {item.summary}
                                    </span>
                                </p>

                                <ul
                                    className="list-inside text-[#E7E5D9] font-medium space-y-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                                    style={{ fontFamily: "'Raleway', sans-serif" }}
                                >
                                    {item.points.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>

                                <p
                                    className="text-[#160000] font-medium mt-2 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg"
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