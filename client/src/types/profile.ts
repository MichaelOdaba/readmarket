export interface RegisterFormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  avatar?: string;
}

export interface UserProfile extends ProfileFormData {
  _id: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Props {
  close: () => void;
}
