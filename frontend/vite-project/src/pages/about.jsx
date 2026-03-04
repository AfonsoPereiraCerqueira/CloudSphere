import React from "react";
import Footer from "../components/footer";

const About = () => {

  return (
    <>
    <div className="flex flex-col items-center mt-6 lg:mt-40">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            About Us
        </h1>
        <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h2 className="text-4xl sm:text-6xl lg:text-4xl text-center tracking-wide">
                Welcome to <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">CloudSphere</span>
            </h2>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                At <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">CloudSphere</span>, we specialize in providing top-notch hosting and virtual machine solutions
                designed to meet the needs of individuals and businesses alike.
                Our mission is to offer a seamless, <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">fast</span>, and <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">accessible</span> interface for users to host their servers with <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">ease</span> and <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">efficiency</span>.
            </p>

            <h2 className="text-4xl sm:text-6xl lg:text-4xl text-center tracking-wide mt-10">
                Our Vision
            </h2>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                Founded with the goal of simplifying the hosting experience, <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">CloudSphere</span> aims to break down the barriers to entry and provide a
                platform that is both <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">powerful</span> and <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">user-friendly</span>. We believe
                that everyone should have the opportunity to leverage the power of <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">virtual machines</span> and <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">hosting services</span> without the complexities
                traditionally associated with them.
            </p>

            <h2 className="text-4xl sm:text-6xl lg:text-4xl text-center tracking-wide mt-10">
                Our Journey
            </h2>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                CloudSphere was born out of a desire to create a better hosting solution. As a solo <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">developer</span>,
                <br />I embarked on this journey to build a platform that combines high performance with intuitive design.
                Every feature and service offered by <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">CloudSphere</span> is a testament to my commitment to quality and innovation.
            </p>

            <h2 className="text-4xl sm:text-6xl lg:text-4xl text-center tracking-wide mt-20">
                Why choose us?
            </h2>

            <div className="flex flex-wrap mt-20 lg:mt-20 m-20">
              <div className="flex">
                <div className="flex">
                    <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                    <i class="fa-duotone fa-user"></i>
                    </div>
                    <div>
                    <h5 className="mt-1 mb-6 text-xl">User-Centric Design</h5>
                    <p className="text-md p-2 mb-20 text-neutral-500">Our interface is designed to be intuitive and easy to use,<br /> ensuring that even those new to hosting can navigate and manage their servers effortlessly.</p>
                    </div>
                    <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                    <i class="fa-duotone fa-gauge-circle-bolt"></i>
                    </div>
                    <div>
                    <h5 className="mt-1 mb-6 text-xl">Speed and Reliability</h5>
                    <p className="text-md p-2 mb-20 text-neutral-500">We prioritize speed and uptime, ensuring your servers run smoothly and efficiently around the clock.</p>
                    </div>
                    <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                    <i class="fa-duotone fa-people-arrows"></i>
                    </div>
                    <div>
                    <h5 className="mt-1 mb-6 text-xl">Affordable Solutions</h5>
                    <p className="text-md p-2 mb-20 text-neutral-500">
                        CloudSphere offers competitive pricing to make top-tier hosting services accessible to all.
                    </p>
                    </div>
                    </div>
                </div>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-4xl text-center tracking-wide">Join Us</h2>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
            Whether you are looking to host a small personal server or need robust virtual machines for your business,
            {" "}<span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">CloudSphere</span>
            {" "}is here to help. Join us on our journey to make hosting <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">faster</span>, <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">simpler</span>, and <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">more accessible</span>.
            </p>

            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                Thank you for choosing <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">CloudSphere</span>. Together, we can achieve great things in the cloud!
            </p>
        </div>
    </div>
    <Footer />
    </>
  );
};

export default About;
