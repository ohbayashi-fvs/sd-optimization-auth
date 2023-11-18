import { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import { Header } from "@/components/header";
import { SessionProvider } from "next-auth/react";

const noAuthRequired = ["/login"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  return (
    <>
      <Header />
      <Component {...pageProps} />

      {/* {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <SessionProvider session={session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      )} */}
    </>
  );
}
