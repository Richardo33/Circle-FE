import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
  [threadId: string]: {
    liked: boolean;
    count: number;
  };
}

const initialState: LikeState = {};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (
      state,
      action: PayloadAction<{ threadId: string; liked: boolean; count: number }>
    ) => {
      state[action.payload.threadId] = {
        liked: action.payload.liked,
        count: action.payload.count,
      };
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const threadId = action.payload;
      if (state[threadId]) {
        state[threadId].liked = !state[threadId].liked;
        state[threadId].count += state[threadId].liked ? 1 : -1;
      }
    },
  },
});

export const { setLikes, toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
