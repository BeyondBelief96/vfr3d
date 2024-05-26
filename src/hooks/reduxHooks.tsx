import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/store';
import { Dispatch } from '@reduxjs/toolkit';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch: () => Dispatch = useDispatch;
