import { supabaseAdmin } from "@/lib/supabase";
import { Session } from "inspector";
import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";

type AuthCtx = {
  session: Session;
  loading: boolean;
  setLoading: any;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthCtx | null>(null);
const useAuth = () => useContext(AuthContext);

const Login = ({ children }: { children: ReactNode }) => {
  const auth = supabaseAdmin.auth;

  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session>();

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

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await auth.signInWithPassword({ email: email, password: password });
  };

  const exposed = {
    session,
    loading,
    setLoading,
    login,
  };

  return (
    <AuthContext.Provider value={exposed}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth, Login };
