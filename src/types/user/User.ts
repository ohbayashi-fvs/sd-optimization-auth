export type User = {
  id: string;
  app_metadata: {
    user_name: string;
  };
  email: string;
  last_sign_in_at: string;
};

export type Create = {
  app_metadata: {
    user_name: string;
  };
  email: string;
  password: string;
  passwordConf: string;
};

export type Edit = {
  app_metadata: {
    user_name: string;
  };
  email: string;
  password: string;
  passwordConf: string;
};
