import { useRef } from "react";
import AnimatedHeaderSection from "../Components/AnimatedHeaderSection";
import { skillsData } from "../Constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Skills = () => {
    const text = `I build full-stack apps that run smoothly
    with clean interfaces and reliable flow
    no surprises.`;

    const serviceRefs = useRef([]);
    const isDesktop = useMediaQuery({ minWidth: "48rem" });

    useGSAP(() => {
        serviceRefs.current.forEach((el) => {
            if (!el) return;

            gsap.from(el, {
                y: 200,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                },
                duration: 1,
                ease: "circ.out",
            });
        });
    }, []);
    
    return (
        <section
            id="skills"
            className="w-screen min-w-screen bg-[#F40C3F]"
        >
            <AnimatedHeaderSection
                subTitle="My Expertise & Technical Proficiency"
                title="Skills"
                text={text}
                textColor="text-[#E7E5D9]"
                withScrollTrigger
            />

            {skillsData.map((skill, index) => {

                return (
                    <div
                        key={index}
                        ref={(el) => (serviceRefs.current[index] = el)}
                        className="sticky px-10 pt-6 pb-12 text-[#E7E5D9] bg-[#F40C3F] border-t-2"
                        style={
                            isDesktop
                                ? {
                                    top: `calc(10vh + ${index * 5}em)`,
                                    marginBottom: `${(skillsData.length - index - 1) * 5}rem`,
                                }
                                : { top: 0 }
                        }
                    >
                        <div className="flex items-center justify-between gap-4 font-light">
                            <div className="flex flex-col gap-6">
                               
                                <h2
                                    className="text-4xl lg:text-5xl text-[#160000] tracking-wide font-bold"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    {skill.title}
                                </h2>

                                <p
                                    className="text-xl leading-relaxed tracking-widest lg:text-2xl font-medium"
                                    style={{ fontFamily: "'Manrope', sans-serif" }}
                                >
                                    {skill.description}
                                </p>

                                <div
                                    className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-[#E7E5D9] font-semibold"
                                    style={{ fontFamily: "'Raleway', sans-serif" }}
                                >
                                    {skill.items.map((item, itemIndex) => (
                                        <div key={`item-${index}-${itemIndex}`}>
                                            <h3 className="flex">
                                                <span className="mr-12 text-lg text-[#160000] font-extrabold">
                                                    0{itemIndex + 1}
                                                </span>
                                                {item.title}
                                            </h3>

                                            {itemIndex < skill.items.length - 1 && (
                                                <div className="w-full h-px my-2 bg-[#160000]" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default Skills;
