import React from "react";
import Footer from "../components/footer";

const Privacy = () => {
    return (
        <>
            <div className="flex flex-col items-center lg:mt-10">
                <h1 className="text-6xl">
                   Privacy <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">Policy</span> 
                </h1>

                <h2 className="text-4xl mt-20">Introduction</h2>
                <p className="mt-10 text-lg text-center text-neutral-400 max-w-4xl">
                    Welcome to CloudSphere! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website and use our hosting and virtual machine services.
                </p>

                <h2 className="text-4xl mt-10">
                    Information We Collect
                </h2>
                <h3 className="text-2xl mt-5">Personal Information</h3>
                <p className="mt-3 text-lg text-center text-neutral-400 max-w-4xl">We may collect personal information that you provide directly us, such as:</p>
                <ul className="list-disc mt-2 ml-10">
                    <li>Name</li>
                    <li>Email Address</li>
                    <li>Payment Information</li>
                    <li>Contact Details</li>
                </ul>

                <h3 className="text-2xl mt-5">Usage Information</h3>
                <p className="mt-3 text-lg text-center text-neutral-400 max-w-4xl">We automatically collect certain information about your device and how you interact with our site, including:</p>
                <ul className="list-disc mt-2 ml-10">
                    <li>IP Address</li>
                    <li>Browser Type</li>
                    <li>Pages Visited</li>
                    <li>Time spent on each page</li>
                </ul>

                <h2 className="text-4xl mt-10">How We Use Your Information</h2>
                <p className="mt-3 text-lg text-center text-neutral-400 max-w-4xl">We use the information collected for various purposes, including:</p>
                <ul className="list-disc mt-2 ml-10">
                    <li>Providing, operating, and maintaining our services</li>
                    <li>Processing transactions and managing payments</li>
                    <li>Improving user experience on our site</li>
                    <li>Sending communications, including service updates and promotions</li>
                    <li>Complying with legal and regulatory obligations</li>
                </ul>

                <h2 className="text-4xl mt-10">Sharing Your Information</h2>
                <p className="mt-3 text-lg text-center text-neutral-400 max-w-4xl">We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                <ul className="list-disc mt-2 ml-10">
                    <li>Services providers who help us operate our site and provide our services</li>
                    <li>Legal authorities, if required to comply with the law or protect our rights</li>
                </ul>

                <h2 className="text-4xl mt-10">Security  of Your Information</h2>
                <p className="mt-3 text-lg text-center text-neutral-400 max-w-4xl">We implement appropriate security measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction.
                    However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.
                </p>

                <h2 className="text-4xl mt-10">Your Rights</h2>
                <p className="mt-3 text-lg text-center text-neutral-400 max-w-4xl">You have the right access, correct, update or delete your personal information. To exercise these rights, please contact us using the details provide below</p>
            
                <h2 className="text-4xl mt-10">Changes to This Privacy Policy</h2>
                <p className="mt-3 text-lg text-center text-neutral-400 max-w-4xl">We may update this Privacy Policy periodically. Any changes will be posted on this page, and the revision date will be updated. We encourage
                    you to review this policy regulary to stay informed about how we are protecting your information.
                </p>

                <h2 className="text-4xl mt-10">Contact</h2>
                <p className="mt-3 text-lg text-center text-neutral-400 max-w-4xl">If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className="list-disc mt-2 ml-10">
                    <li>Email: cloudshpere@cloudshpere.com</li>
                    <li>Address: Example Street, 123, Porto, Portugal</li>
                </ul>
            
            </div>
            <Footer />
        </>
    )
};

export default Privacy;