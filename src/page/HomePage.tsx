import { useState, useRef, useEffect } from "react";
import ParticleBackground from '../particle/ParticleBackground';
import '../css/HomePage.css'

export default function HomePage() {

  const refHowItWorks = useRef<HTMLDivElement>(null);
  const refAbout = useRef<HTMLDivElement>(null);
  const refEvents = useRef<HTMLDivElement>(null);

  const isIntersectingHowItWorks = useIntersectionObserver(refHowItWorks);
  const isIntersectingAbout = useIntersectionObserver(refAbout);
  const isIntersectingEvents = useIntersectionObserver(refEvents);

  useEffect(() => {
    const applyAnimation = (ref: React.RefObject<HTMLDivElement>, section: string) => {
      if (section === "HowItWorks" && ref.current) {
        if (isIntersectingHowItWorks && ref.current) {
          ref.current.classList.toggle("slide-in", isIntersectingHowItWorks);
        } 
      } else if (section === "About" && ref.current) {
        if (isIntersectingAbout && ref.current) {
          ref.current.classList.toggle("slide-in", isIntersectingAbout);
        } 
      } else if (section === "Events" && ref.current) {
        if (isIntersectingEvents && ref.current) {
          ref.current.classList.toggle("slide-in", isIntersectingEvents);
        } 
      }
    };
  
    applyAnimation(refHowItWorks, "HowItWorks");
    applyAnimation(refAbout, "About");
    applyAnimation(refEvents, "Events");
  }, [isIntersectingHowItWorks, isIntersectingAbout, isIntersectingEvents]);
  

    const [activeSlide, setActiveSlide] = useState(1);
    
    const handleSlide = (slide: number) => {
        setActiveSlide(slide)
    }

  return (
    <div className="flex flex-col max-w-screen min-h-screen" id="home-container">
      <section className="flex flex-col w-full h-screen relative home-section" >

        <div className='absolute z-0'>
            <ParticleBackground />
        </div>

        <div className="flex flex-col m-auto z-10 h-1/3 justify-between items-center">
          <div className="flex flex-col gap-2 text-center w-full">
            <h1 className="text-8xl font-bold text-white">SIGNOAI</h1>
            <h3 className="text-2xl italic font-light text-white" style={{ letterSpacing: '4px' }}>
              Hand Sign Recognition
            </h3>
          </div>

          <div className="flex flex-col items-center gap-2 w-full">
            <button className="w-1/2 rounded-full shadow-sm hover:bg-slate-100">Try SignoAI</button>
            <span className="text-sm font-light text-white">Try our AI for free!</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col w-full min-h-screen z-10 bg-slate-50 ">
        <div className='flex flex-col w-4/6 h-screen mx-auto gap-2 py-8 mt-12 not-shown' ref={refHowItWorks}>
            <h3 className='text-xl text-violet-950'>How It Works</h3>
            <h2 className='text-3xl font-bold text-violet-950'>Translate Easily with SignoAI</h2>

            <div className='flex flex-row w-full h-12 justify-evenly gap-5 rounded-xl shadow-md mt-6 relative'>
                <div className={`flex items-center justify-center w-full rounded-xl text-lg font-semibold cursor-pointer ${activeSlide == 1 ? 'active-slide' : ''}`} onClick={() => handleSlide(1)}>
                    <h3>1&emsp;Start Test</h3>
                </div>
                <div className={`flex items-center justify-center w-full rounded-xl text-lg font-semibold cursor-pointer ${activeSlide == 2 ? 'active-slide' : ''}`}  onClick={() => handleSlide(2)}>
                    <h3>2&emsp;Activate Your Camera</h3>
                </div>
                <div className={`flex items-center justify-center w-full rounded-xl text-lg font-semibold cursor-pointer ${activeSlide == 3 ? 'active-slide' : ''}`}  onClick={() => handleSlide(3)}>
                    <h3>3&emsp;Get Result</h3>
                </div>
                <div id='slider-indicator' className='absolute w-1/3 h-full rounded-xl z-0' style={{ transform: `translateX(${(activeSlide - 2) * 100}%)` }}></div>
            </div>

            <div className='flex w-full bg-black mt-4 mb-2 shadow-md' style={{height: '75%'}}>

              {/* content */}

            </div>

            <div className=" flex items-center w-1/6 m-auto justify-center gap-4">
                <div className={`w-4 h-4 rounded-full slider-bullet ${activeSlide == 1 ? 'active-slider-bullet' : ''}`}></div>
                <div className={`w-4 h-4 rounded-full slider-bullet ${activeSlide == 2 ? 'active-slider-bullet' : ''}`}></div>
                <div className={`w-4 h-4 rounded-full slider-bullet ${activeSlide == 3 ? 'active-slider-bullet' : ''}`}></div>
            </div>



        </div>

        <div className='flex flex-col w-4/6 h-screen mx-auto gap-2 py-8 mt-4 not-shown' ref={refAbout}>
            <h3 className='text-xl text-violet-950'>About</h3>

          <div className='flex flex-row w-full h-full gap-6'>

            <div className='flex flex-col w-3/6 h-full gap-3'>
              <h2 className='text-3xl font-bold text-violet-950'>Empowering Inclusivity <br/> through SignoAi</h2>
              
              <span className='text-3xl mt-4 about-text'><b>SignoiAI</b> is dedicated to extending the advantages of artificial intelligence to everyone, 
                aligning with our commitment to make information universally accessible and useful.
              </span>
              
              <span className='text-3xl mt-2 about-text'>
                <b>SignoiAI</b> focuses on fostering inclusivity for the deaf community by developing cutting edge AI technology
                that translates hand signs. This innovative approach not only expands the boundaries of what's achievable but also
                addresses a specific need, making a meaningful impact on the lives of those who rely on sign languange.
                From groundbreaking research to seamless product integrations, SignoAI exemplifies our dedication to responsible innovation,
                ensuring that AI technologies benefit humanity at large.
              </span>

            </div>

            <div className=''>

            </div>

          </div>
          

        </div>

        

      </section>

      <section id='events-section' className="flex flex-col w-full min-h-screen z-10" >

      <div className='flex flex-col w-4/6 h-screen mx-auto gap-4 py-8 mt-12 not-shown' ref={refEvents}>
            <h3 className='text-xl text-slate-50'>Events</h3>
            <h2 className='text-3xl font-bold text-slate-50'>Catch up with the latest <br/> news of SignoAi</h2>

            <div className='flex w-3/4 bg-slate-50 mt-6 mx-auto rounded-xl shadow-md' style={{height: '65%'}}>

                {/* events content */}

            </div>


        </div>

      </section>

    </div>
  );
}

export const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "0px", threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};

