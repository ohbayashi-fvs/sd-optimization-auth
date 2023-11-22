import { AppProps } from "next/app";
import "../styles/globals.css";
import { Header } from "@/components/header";
import { useRouter } from "next/router";

const noAuthRequired = ["/login"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <div>
          <Header />
          <Component {...pageProps} />
        </div>
      )}
    </>
  );
}
