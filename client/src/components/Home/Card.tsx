import { Tilt } from "react-tilt";
import "./home.css"

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 5, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 100, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.05,.98,.52,.99)", // Easing on enter/exit.
};

export default function Cards(props: { title: any; disc: any; imgSrc: any; even : boolean}) {
  const { title, disc, imgSrc , even } = props;

  return (
    <div className=" ">
      <Tilt options={defaultOptions}>
          <div className={`flex md:flex-row ${ even ? "md:flex-row-reverse" : "" } flex-col border md:justify-evenly justify-center max-h-[500px] items-center md:px-10 px-5 py-8 glassy-effect-hero border-gray-800 rounded-lg max-w-[1000px] mx-5 backgroud`}>
            <img
              className="md:w-52 md:h-52 w-1/2 md:mb-0 mb-6 "
              src={imgSrc}
              alt="No Image"
            />
            <div className=" max-w-[600px] md:px-5 px-2 ">
            <h5 className="mb-6 md:text-3xl text-xl font-medium text-white dark:text-white">
              {title}
            </h5>
            <span className="text-sm md:text-lg px-3 text-justify text-gray-400">
              {disc}
            </span>
            </div>
            
        </div>
      </Tilt>
    </div>
  );
}