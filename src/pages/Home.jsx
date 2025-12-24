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
            <form onSubmit={handleSubmit} className="w-full max-w-xl">
              <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full group">
                {/* GitHub Logo inside search bar (inline svg to avoid missing import) */}
                <div className="px-3 group-hover:animate-spin motion-reduce:group-hover:animate-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-800"
                  >
                    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.93 3.19 9.11 7.61 10.59.56.1.76-.24.76-.54 0-.26-.01-1-.02-1.96-3.09.67-3.74-1.49-3.74-1.49-.51-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .17 1.57-.75 1.57-.75.92-1.57 2.42-1.12 3.01-.86.09-.67.39-1.12.71-1.38-2.47-.28-5.07-1.23-5.07-5.47 0-1.21.43-2.2 1.14-2.98-.11-.28-.5-1.41.11-2.95 0 0 .93-.3 3.05 1.14.88-.24 1.83-.37 2.77-.38.94.01 1.89.14 2.77.38 2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.22 2.67.11 2.95.71.78 1.14 1.77 1.14 2.98 0 4.25-2.61 5.19-5.09 5.47.4.35.76 1.04.76 2.1 0 1.52-.01 2.75-.01 3.12 0 .3.2.65.77.54C19.06 20.86 22.25 16.68 22.25 11.75 22.25 5.48 17.27.5 12 .5z" />
                  </svg>
                </div>

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
