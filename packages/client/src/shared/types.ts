export type IUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  login: string;
  password: string;
  phone: string;
};

export type ILoginData = {
  login: string;
  password: string;
};
