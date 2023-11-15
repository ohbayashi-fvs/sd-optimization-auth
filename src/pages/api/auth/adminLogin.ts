import { supabaseAdmin } from "@/lib/supabase";

export default function AdminLogin() {
  try {
    const auth = supabaseAdmin.auth;
    const login = async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await auth.signInWithPassword({ email: email, password: password });
    };
  } catch (e) {
    console.log(e);
  }
}
