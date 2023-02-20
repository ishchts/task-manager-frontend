import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { isAuth, logout as authLogout } from '../store/features/auth/auth-slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthUser = useAppSelector(isAuth);

  const logout = useCallback(() => {
    dispatch(authLogout());
  }, [dispatch]);

  return useMemo(() => ({ isAuthUser, logout }), [isAuthUser, logout]);
};
