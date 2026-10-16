import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {baseApi} from '@/app/api/baseApi.ts';
import {favoritesSlice, favoritesReducer} from '@/pages/FavoritesPage/model/favoritesSlice.ts';
import {localstorage_key} from '@/shared/constants';
import {appReducer, appSlice} from '@/app/model/app-slice.ts';

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [favoritesSlice.name]: favoritesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

// сохраняем favorites в localStorage при изменениях
// guard для SSR
if (typeof window !== 'undefined') {
  let prev: string | null = null
  store.subscribe(() => {
    try {
      const state = store.getState()
      const serialized = JSON.stringify(state.favorites.items)
      // избежать лишних записей
      if (serialized !== prev) {
        localStorage.setItem(localstorage_key.favorites, serialized)
        prev = serialized
      }
    } catch (err) {
      console.error('Failed to persist favorites to localStorage', err)
    }
  })
}

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
