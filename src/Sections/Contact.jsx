import { useGSAP } from "@gsap/react"
import AnimatedHeaderSection from "../Components/AnimatedHeaderSection"
import Marquee from "../Components/Marquee"
import { socials } from "../Constants"
import gsap from "gsap"

const Contact = () => {
    const text = `I’m always open to new opportunities, collaborations, and interesting projects.  
    If you have something in mind, let’s talk.`
    const items = [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "SQL",
        "Redis",
        "RabbitMQ",
        "BullMQ",
        "gRPC",
        "WebSockets",
        "TailwindCSS",
        "GSAP",
        "Framer Motion",
        "Redux",
        "Zustand",
        "Firebase",
        "Microservices",
        "Docker",
        "REST APIs",
        "GraphQL",
        "HTML",
        "CSS",
        "JavaScript",
        "Shopify Liquid",
    ];
      
      
    useGSAP(() => {
        gsap.from(".social-link", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".social-link",
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
                once: false,
            },
        });
    }, []);
      

    useGSAP(() => {
        const links = document.querySelectorAll(".gsap-link");

        links.forEach((link) => {
            const underline = document.createElement("span");
            underline.className = "underline-effect";
            underline.style.cssText = `
                position: absolute;
                left: 0;
                bottom: 0;
                height: 2px;
                width: 0%;
                background: #E7E5D9;
                display: block;
                pointer-events: none;
            `;
            link.appendChild(underline);

            link.addEventListener("mouseenter", () => {
                gsap.to(underline, {
                    width: "100%",
                    duration: 0.3,
                    ease: "power2.out",
                });
            });

            link.addEventListener("mouseleave", () => {
                gsap.to(underline, {
                    width: "0%",
                    duration: 0.25,
                    ease: "power2.inOut",
                });
            });
        });
    }, []);
    
  return (
      <section id="contact" className="flex flex-col justify-between min-h-screen bg-[#F40C3F]">
             <div className="flex flex-col justify-between gap-16">
              <AnimatedHeaderSection
                  subTitle={"Let’s Build Something Together"}
                  title={"Contact"}
                  text={text}
                  textColor={"text-[#E7E5D9]"}
                  withScrollTrigger={true}
              />
              <div className="flex px-10 font-light text-[#E7E5D9] leading-none uppercase">
                  <div className="flex flex-col w-full gap-10">
                      <div className="social-link">
                          <h2 className="font-extrabold text-[clamp(0.9rem,2.5vw,1.25rem)] tracking-tight text-[#160000]" style={{ fontFamily: "'Manrope', sans-serif" }}>E-mail</h2>
                          <div className="w-full h-px my-2 bg-[#E7E5D9]" />
                          <a href="mailto:shivangramakanthariakar@gmail.com" className="gsap-link relative text-[clamp(1rem,3.2vw,1.75rem)] tracking-wider lowercase cursor-pointer">
                              shivangramakanthariakar@gmail.com
                          </a>
                      </div>
                      <div className="social-link">
                          <h2 className="font-extrabold text-[clamp(0.9rem,2.5vw,1.25rem)] tracking-tight text-[#160000]" style={{ fontFamily: "'Manrope', sans-serif" }}>Resume</h2>
                          <div className="w-full h-px my-2 bg-[#E7E5D9]" />
                          <a href={"https://drive.google.com/file/d/1nJqPcuaFPWhSTrezi8Tlt0C1rEdSX2qs/view?usp=drivesdk"} target="_blank" rel="noopener noreferrer" className="gsap-link relative text-[clamp(1rem,3.2vw,1.75rem)] tracking-wider lowercase cursor-pointer">
                              view resume →
                          </a>
                      </div>
                      <div className="social-link">
                          <h2 className="font-extrabold text-[clamp(0.9rem,2.5vw,1.25rem)] tracking-tight text-[#160000]" style={{ fontFamily: "'Manrope', sans-serif" }}>Elsewhere on the Web</h2>
                          <div className="w-full h-px my-2 bg-[#E7E5D9]" />
                          <div className="flex flex-wrap gap-2">
                              {socials.map((social, index) => (
                                  <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="gsap-link relative text-[clamp(0.65rem,2vw,0.85rem)] leading-loose tracking-wide uppercase" style={{ fontFamily: "'Manrope', sans-serif" }}>
                                      {`{ ${social.name} }`}
                                  </a>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
             </div>
          <Marquee items={items} className="text-[#F40C3F] bg-[#E7E5D9] font-bold tracking-widest"/>
      </section>
  )
}

export default Contact