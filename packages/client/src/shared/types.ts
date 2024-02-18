export type ILeader = {
  id: string;
  firstName: string;
  lastName: string;
  score: number;
};

export type IUser = {
  id: string;
  first_name: string;
  second_name: string;
  email: string;
  login: string;
  password: string;
  phone: string;
};

export type ILoginData = {
  login: string;
  password: string;
};
