"use client";
import { useState, useEffect } from "react";

interface Props {
  user: string;
}

export default function StylishGreetingWithVerse({ user }: Props) {
  const [greeting, setGreeting] = useState("");
  const [verseHtml, setVerseHtml] = useState<string | null>(null);
  const [verseRef, setVerseRef] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1) Greeting
    const h = new Date().getHours();
    setGreeting(
      h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening"
    );

    // 2) Fetch verse via our API
    // fetch("/api/verse-of-day")
    //   .then((res) => {
    //     if (!res.ok) throw new Error(`Status ${res.status}`);
    //     return res.json();
    //   })
    //   .then((data: { reference: string; html: string; error?: string }) => {
    //     if (data.error) throw new Error(data.error);
    //     setVerseRef(data.reference);
    //     setVerseHtml(data.html);
    //   })
    //   .catch((err) => {
    //     console.error("Client fetch /api/verse-of-day:", err);
    //     setError("Could not load today’s verse");
    //   });
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#6F4E37] via-[#A67B5B] to-[#D9C1A3] p-4 rounded-2xl shadow-md mb-6">
      {/* Greeting */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
        {greeting && (
          <>
            {greeting}
            {user && ", "}
          </>
        )}
        {user && (
          <span className="decoration-[#D9C1A3] decoration-2">{user}</span>
        )}
        {greeting && user && "!"}
      </h2>
      <p className="mt-1 text-sm sm:text-base text-[#F3E9DC] italic">
        Hope you’re brewing up something great today ☕️
      </p>

      {/* Verse of the Day */}
      <div className="mt-4 p-3 bg-white/20 rounded-lg text-[#F3E9DC]">
        {error ? (
          <p className="text-sm text-red-200">{error}</p>
        ) : verseHtml ? (
          <>
            <div className="text-xs uppercase tracking-wide mb-1">
              {verseRef}
            </div>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: verseHtml }}
            />
          </>
        ) : (
          <p className="text-sm">Loading verse…</p>
        )}
      </div>
    </div>
  );
}
