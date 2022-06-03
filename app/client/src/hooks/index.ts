import { useMemo } from "react";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states/store";



export const useAppDispatch = () => {
    const dispatch = useDispatch<AppDispatch>();
    return useMemo(() => {
        return dispatch;
    }, [dispatch])
} 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;