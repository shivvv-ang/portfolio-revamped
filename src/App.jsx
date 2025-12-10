import Navbar from './Sections/Navbar'
import Hero from './Sections/Hero'
import SkillsSummary from './Sections/SkillsSummary'
import Skills from './Sections/Skills'
import ReactLenis from 'lenis/react'
import About from './Sections/About'
import Projects from './Sections/Projects'
import WorkExperience from './Sections/WorkExperience'
import Contact from './Sections/Contact'
import ProblemSolving from './Sections/ProblemSolving'


const App = () => {
  return (
    <ReactLenis root className='relative w-screen min-h-screen overflow-x-auto'>
      <Navbar />
      <Hero />
      <SkillsSummary />
      <ProblemSolving />
      <Skills />
      <Projects />
      <WorkExperience />
      <About />
      <Contact /> 
    </ReactLenis>
  )
}

export default App