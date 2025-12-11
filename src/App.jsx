import React, { useEffect, useState, Suspense } from "react";
import ReactLenis from "lenis/react";
import Hero from "./Sections/Hero";

const Navbar = React.lazy(() => import("./Sections/Navbar"));
const SkillsSummary = React.lazy(() => import("./Sections/SkillsSummary"));
const Skills = React.lazy(() => import("./Sections/Skills"));
const About = React.lazy(() => import("./Sections/About"));
const Projects = React.lazy(() => import("./Sections/Projects"));
const WorkExperience = React.lazy(() => import("./Sections/WorkExperience"));
const Contact = React.lazy(() => import("./Sections/Contact"));
const ProblemSolving = React.lazy(() => import("./Sections/ProblemSolving"));

const App = () => {
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const handleIntent = () => {
      setLoadRest(true);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("scroll", handleIntent);
      window.removeEventListener("wheel", handleIntent);
      window.removeEventListener("touchstart", handleIntent);
    };

    window.addEventListener("scroll", handleIntent, { passive: true });
    window.addEventListener("wheel", handleIntent, { passive: true });
    window.addEventListener("touchstart", handleIntent, { passive: true });

  
    const timeout = setTimeout(() => setLoadRest(true), 1200);

    return () => {
      removeListeners();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden">

      <Navbar />
      <Hero />

      {loadRest && (
        <Suspense
          fallback={
            <div className="w-full flex justify-center py-12">
              <span className="animate-pulse text-gray-400 text-sm">
                Loading sections…
              </span>
            </div>
          }
        >
          <SkillsSummary />
          <ProblemSolving />
          <Skills />
          <Projects />
          <WorkExperience />
          <About />
          <Contact />
        </Suspense>
      )}
    </ReactLenis>
  );
};

export default App;
