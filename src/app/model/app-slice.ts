import {createSlice} from '@reduxjs/toolkit';
import {localstorage_key} from '@/shared/constants';


const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    return  localStorage.getItem(localstorage_key.theme) || 'light'
  }
  return 'light';
};

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: getInitialTheme() as ThemeMode,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
      localStorage.setItem(localstorage_key.theme, state.themeMode)
    }),
  })
})

export const { selectThemeMode} = appSlice.selectors
export const { changeThemeModeAC} = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
