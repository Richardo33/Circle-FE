import type { ThreadType } from "./thread";

export interface ProfileType {
  id: string;
  email: string;
  username: string;
  full_name: string;
  bio: string | null;
  profile_picture: string | null;
  backgroundPhoto: string | null;
  created_at: string;
  threads: ThreadType[];
}
