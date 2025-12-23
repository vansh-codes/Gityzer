"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Typewriter from "typewriter-effect";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const val = username.trim();
    if (!val) {
      toast.error("Please enter a valid username.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: val }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          router.push(`/${val}`);
        } else {
          toast.error("Username does not exist on GitHub");
        }
      } else {
        toast.error("Error verifying username.");
      }
    } catch {
      toast.error("Unexpected error occurred.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  /* ---------------- JSX ---------------- */
  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 z-50 w-full bg-black text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-bold">
            Gityzer
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <Link href="#features">Features</Link>
            <Link href="#demo">Demo</Link>
            <Link href="#docs">Docs</Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-4 pb-4 space-y-2 bg-black">
            <Link onClick={() => setOpen(false)} href="#features" className="block">
              Features
            </Link>
            <Link onClick={() => setOpen(false)} href="#demo" className="block">
              Demo
            </Link>
            <Link onClick={() => setOpen(false)} href="#docs" className="block">
              Docs
            </Link>
          </div>
        )}
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <main className="pt-16">
        <Toaster />

        <div className="flex flex-col justify-between min-h-[92vh] md:min-h-[94vh] lg:min-h-[90vh]">
          <main className="flex flex-col justify-center items-center flex-grow px-8 sm:px-4">
            <h1 className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-widest mb-8">
              <Typewriter
                options={{
                  cursor:
                    "<span style='color:#fff; animation: blink 1s infinite;'>|</span>",
                }}
                onInit={(typewriter) => {
                  const animate = () => {
                    typewriter
                      .typeString("Let's, Begin...")
                      .pauseFor(1000)
                      .deleteAll()
                      .pauseFor(1000)
                      .start();
                    setTimeout(animate, 2000);
                  };
                  animate();
                }}
              />
            </h1>

            <form
  className="flex items-center w-full sm:w-2/3 lg:w-1/3"
  onSubmit={handleSubmit}
>
  <div className="w-full">
    <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full group">
      {/* GitHub Logo inside search bar */}
      <div className="px-3 group-hover:animate-spin motion-reduce:group-hover:animate-none">
        <GitHubIcon />
      </div>

      <input
        className="w-full px-4 py-2 text-gray-700 bg-white focus:outline-none text-base md:text-lg"
        value={username}
        onChange={handleUser}
        autoFocus
      />
    </div>
  </div>

  <button>
    {/* button content */}
  </button>
</form>


      <button
                  type="submit"
                  disabled={!username.trim() || loading}
                  className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 disabled:opacity-50"
                >
                  →
                </button>
              </div>
            </form>
          </main>

          {loading && <Loader message="Verifying username..." />}
          <Footer />
        </div>
      </main>
    </>
  );
}

