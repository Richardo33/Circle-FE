export interface UserType {
  id: string;
  username: string;
  full_name: string;
  profile_picture: string | null;
  isFollowing: boolean;
}
