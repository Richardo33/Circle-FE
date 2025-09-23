export interface User {
  id: string;
  username: string;
  name: string;
  profile_picture: string | null;
}

export interface ReplyType {
  id: string;
  content: string;
  image: string | null;
  created_at: string;
  user: User;
}

export interface ThreadType {
  id: string;
  content: string;
  image?: string | null;
  user: User;
  created_at: string;
  likes: number;
  reply: number;
  isLiked: boolean;
  totalPosts?: number;
}

export interface ThreadDetailType extends ThreadType {
  replies: ReplyType[];
}
