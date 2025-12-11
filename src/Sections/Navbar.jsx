import  { useCallback, useEffect, useRef, useState } from "react";
import { socials } from "../Constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from 'lenis/react'

const Navbar = () => {
  const lenis = useLenis();
  const navref = useRef();
  const linksref = useRef([]);
  const contactref = useRef(null);
  const toplineref = useRef(null);
  const bottomlineref = useRef(null);
  const tl = useRef(null);
  const itl = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    const sections = ["home","Stats","skills", "projects", "experience", "about", "contact"];

    const handleScroll = () => {
      let closest = "home";
      let minDistance = Infinity;

      sections.forEach((sec) => {
        const el = document.getElementById(sec);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < minDistance) {
          minDistance = distance;
          closest = sec.charAt(0).toUpperCase() + sec.slice(1);
        }
      });

      setCurrentSection(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
   
    gsap.set(navref.current, { xPercent: 100 });
    gsap.set(linksref.current, { autoAlpha: 0, y: 30, scale: 0.95 });
    gsap.set(contactref.current, { autoAlpha: 0, y: 20 });

    tl.current = gsap.timeline({ paused: true });
    tl.current
      .to(navref.current, { xPercent: 0, duration: 1, ease: "power3.out" })
      .to(
        linksref.current.filter(Boolean),
        { autoAlpha: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.65, ease: "power3.out" },
        "<+0.15"
      );

    itl.current = gsap.timeline({ paused: true });
    itl.current
      .to(toplineref.current, { rotate: 45, y: 3.3, duration: 0.3, ease: "power2.inOut" }, 0)
      .to(bottomlineref.current, { rotate: -45, y: -3.3, duration: 0.3, ease: "power2.inOut" }, 0);
  });


  const toggleMenu = useCallback(() => {
    const tlInstance = tl.current;
    const itlInstance = itl.current;
    const contact = contactref.current;

    if (isOpen) {
      tlInstance?.reverse();
      itlInstance?.reverse();

      gsap.to(contact, {
        autoAlpha: 0,
        y: 220,
        duration: 0.9,
        ease: "power2.in",
      });
    } else {
      tlInstance?.play();
      itlInstance?.play();

      gsap.to(contact, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    }
    setIsOpen((p) => !p);
  }, [isOpen]);
  



  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const burgerClipPath = isOpen
    ? "circle(75% at 50% 50%)"
    : showBurger
    ? "circle(50% at 50% 50%)"
    : "circle(0% at 50% 50%)";


  const sections = ["Home","Stats", "Skills", "Projects", "Experience", "About", "Contact"];


  function getDynamicDuration(currentSection, targetSection) {

    const fromIndex = sections.indexOf(currentSection);
    const toIndex = sections.indexOf(targetSection);

    const distance = Math.abs(fromIndex - toIndex);

    const durations = [1.2, 1.8, 2.4, 3.0, 3.7, 4.5];
 
    return durations[distance] || 1.5;
    }


  useGSAP(() => {
    const hoverLinks = document.querySelectorAll(".gsap-hover");

    hoverLinks.forEach((link) => {
      const underline = document.createElement("span");
      underline.className = "underline-effect";
      underline.style.cssText = `
          position: absolute;
          left: 0; bottom: -2px;
          height: 2px;
          width: 0%;
          background:#F40C3F;
          display: block;
          pointer-events: none;
        `;
      link.style.position = "relative";
      link.appendChild(underline);

      link.addEventListener("mouseenter", () => {
        gsap.to(underline, {
          width: "100%",
          duration: 0.28,
          ease: "power2.out",
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(underline, {
          width: "0%",
          duration: 0.22,
          ease: "power2.inOut",
        });
      });
    });
    });


  useEffect(() => {
    const handleClick = () => {
      if (isOpen) toggleMenu();
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [isOpen,toggleMenu]);

  return (
    <>
      <nav
        ref={navref}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-[#E7E5D9] text-[#F40C3F] py-8 gap-y-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
          {["Home","Stats" ,"Skills", "Projects", "Experience","About","Contact"].map((section, index) => (
            <div key={index} ref={(el) => (linksref.current[index] = el)}>
              <div
                onClick={() => {

                  const duration = getDynamicDuration(currentSection, section);

                  lenis?.scrollTo(`#${section.toLowerCase()}`, {
                    duration,
                    easing: (t) => t < 0.5
                      ? 4 * t * t * t
                      : 1 - Math.pow(-2 * t + 2, 3) / 2
                  });
                  toggleMenu();

                }}
                className="transition-all duration-300 cursor-pointer text-[#F40C3F]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {section}
              </div>
            </div>
          ))}
        </div>

        <div ref={contactref} className="flex flex-col flex-wrap justify-between gap-8 md:flex-row">
          <div className="font-semibold">
            <p className="tracking-wider text-[#160000] font-[Raleway]">E-mail</p>
            <a href="mailto:shivangramakanthariakar@gmail.com" className="gsap-hover text-base md:text-xl tracking-widest lowercase text-[#F40C3F] font-[Manrope]">
              shivangramakanthariakar@gmail.com
            </a>
          </div>

          <div className="font-semibold">
            <p className="tracking-wider text-[#160000] font-[Raleway]">Connect With Me</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="gsap-hover text-sm leading-loose tracking-widest uppercase transition-colors duration-300 text-[#F40C3F] font-[Manrope]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div
        onClick={(e) => {
          e.stopPropagation(); 
          toggleMenu();
        }}
        style={{ clipPath: burgerClipPath }}
        className="burger-button fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-[#E7E5D9] border-[#F40C3F] border rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
      >
        <span
          ref={toplineref}
          className="block w-8 h-0.5 bg-[#F40C3F] rounded-full origin-center"
        ></span>
        <span
          ref={bottomlineref}
          className="block w-8 h-0.5 bg-[#F40C3F] rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;
