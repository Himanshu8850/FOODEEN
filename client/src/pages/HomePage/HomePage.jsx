import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Landing() {
  const { user } = useAuth();

  const type = user.userType === "Restaurant" ? "restaurant" : "ngo";

  const { isDarkMode } = useDarkMode();

  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh",
          }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover opacity-70"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute bg-gradient-to-br from-black/60 via-purple-700/40 to-amber-500/40"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center justify-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 bg-white/50 rounded-lg p-6">
                  <h1 className="text-black font-semibold text-4xl font-serif drop-shadow-xl">
                    Where Food Meets Philanthropy.
                  </h1>
                  <p className="mt-4 text-lg text-black font-mono drop-shadow">
                    Empowering restaurants to donate surplus food while
                    supporting NGOs' missions for a hunger-free world.
                  </p>
                  <div className="hidden md:flex mt-4 justify-center gap-4">
                    <Link to={`/${type}/listings`}>
                      <button className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 shadow-lg">
                        Listings
                      </button>
                    </Link>
                    <Link to={`/${type}/profile`}>
                      <button className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 shadow-lg">
                        Profile
                      </button>
                    </Link>
                    <Link to={`/${type}/transactions`}>
                      <button className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 shadow-lg">
                        Transactions
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section
          className={`pb-20 -mt-24 bg-gradient-to-b from-slate-100/80 via-amber-50/70 to-rose-50/70 ${isDarkMode ? "from-slate-800/80 via-slate-900/70 to-black/70" : ""}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div
                  className={`relative flex flex-col min-w-0 break-words ${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} w-full mb-8 shadow-xl rounded-2xl border border-amber-100/60`}
                >
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Effortless Ordering Process
                    </h6>
                    <p className="mt-2 font-mono mb-4">
                      Streamlined chat interface for seamless communication,
                      ensuring easy and efficient placing of orders.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div
                  className={`relative flex flex-col min-w-0 break-words ${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} w-full mb-8 shadow-xl rounded-2xl border border-cyan-100/60`}
                >
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Optimal Route Optimization
                    </h6>
                    <p className="mt-2 font-mono mb-4">
                      Intuitive interface designed with both restaurants and
                      NGOs in mind, prioritizing accessibility and ease of use
                      for all users.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div
                  className={`relative flex flex-col min-w-0 break-words ${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} w-full mb-8 shadow-xl rounded-2xl border border-emerald-100/60`}
                >
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Real-time Communication
                    </h6>
                    <p className="mt-2 mb-4 font-mono">
                      Advanced verification protocols guarantee accurate
                      tracking of both fulfilled and cancelled orders,
                      maintaining transparency and trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div
                className={`w-full md:w-5/12 px-4 mr-auto ml-auto ${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} rounded-xl p-6`}
              >
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className="text-3xl mb-2 font-serif font-semibold leading-normal">
                  Spreading Love, One Meal at a Time 🍽️
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  In a world where kindness matters more than ever, our platform
                  unites restaurants and NGOs on a shared mission. With a
                  seamless interface, restaurants can effortlessly donate
                  surplus food while NGOs receive vital support, creating a
                  tapestry of compassion with every meal shared.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  Our platform empowers restaurants to turn surplus into smiles,
                  while NGOs gain access to nutritious meals to serve their
                  communities. Through intuitive tools and efficient systems,
                  every order fulfilled brings us closer to a world where hunger
                  is just a memory.
                </p>
                {/* <a
                  href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation"
                  className="font-bold text-gray-800 mt-8"
                >
                  Check Tailwind Starter Kit!
                </a> */}
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                    loading="lazy"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4 bg-pink-600">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block"
                      style={{
                        height: "95px",
                        top: "-94px",
                      }}
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-pink-600 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-serif font-bold text-white">
                      A Recipe for Change, Served with Compassion
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      Our user-friendly platform streamlines food donations from
                      restaurants to NGOs, making compassion accessible with
                      just a few clicks.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  loading="lazy"
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div
                  className={`md:pr-12 ${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} rounded-xl p-6`}
                >
                  <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-serif font-semibold">
                    Bringing Hearts Together Through Food 💕
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    In a world where hunger persists as a stark reality, we
                    invite you to join us in making a difference. Through our
                    platform, we facilitate the seamless donation of surplus
                    food from restaurants to NGOs, transforming abundance into
                    nourishment for those in need and forging a path towards a
                    brighter, more compassionate future.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">
                            Together, let's make a difference.
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">Every meal matters.</h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-gray-600">
                            Connect, donate, change lives.
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div
                className={`w-full lg:w-6/12 px-4 ${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} rounded-xl py-6`}
              >
                <h2 className="text-4xl font-serif font-semibold">
                  TECH-STACK
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                  Crafting dynamic, responsive web applications with MongoDB,
                  Express.js, React, and Node.js, styled effortlessly with
                  Tailwind CSS.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div
                  className={`${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} rounded-xl p-6`}
                >
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold">
                    React & Node.js
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Seamlessly combining frontend interactivity and backend
                    logic for a cohesive, full-stack web application experience.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div
                  className={`${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} rounded-xl p-6`}
                >
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-poll text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold">MongoDB</h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Harnessing the power of a flexible NoSQL database for
                    seamless data storage and retrieval.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div
                  className={`${isDarkMode ? "bg-gray-900/70 text-white" : "bg-white/70 text-gray-900"} rounded-xl p-6`}
                >
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold">Tailwind CSS</h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Streamlining UI development with utility-first CSS framework
                    for rapid styling and customization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="relative block py-24 lg:pt-0 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to work with us?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                      Complete this form and we will get back to you in 24 hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Full Name"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}
