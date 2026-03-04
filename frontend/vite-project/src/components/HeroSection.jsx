import video1 from "../assets/coding.mp4";
import video2 from "../assets/coding2.mp4";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

const HeroSection = () => {
  
  const scrollToPricing = () => {
    scroll.scrollTo(3050, true);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-6 lg:mt-40">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          CloudSphere Building the future with <br />
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            {" "}
            powerful cloud tools.
          </span>
        </h1>
        <p className="mt-20 text-lg text-center text-neutral-500 max-w-4xl">
          Turn your ideas into reality with our high-performance virtual
          machines, offering scalability and reliability for all your projects.
        </p>
        <div className="flex justify-center my-10">
          <a
            href="#"
            onClick={scrollToPricing}
            className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
          >
            Join Us Now
          </a>
          <a href="/privacy" className="py-3 px-4 mx-3 rounded-md border">
            Privacy Policy
          </a>
        </div>
        <div className="flex mt-10 justify-center">
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-1/3 border border-orange-700 shadow-orange-400 mx-2 my-4"
          >
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-1/3 border border-orange-700 shadow-orange-400 mx-2 my-4"
          >
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
