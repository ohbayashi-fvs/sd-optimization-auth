import { Session } from "inspector";

export type Login = {
  email: string;
  password: string;
};

export type Logout = {
  email: string;
  password: string;
};

export type AuthCtx = Partial<{
  session: Session;
  loading: boolean;
  setLoading: any;
}>;
