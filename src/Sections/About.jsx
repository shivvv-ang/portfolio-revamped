import { useRef } from "react"
import AnimatedHeaderSection from "../Components/AnimatedHeaderSection"
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
    const imgRef = useRef();
    const text = `Self-taught developer with a deep love for building and improving things.`
  const aboutText = `I got into programming because I love exploring, building, and solving problems. 
    I began with machine learning and Flutter, then shifted into full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB.
    
    Along the way, I picked up tools like Redux, Zustand, Tailwind, sockets, gRPC, RabbitMQ, BullMQ, Redis, and Firebase—building projects end-to-end and learning by doing.
    
    Coming from a mechanical engineering background, I taught myself CS fundamentals like DSA, DBMS, and OOP through online courses and consistent practice.
    
    I enjoy debugging, understanding why systems break, optimizing performance, and contributing to clean, scalable architectures.
    `

useGSAP(() => {

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        toggleActions: "play reverse play reverse", 
      },
    });
  });
  return (
    <section id="about" className="min-h-screen w-screen bg-[#E7E5D9]">
        <AnimatedHeaderSection
            subTitle={"Code, Explore, Build"}
            title={"About"}
            text={text}
        textColor={"text-[#F40C3F]"}
            withScrollTrigger={true}
        />
        <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-medium tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-[#160000]">
            <img 
              ref={imgRef}
              src={" /Images/NotMe.jpg"}
              alt="Not Me LOL"
              className="w-md rounded-3xl"
            />
        <AnimatedTextLines text={aboutText} className={"w-full font-medium"}/>
        </div>
    </section>
  )
}

export default About