export type UserType = {
  id: string;
  app_metadata: {
    user_name: string;
  };
  email: string;
  last_sign_in_at: string;
  deleted_at: Date;
};

export type UserCreateType = {
  app_metadata: {
    user_name: string;
  };
  email: string;
  password: string;
  passwordConf: string;
};

export type UserEditType = {
  app_metadata: {
    user_name: string;
  };
  email: string;
  password: string;
  passwordConf: string;
};
