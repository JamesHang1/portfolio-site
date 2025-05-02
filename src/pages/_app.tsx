import type { AppProps } from "next/app";
import "@@/styles/globals.css";
import ScreenWidthDisplay from "./components/ScreenWidthDisplay";

export default function App({ Component, pageProps }: AppProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-svh flex flex-col justify-between">
      <ScreenWidthDisplay />
      <Component {...pageProps} />
      <footer className="flex justify-center p-4">&copy; {currentYear} James Hang</footer>
    </div>
  );
};
