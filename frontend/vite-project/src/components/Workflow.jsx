import imgCode from "../assets/code.jpg";
import { checklistItems } from "../constants/constants";

const Workflow = () => {
  return (
    <>
      <div className="m-20">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
          Seamless Workflow
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            {" "}
            Management
          </span>
        </h2>
        <div className="flex flex-wrap justify-center m-20">
          <div className="p-2 w-full lg:w-1/2">
            <img src={imgCode} alt="code" className="rounded-lg" />
          </div>
          <div className="pt-12 w-full lg:w-1/2">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex mb-12 mt-10">
                <div className="flex text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-4 justify-center items-center rounded-full">
                  <i className="fa-duotone fa-check"></i>
                </div>
                <div>
                  <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                  <p className="text-md text-neutral-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workflow;
