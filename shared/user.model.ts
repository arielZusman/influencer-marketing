export type Users = {
  success: boolean;
  data: UserEntity[];
};

export type UserEntity = {
  user_id: string;
  username: string;
  fullname: string;
  picture: string;
  followers: number;
  is_verified: boolean;
};
