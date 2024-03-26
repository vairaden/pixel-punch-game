export type IUser = {
  id: string;
  first_name: string;
  second_name: string;
  email: string;
  login: string;
  password: string;
  phone: string;
  avatar?: string;
};

export type ILoginData = {
  login: string;
  password: string;
};

export type IOAuthYandexLoginData = {
  code: string;
  redirect_uri: string;
};
