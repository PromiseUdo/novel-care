// components/topbar.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import Image from "next/image";

const languages = [
  { code: "en", name: "English", flag: "/flag-uk.png" },
  { code: "es", name: "Spanish", flag: "/flag-uk.png" },
  { code: "fr", name: "French", flag: "/flag-uk.png" },
  { code: "de", name: "German", flag: "/flag-uk.png" },
];

const Topbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [translateError, setTranslateError] = useState(false);
  const [isTranslateInitialized, setIsTranslateInitialized] = useState(false);

  const initializeGoogleTranslate = useCallback(() => {
    if (window.google && window.google.translate) {
      console.log("Initializing Google Translate");
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((lang) => lang.code).join(","),
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setIsTranslateInitialized(true);
    } else {
      console.error("Google Translate not available");
      setTranslateError(true);
    }
  }, []);

  useEffect(() => {
    // Load saved language
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) {
      const lang = languages.find((l) => l.code === savedLang) || languages[0];
      setSelectedLanguage(lang);
    }

    // Load Google Translate script
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      console.log("Loading Google Translate script");
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        console.error("Failed to load Google Translate script");
        setTranslateError(true);
      };
      script.onload = () => console.log("Google Translate script loaded");
      document.body.appendChild(script);

      window.googleTranslateElementInit = initializeGoogleTranslate;
    } else if (window.google && window.google.translate) {
      initializeGoogleTranslate();
    }

    return () => {
      window.googleTranslateElementInit = () => {};
    };
  }, [initializeGoogleTranslate]);

  useEffect(() => {
    if (isTranslateInitialized) {
      console.log(`Changing language to: ${selectedLanguage.code}`);
      const el = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (el) {
        el.value = selectedLanguage.code;
        el.dispatchEvent(new Event("change"));
      } else {
        console.error("Google Translate combo box not found");
        setTranslateError(true);
      }
    }
  }, [selectedLanguage, isTranslateInitialized]);

  const handleLanguageChange = (language: (typeof languages)[0]) => {
    console.log(`Selected language: ${language.name}`);
    setSelectedLanguage(language);
    localStorage.setItem("selectedLanguage", language.code);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full bg-[#FAE4D180] h-[60px] flex items-center">
      <MaxWidthWrapper>
        <div className="w-full flex items-center justify-end">
          <div className="flex items-center gap-[16px]">
            <Link
              href="/contact"
              className="font-montserrat text-sm hover:text-primary"
            >
              Contact Us
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <Image
                  src={selectedLanguage.flag}
                  alt={`${selectedLanguage.name} flag`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <svg
                  className="w-4 h-4 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-montserrat text-foreground hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      <Image
                        src={language.flag}
                        alt={`${language.name} flag`}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div
              id="google_translate_element"
              style={{ display: "none" }}
            ></div>
            {translateError && (
              <p className="text-red-500 text-sm font-montserrat">
                Translation service unavailable
              </p>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Topbar;
