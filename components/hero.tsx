// "use client";

// import React, { useState, useEffect } from "react";
// import { Button } from "./ui/button";

// const slides = [
//   {
//     bgImage: "/hero1-bg.png",
//     title: "High quality care support service is what we do",
//     description:
//       "Novel Care Services aligns with ideals of the National Disability Insurance Scheme (NDIS) and performs the function of supporting people with disability.",
//   },
//   {
//     bgImage: "/hero2-bg.png",
//     title: "Empowering lives with compassionate care",
//     description:
//       "We provide personalized support to enhance independence and quality of life for individuals with disabilities.",
//   },
//   {
//     bgImage: "/hero3-bg.png",
//     title: "Your trusted partner in disability support",
//     description:
//       "Our dedicated team ensures every individual receives tailored care to thrive in their community.",
//   },
// ];

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   // Auto-scroll effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsTransitioning(true);
//       setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000); // Change slide every 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   // Reset transitioning state after animation
//   useEffect(() => {
//     const timer = setTimeout(() => setIsTransitioning(false), 1000);
//     return () => clearTimeout(timer);
//   }, [currentSlide]);

//   // Handle dot click
//   const handleDotClick = (index: number) => {
//     setIsTransitioning(true);
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="relative h-[810px] w-full overflow-hidden">
//       {/* Background Images */}
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
//             currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
//           }`}
//           style={{
//             backgroundImage: `url('${slide.bgImage}')`,
//           }}
//         ></div>
//       ))}

//       {/* D-Shaped Overlay with Linear Gradient */}
//       <svg
//         className="absolute inset-0 z-20"
//         width="52%"
//         height="100%"
//         viewBox="0 0 960 810"
//         preserveAspectRatio="none"
//       >
//         <path
//           d="M0 0H480C720 0 960 180 960 405C960 630 720 810 480 810H0V0Z"
//           fill="url(#gradient)"
//         />
//         <defs>
//           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" style={{ stopColor: "rgba(27, 15, 74, 1)" }} />
//             <stop
//               offset="100%"
//               style={{ stopColor: "rgba(64, 36, 176, 0.2)" }}
//             />
//           </linearGradient>
//         </defs>
//       </svg>

//       {/* Text Content and Navigation Dots */}
//       <div className="relative z-30 flex h-full flex-col justify-between px-2.5 md:px-8 lg:px-[100px] py-8">
//         {/* Text Content */}
//         <div className="text-white max-w-xs relative pt-16 ">
//           {slides.map((slide, index) => (
//             <div
//               key={index}
//               className={`absolute transition-opacity  duration-1000 ease-in-out ${
//                 currentSlide === index
//                   ? "opacity-100"
//                   : "opacity-0 pointer-events-none"
//               }`}
//             >
//               <h1 className="text-4xl md:text-6xl leading-[100%] font-normal mb-4">
//                 {slide.title}
//               </h1>
//               <p className="text-base leading-[28px] mb-6">
//                 {slide.description}
//               </p>
//               <Button className="px-[16px] rounded-[64px] bg-[#E67817] text-black font-semibold hover:bg-[#d16c14]">
//                 Learn more
//               </Button>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Dots */}
//         <div className="flex justify-start space-x-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleDotClick(index)}
//               className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                 currentSlide === index ? "bg-[#E67817]" : "bg-white opacity-50"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             ></button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const slides = [
  {
    bgImage: "/hero1-bg.png",
    title: "High quality care support service is what we do",
    description:
      "Novel Care Services aligns with ideals of the National Disability Insurance Scheme (NDIS) and performs the function of supporting people with disability.",
  },
  {
    bgImage: "/hero2-bg.png",
    title: "Empowering lives with compassionate care",
    description:
      "We provide personalized support to enhance independence and quality of life for individuals with disabilities.",
  },
  {
    bgImage: "/hero3-bg.png",
    title: "Your trusted partner in disability support",
    description:
      "Our dedicated team ensures every individual receives tailored care to thrive in their community.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Reset transitioning state after animation
  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 1000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Handle dot click
  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[810px] w-full overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url('${slide.bgImage}')`,
          }}
        ></div>
      ))}

      {/* D-Shaped Overlay with Linear Gradient */}
      <svg
        className="absolute inset-0 z-20"
        width="52%"
        height="100%"
        viewBox="0 0 960 810"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H480C720 0 960 180 960 405C960 630 720 810 480 810H0V0Z"
          fill="url(#gradient)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "rgba(27, 15, 74, 1)" }} />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(64, 36, 176, 0.2)" }}
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Text Content and Navigation Dots */}
      <div className="relative z-30 flex h-full flex-col justify-between px-2.5 md:px-8 lg:px-[80px] py-10">
        {/* Text Content */}
        {/* Applied w-[18rem] and overflow-hidden to enforce consistent width; added text-wrap to inner content */}
        <div className="text-white w-[18rem] pt-16 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute max-w-[40%] flex flex-col items-start gap-[24px] text-wrap transition-opacity duration-1000 ease-in-out ${
                currentSlide === index
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Reduced font size from text-4xl md:text-6xl to text-3xl md:text-5xl for better width control */}
              <h1 className=" text-3xl md:text-[64px] leading-[100%] font-normal ">
                {slide.title}
              </h1>
              <p className="text-base leading-[28px]">{slide.description}</p>
              <Button className="px-[16px] rounded-[64px] bg-[#E67817] text-black font-semibold hover:bg-[#d16c14]">
                Learn more
              </Button>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-start space-x-2 mb-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === index ? "bg-[#E67817]" : "bg-white opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
