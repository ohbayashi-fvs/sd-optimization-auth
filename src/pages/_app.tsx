import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactNode, ReactElement, Suspense } from "react";
import { AuthProvider } from "../components/AuthProvider";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";
import "../styles/globals.css";
import { Header } from "@/components/header";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const noAuthRequired = ["/login", "/signup"];

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  return (
    <AuthProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Header />
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthProvider>
  );
}
