import { TypeAnimation } from "react-type-animation"

function Hero() {
    return (
            <div className=" text-white flex flex-col justify-center relative">
                <div className="mx-auto">
                    <div className="relative ">
                        <div className="relative w-full h-full flex flex-col justify-center items-center ">
    
                            <div className=" w-full flex flex-col lg:flex-row">
                                {/* :HERO MAIN */}
                                <div className=" lg:mr-10 mr-0" >
                                    {/* ::Hero Inner */}
                                    <div className="p-5 flex flex-col justify-center items-center h-full lg:items-start text-center lg:text-left">
                                        {/* Hero Title */}
                                        <TypeAnimation
                                            sequence={[
                                                // Same substring at the start will only be typed once, initially
                                                'Online Auction,',
                                                1000,
                                                'Crop Prediction,',
                                                1000,
                                                'Disease Detection',
                                                1000,
                                            ]}
                                            speed={50}
                                            repeat={Infinity}
                                            className="text-2xl sm:text-[36px]"
                                        />
                                        <h1 className="py-10 text-3xl sm:text2xl font-light tracking-wide">Where seeds meet soil, <br/>dreams take root.</h1>
                                        {/* Starting Price */}
                                        <p className="text-lg font-semibold text-gray-500 tracking-wide"> Bid for the future of agriculture</p>

                                        {/* Buttons */}
                                        <div className="mt-10 flex flex-col sm:flex-row items-center">
                                            <button type="button" className="text-white bg-gradient-to-br rounded-full from-green-800 to-green-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium text-sm px-5 py-2.5 text-center">
                                                Let's Bid
                                            </button>
    
                                        </div>
                                    </div>
                                </div>
                                {/* :HERO ILLUSTRATION */}
                                <div className=" md:block hidden lg:ml-10 ml-0 md:p-5" >
                                    {/* <img src="./src/assets/hero7.jpg" alt="" className=" absolute z-10 top-[85px] start-[100px] h-[225px] w-[300px] hover:scale-110 transition duration-500 cursor-pointer rounded-md " /> */}

                                    <div className=" flex flex-row ">
                                    <img src="./src/assets/hero1.jpeg" alt="" className=" mr-5 h-[200px] w-[230px] hover:scale-110 transition duration-500 cursor-pointer rounded-md " />
                                    <img src="./src/assets/hero2.jpeg" alt="" className=" h-[200px] w-[230px] hover:scale-110 transition duration-500 cursor-pointer rounded-md" />
                                    </div>
                                    <div className=" flex flex-row mt-5 ">
                                        
                                    <img src="./src/assets/hero3.jpeg" alt="" className=" mr-5 h-[200px] w-[230px] hover:scale-110 transition duration-500 cursor-pointer rounded-md" />
                                    <img src="./src/assets/hero6.jpeg" alt="" className=" h-[200px] w-[230px] hover:scale-110 transition duration-500 cursor-pointer rounded-md" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Hero;