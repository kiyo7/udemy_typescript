//lib
import { useContext } from 'react';

//context
import {
  LoginUserContext,
  LoginUserContextType,
} from '../provider/LoginUserProvider';

export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
