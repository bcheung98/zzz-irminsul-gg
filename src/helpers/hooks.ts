import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "rtk/store"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()