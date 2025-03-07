// export interface IMyProfile {
//   success: boolean;
//   message: string;
//   data: MyProfileData;
// }

export interface IMyProfileData {
  _id: string;
  user: MyProfileDataUser;
  name: string;
  email: string;
  phone: string;
  address: string;
  preferences: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MyProfileDataUser {
  _id: string;
  email: string;
  role: string;
}

// interface MyProfileDataPreferences {

// }
