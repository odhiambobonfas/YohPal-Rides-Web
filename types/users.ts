export type UserType = "driver" | "customer";

export interface BaseUser {
  userId: string;
  email: string;
  userType: UserType;
  photoURL: string;
  phone: string;
  verified: boolean;
  displayName: string;
}

export type RidesUser = BaseUser & {
  createdAt: string;
  lastLogin: string;
};

export interface AuthUser {
  email: string;
  password: string;
  role: UserType;
}

export interface AuthUserLogin {
  email: string;
  password: string;
}
