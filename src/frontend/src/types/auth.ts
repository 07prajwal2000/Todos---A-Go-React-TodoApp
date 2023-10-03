export type LoginRequest = {
  Email: string;
  Password: string;
};

export type SignupRequest = {
	FirstName: string;
	LastName: string;
	Email: string;
	Password: string;
};

export type LoginResponse = {
  Message: string;
  Success: boolean;
  AccessToken: string;
  RefreshToken: string;
};

export type SignupResponse = {
  Message: string;
  Success: boolean;
};

// id": 1,
// "firstName": "prajwal",
// "lastName": "aradhya",
// "email": "manuaradhya07@gmail.com",
// "passwordHash": "",
// "createdAt": 1696319542,
// "verified": true,
// "blocked": false,
// "paymentType": 1

export enum PaymentType {
  Free = 1,
  Paid,
  Enterprise
}

export type UserProfile = {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  CreatedAt: string;
  Verified: string;
  PaymentType: PaymentType;
};