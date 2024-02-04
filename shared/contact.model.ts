export type UserContactResponse = {
  success: boolean;
  user_profile: UserProfile;
};

export type UserProfile = {
  user_id: string;
  username: string;
  url: string;
  picture: string;
  fullname: string;
  contacts: Contact[];
};

export type Contact = {
  type: string;
  value: string;
  formatted_value: string;
};
