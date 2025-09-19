import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserResponse {
  id: string;
  email: string;
  full_name: string;
  username?: string;
  photo_profile?: string | null;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  username: string;
  avatar: string | null;
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
        full_name: userResp.full_name,
        username: userResp.username || userResp.email.split("@")[0],
        avatar: userResp.photo_profile ?? null,
      };

      state.token = action.payload.token;
      state.user = mappedUser;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(mappedUser));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
