"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { FaMapMarkerAlt, FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Reset visibility on page load or refresh
    setIsVisible(false);
    
    // Trigger animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay for triggering animation

    // Cleanup the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only on mount (page refresh)

  const animatedStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0) scale(1.05)" : "translateY(40px) scale(0.95)",
    transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
  };

  return (
    <>
      <Head>
        <style jsx global>{`
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #1f1f1f;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #3b82f6;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #2563eb;
          }
        `}</style>
      </Head>

      <section className="flex items-center justify-between min-h-screen bg-gradient-to-r from-blue-900 via-gray-900 to-black pb-4 px-6 lg:px-12">
        <div className="w-full max-w-4xl mt-10">
          <div className="w-full text-left mb-4">
            <h1
              className="text-5xl font-bold text-white sm:text-6xl md:text-7xl lg:leading-tight"
              style={{ ...animatedStyle, transitionDelay: "0.5s" }}
            >
              Track Your Expenses Easily
            </h1>
          </div>

          {/* Second Line */}
          <div className="w-full text-left mb-4">
            <strong
              className="block text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent sm:text-6xl md:text-7xl lg:leading-tight"
              style={{ ...animatedStyle, transitionDelay: "1s" }}
            >
              Gain Control of Your Finances
            </strong>
          </div>

          {/* Website Description */}
          <div className="mt-200">
            <p
              className="text-lg text-gray-400 mt-4 leading-relaxed"
              style={{ ...animatedStyle, transitionDelay: "1.5s" }}
            >
              Welcome to Expensify, the ultimate tool to help you manage your expenses and
              keep track of your finances. Stay on top of your spending, create budgets, 
              and visualize your financial habits with ease.
            </p>
          </div>
        </div>

        {/* Piggy Bank Animation */}
        <div className="w-80 h-80 flex justify-center ml-12">
          <img
            src="piggy.png"
            alt="Piggy Bank Animation"
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-l from-blue-900 via-gray-900 to-black text-gray-400 py-6">
        <div className="max-w-screen-lg mx-auto px-6 flex flex-col lg:flex-row items-center lg:justify-between text-center lg:text-left gap-4">
          <p className="text-xl font-semibold flex items-center justify-center lg:justify-start">
            <FaMapMarkerAlt className="mr-2 text-blue-400" />
            <a href="https://www.daiict.ac.in" target="_blank" rel="noopener noreferrer">
              Dhirubhai Ambani Institute of Information and Communication Technology
            </a>
          </p>
          <p className="mt-4 lg:mt-0">Created by Students of DAIICT!</p>
          <a
            href="https://github.com/KkavyDave/IT314_G26_Expensify.git"
            className="text-blue-400 hover:text-blue-500 transition inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="mr-2" />
            GitHub Repo: Expensify Project
          </a>
          <p className="mt-2 lg:mt-0">Feel free to reach out or connect!</p>
        </div>
      </footer>
    </>
  );
}
