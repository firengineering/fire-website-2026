import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <div className="flex flex-col min-h-screen">
        <Component {...pageProps} />
        <Footer />
      </div>      
    </ChakraProvider>
  );
}
