export interface IAddressRequest {
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

export interface IUserRequest {
  name: string;
  email: string;
  password?: string;
  address: IAddressRequest;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  address: IAddressRequest;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserId {
  id: string;
  isActive: boolean;
}