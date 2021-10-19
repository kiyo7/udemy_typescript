//lib
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

//hook
import { useMessage } from './useMessage';
import { useLoginUser } from './useLoginUser';

//type
import { User } from '../types/api/user';

export const useAuth = () => {
  const history = useHistory();

  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            const isAdmin = res.data.id === 10 ? true : false; //10番のみ編集可能
            setLoginUser({ ...res.data, isAdmin });
            showMessage({ title: 'ログインしました', status: 'success' });
            history.push('/home');
          } else {
            showMessage({ title: 'ユーザーが見つかりません', status: 'error' });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({ title: 'ログイン出来ません', status: 'error' });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );
  return { login, loading };
};
