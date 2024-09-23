import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-6xl text-center">GITYZER</h1>
        <p className="text-center -ml-4 ">Take UI inspiration from <a className="text-center text-blue-500 cursor-pointer hover:underline" href="https://socialify.git.ci/">GitHub Socialify</a></p>
      </main>
    </div>
  );
}
