import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
    <Image 
      src="/logo-main.png"
      alt="FiRE+ Logo"
      width={150}
      height={150}
    />
     <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            FiRE+ Website
          </h1>
        </div>
    <Footer/>
    </>
  );
}
