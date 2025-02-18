import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AppState {
  sidebar: {
    isVisible: boolean;
  };
}

// Define the initial state using that type
const initialState: AppState = {
  sidebar: {
    isVisible: false,
  },
};

export const AppSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.isVisible = !state.sidebar.isVisible;
    },
  },
});
