"use client";

import { useState } from "react";
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

  /* ---------------- HANDLERS ---------------- */
  const handleSubmit = async (e) => {
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

  const handleUser = (e) => setUserName(e.target.value);

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
            onClick={() => setOpen((prev) => !prev)}
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

            {/* ================= SEARCH FORM ================= */}
           <form
onSubmit={handleSubmit}
>
<div className='flex items-center bg-white rounded-full shadow-md p-2 w-full group'>
                {/* GitHub Logo inside search bar */}
                <div className='px-3 group-hover:animate-spin motion-reduce:group-hover:animate-none'>
 <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7 text-gray-600'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.172c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.588 8.199-6.084 8.199-11.385 0-6.627-5.373-12-12-12z' />
                  </svg>
                </div>

                {/* Search input */}

                <input
                  type="text"
                  placeholder="Search GitHub username..."
                  value={username}
                  onChange={handleUser}
                  className="flex-1 outline-none px-2"
                />

                <button
                  type="submit"
                  disabled={!username.trim() || loading}
                  className="ml-2 bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 disabled:opacity-50"
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
