import "../styles/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Header } from "@/components/header";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const noAuthRequired = ["/auth/authLoginPage"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <div>
          <QueryClientProvider client={queryClient}>
            <Header />
            <Component {...pageProps} />
          </QueryClientProvider>
        </div>
      )}
    </>
  );
}
