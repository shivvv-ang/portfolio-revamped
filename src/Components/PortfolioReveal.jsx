import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { CustomEase } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9,0,0.1,1");

const numbers = [
    ["0", "0"],
    ["2", "7"],
    ["6", "5"],
    ["9", "8"],
    ["9", "9"],
];

const PortfolioReveal = () => {

    const counterRefs = useRef([]);
    const digitRefs = useRef([]);    
    const word1Ref = useRef(null);
    const word2Ref = useRef(null);
    const spinnerRef = useRef(null);
    const blocksRef = useRef([]);

    useGSAP(() => {

        gsap.set("body", {
            overflow: "hidden",
            position: "fixed",
            width: "100%"
          });

        const tl = gsap.timeline({
            delay: 0.3,
            defaults: { ease: "hop" },
        });

        counterRefs.current.forEach((count, index) => {
            const digits = Object.keys(digitRefs.current)
                .filter((key) => key.startsWith(`${index}-`)) 
                .map((key) => digitRefs.current[key]);

            tl.to(digits, {
                y: "0%",
                duration: 1,
                stagger: 0.075
            }, index * 1)

            if (index < counterRefs.current.length) {
                tl.to(digits, {
                    y: "-100%",
                    duration: 1,
                    stagger: 0.075
                }, index * 1 + 1)
            }
        })

        tl.to(spinnerRef.current, {
            opacity: 0,
            duration: 0.3
        })

        tl.to(".word h1", { y: "0%", duration: 1 }, "<")

        tl.to(word1Ref.current, {
            y: "100%",
            duration: 1,
            delay: 0.3
        })

        tl.to(word2Ref.current, {
            y: "-100%",
            duration: 1,
        }, "<");

        tl.to(blocksRef.current, {
            clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
            duration: 1,
            delay: 0.5,
        })

        tl.to(".portfolio-reveal-container", {
            autoAlpha: 0,
            pointerEvents: "none",
            duration: 0.5,
        });

        tl.set(".portfolio-reveal-container", { zIndex: -1 });

    
        tl.call(() => {
            gsap.set("body", {
                overflowY: "auto",
                position: "static"
            });
          });
    }, [])

    return (
        <div className='portfolio-reveal-container fixed top-0 left-0 w-screen h-screen overflow-hidden z-100'>
            <div className='absolute top-0 w-full h-full flex'>
                {Array(2)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            ref={(el) => (blocksRef.current[i] = el)}
                            className="block w-full h-full bg-[#E7E5D9]"
                            style={{ clipPath: "polygon(0% 0%,100% 0,100% 100%,0% 100%)" }}
                        ></div>
                    ))}
            </div>
            <div className="intro-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6">
                <div className='word relative ml-4 md:ml-6 lg:ml-8 xl:ml-10' id='word-1' style={{ clipPath: "polygon(0% 0%,100% 0,100% 100%,0% 100%)" }}>
                    <h1 ref={word1Ref} className='text-center text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-medium leading-none translate-y-[-120%] text-[#F40C3F]' style={{ fontFamily: "'Cormorant Garamond', serif" }}><span className='italic'>Shivang</span></h1>
                </div>
                <div className='word' id='word-2' style={{ clipPath: "polygon(0% 0%,100% 0,100% 100%,0% 100%)" }}>
                    <h1 ref={word2Ref} className='text-center text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-medium leading-none translate-y-[120%] text-[#F40C3F]' style={{ fontFamily: "'Cormorant Garamond', serif" }}><span className='italic'>Hariakar</span></h1>
                </div>
            </div>
            <div className='spinner-container absolute bottom-[10%] left-[50%] -translate-x-1/2'>
                <div ref={spinnerRef} className='spinner w-[50px] h-[50px] border-2 border-[#F40C3F] border-t-[#E7E5D9] rounded-full animate-spin'></div>
            </div>
            <div className='counter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2'>

                {numbers.map((pair, i) => (
                    <div
                        key={i}
                        ref={(el) => (counterRefs.current[i] = el)}
                        className="count absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex"
                        style={{ clipPath: "polygon(0% 0%,100% 0,100% 100%,0% 100%)" }}
                    >
                        {pair.map((digit, j) => {
                            const index = `${i}-${j}`; 
                            return (
                                <div
                                    key={j}
                                    ref={(el) => (digitRefs.current[index] = el)}
                                    className="digit flex-1 pt-4 font-medium text-[6rem] sm:text-[9rem] md:text-[12rem] lg:text-[15rem] relative translate-y-[150%] will-change-transform text-[#F40C3F]"
                                    style={{ clipPath: "polygon(0% 0%,100% 0,100% 100%,0% 100%)", fontFamily: "'Manrope', sans-serif" }}
                                >
                                    {digit}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PortfolioReveal