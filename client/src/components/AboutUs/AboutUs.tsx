import React, { useEffect } from "react";

const AboutUs = () => {
  const info = [
    {
      name: "Mandar Parekh",
      role: "Software Developer",
      imgUrl: "/mandar.jpeg",
    },
    {
      name: "Sandip Lakhatariya",
      role: "Software Developer",
      imgUrl: "/sandip.jpeg",
    },
    {
      name: "Abhay Gohel",
      role: "Software Developer",
      imgUrl: "/abhay.jpeg",
    },
    {
      name: "Rushi Sureja",
      role: "Software Developer",
      imgUrl: "/rushi.jpg",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-4xl font-medium title-font mb-4 text-white">
              OUR TEAM
            </h1>
          </div>
          <div className="flex flex-wrap justify-center -m-4">
            {info.map((information) => {
              return (
                <div className="px-4 lg:w-1/4 md:w-1/2">
                  <div className="h-full flex flex-col items-center text-center mb-8">
                    <img
                      alt="team"
                      className={`flex-shrink-0 rounded-full w-56 h-56  mb-4 object-cover object-center ${information.name === "Rushi Sureja" ? "backdrop-brightness-100 backdrop-blur-2xl" : ""} `}
                      src={information.imgUrl}
                    />
                    <div className="w-full">
                      <h2 className="title-font font-medium text-white text-xl py-2">
                        {information.name}
                      </h2>
                      <h3 className="text-gray-300 text-lg mb-3">
                        {information.role}
                      </h3>
                      <span className="inline-flex">
                        <a className="text-gray-500" href="https://www.facebook.com" target="_blank">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                          </svg>
                        </a>
                        <a className="ml-2 text-gray-500" href="https://www.twitter.com" target="_blank">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                          </svg>
                        </a>
                        <a className="ml-2 text-gray-500" href="https://www.messenger.com" target="_blank">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke-width="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                          </svg>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
