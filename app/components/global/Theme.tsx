// app/components/global/Theme.tsx

"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from "../assets/SunIcon";
import MoonIcon from "../assets/MoonIcon";

export default function Theme() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => {
        if (currentTheme === "light") {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
      className={`z-10 bg-transparent text-green-400 border dark:border-zinc-800 rounded-full p-2 duration-300 transition-transform ${currentTheme === "light" ? "-rotate-180" : "rotate-0"
        }`}
      aria-label="Toggle Theme"
    >
      {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}