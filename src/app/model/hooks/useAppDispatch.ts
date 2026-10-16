import { useDispatch } from "react-redux"
import type {AppDispatch} from '@/app/model';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
