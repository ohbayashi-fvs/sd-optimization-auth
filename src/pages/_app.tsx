import "../styles/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Header } from "@/components/header";

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
