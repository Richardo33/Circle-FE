export type AppUser = {
  id: string;
  email: string;
  full_name: string;
  username: string;
  avatar?: string | null;
  created_at?: string;
  name?: string;
};

export type AuthPayload = {
  token: string;
  user: AppUser;
};
