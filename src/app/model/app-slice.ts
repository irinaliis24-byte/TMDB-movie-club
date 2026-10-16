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
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
      localStorage.setItem(localstorage_key.theme, state.themeMode)
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(isPending, (state, action) => {
  //       if (
  //         todolistsApi.endpoints.getTodolists.matchPending(action) ||
  //         tasksApi.endpoints.getTasks.matchPending(action)
  //       ) {
  //         return
  //       }
  //       state.status = "loading"
  //     })
  //     .addMatcher(isFulfilled, (state) => {
  //       state.status = "succeeded"
  //     })
  //     .addMatcher(isRejected, (state) => {
  //       state.status = "failed"
  //     })
  // },
})

export const { selectThemeMode, selectAppError, selectIsLoggedIn } = appSlice.selectors
export const { changeThemeModeAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
