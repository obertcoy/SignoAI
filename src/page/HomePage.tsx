import { useState } from 'react';
import ParticleBackground from '../particle/ParticleBackground';
import '../css/HomePage.css'

export default function HomePage() {


    const [activeSlide, setActiveSlide] = useState(1);
    
    const handleSlide = (slide: number) => {
        setActiveSlide(slide)
    }

  return (
    <div className="flex flex-col max-w-screen min-h-screen">
      <section className="flex flex-col w-full h-screen relative">

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

      <section className="flex flex-col w-full min-h-screen z-10 py-10 bg-slate-50">
        <div className='flex flex-col w-4/6 h-full mx-auto gap-2'>
            <h3 className='text-xl font-semibold text-violet-950'>How It Works</h3>
            <h2 className='text-3xl font-bold text-violet-950'>Translate Easily with SignoAI</h2>

            <div className='flex flex-row w-full h-12 justify-evenly gap-5 rounded-xl shadow-md mt-8 relative'>
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

            <div className='flex w-full bg-black mt-6 mb-2' style={{height: '65vh'}}>

            </div>

            <div className=" flex items-center w-1/6 m-auto justify-center gap-4">
                <div className="w-6 h-6 rounded-full slider-bullet"></div>
                <div className="w-6 h-6 rounded-full slider-bullet"></div>
                <div className="w-6 h-6 rounded-full slider-bullet"></div>
            </div>



        </div>

        <div>
        


        </div>

      </section>
    </div>
  );
}
