import { useSelector } from "react-redux"
import type {RootState} from '@/app/model';

export const useAppSelector = useSelector.withTypes<RootState>()
