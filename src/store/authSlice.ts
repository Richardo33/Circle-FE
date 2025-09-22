import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  name: string;
  bio?: string | null;
  profile_picture?: string | null;
  backgroundPhoto?: string | null;
  created_at: string;
  threads?: {
    id: string;
    content: string;
    image?: string | null;
    created_at: string;
  }[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  bio?: string | null;
  profile_picture: string | null;
  backgroundPhoto: string | null;
  created_at: string;
  threads?: {
    id: string;
    content: string;
    image?: string | null;
    created_at: string;
  }[];
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: UserResponse }>
    ) => {
      const userResp = action.payload.user;

      const mappedUser: User = {
        id: userResp.id,
        email: userResp.email,
        username: userResp.username,
        full_name: userResp.name ?? "",
        bio: userResp.bio ?? null,
        profile_picture: userResp.profile_picture ?? null,
        backgroundPhoto: userResp.backgroundPhoto ?? null,
        created_at: userResp.created_at,
        threads: userResp.threads ?? [],
      };

      state.token = action.payload.token;
      state.user = mappedUser;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(mappedUser));
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
