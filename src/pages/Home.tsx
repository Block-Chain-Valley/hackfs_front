import React, { useRef, useState } from "react";
import About from "./About";
import Contact from "./Contact";

function Home({ sectionRefs }: { sectionRefs: any }) {
  return (
    <main>
      <div ref={sectionRefs[0]}>
        <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Welcome to our company
          </h1>
          <p className="mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            consequat metus vitae enim accumsan, sed congue sapien ultrices.
            Mauris nec ante ante. Maecenas scelerisque, tellus vel fermentum
            eleifend, nisl mi bibendum felis, sed posuere magna nibh at urna.
          </p>
        </div>

        <div className="bg-gray-50">
          <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Our Team
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Meet our team
              </p>
              <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
                Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
                magnam voluptatum cupiditate veritatis in accusamus quisquam.
              </p>
            </div>

            <div className="mt-10">
              <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
                <li>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        {/* Heroicon name: globe-alt */}
                        <svg
                          className="h-6 w-6"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 9l2 2m0 0l7 7 7-7m-7 7V3"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg leading-6 font-medium text-gray-900">
                        Competitive exchange rates
                      </h4>
                      <p className="mt-2 text-base leading-6 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsa libero labore natus.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div ref={sectionRefs[1]}>
        <About />
      </div>

      <div ref={sectionRefs[2]}>
        <Contact />
      </div>
    </main>
  );
}

export default Home;
