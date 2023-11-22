import { supabasePublicClient } from "@/lib/supabase";
import {
  ReactNode,
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import createUser from "@/pages/api/createUser";

type AuthCtx = {
  session: Session | null;
  loading: boolean;
  setLoading: any;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  createUser: ({
    app_metadata: { user_name },
    email,
    password,
  }: {
    app_metadata: { user_name: string };
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

type PartialAuthCtx = Partial<AuthCtx>;

const AuthContext = createContext<PartialAuthCtx>({});
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const auth = supabasePublicClient.auth;

  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  //session処理の実行中は画面を表示しないようにする
  useEffect(() => {
    let mounted = true;
    (async () => {
      const {
        data: { session },
      } = await auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
        setLoading(false);
      }
    })();
    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === "SIGNED_OUT") {
        setSession(null);
      }
    });
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // ログイン
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    // await auth.signInWithPassword({ email: email, password: password });
  };

  // 新規作成
  const createUser = async ({
    app_metadata: { user_name },
    email,
    password,
  }: {
    app_metadata: { user_name: string };
    email: string;
    password: string;
  }) => {
    await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify({
        user_name: user_name,
        email: email,
        password: password,
      }),
    }).then(() => router.push("/"));
  };

  // ログアウト
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    }).then(() => router.push("/login"));
  };

  const exposed = {
    session,
    loading,
    setLoading,
    createUser,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={exposed}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
