import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type FavoriteMovie, getFavorites as getFavoritesFromStorage } from '@/shared/utils/getFavorites'
import { localstorage_key } from '@/shared/constants'

type FavoritesState = {
    items: FavoriteMovie[]
}

const readInitial = (): FavoriteMovie[] => {
    // Guard for SSR: only access localStorage in browser
    try {
        if (typeof window === 'undefined') return getFavoritesFromStorage() ?? []
        const stored = localStorage.getItem(localstorage_key.favorites)
        if (!stored) return getFavoritesFromStorage() ?? []
        return JSON.parse(stored) as FavoriteMovie[]
    } catch (err) {
        console.error('Failed to read favorites from storage', err)
        return getFavoritesFromStorage() ?? []
    }
}

const initialState: FavoritesState = {
    items: readInitial()
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        // setFavorites(state, action: PayloadAction<FavoriteMovie[]>) {
        //     state.items = action.payload
        // },
        // addFavorite(state, action: PayloadAction<FavoriteMovie>) {
        //     const exists = state.items.some((f) => f.id === action.payload.id)
        //     if (!exists) state.items.push(action.payload)
        // },
        // removeFavorite(state, action: PayloadAction<number>) {
        //     state.items = state.items.filter((f) => f.id !== action.payload)
        // },
        toggleFavorite(state, action: PayloadAction<FavoriteMovie>) {
            const exists = state.items.some((f) => f.id === action.payload.id)
            if (exists) {
                state.items = state.items.filter((f) => f.id !== action.payload.id)
            } else {
                state.items.push(action.payload)
            }
        }
    }
})

export const { toggleFavorite } = favoritesSlice.actions

// селекторы
export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.items
export const selectIsFavorite = (id: number) => (state: { favorites: FavoritesState }) =>
    state.favorites.items.some((f) => f.id === id)
export const favoritesReducer = favoritesSlice.reducer