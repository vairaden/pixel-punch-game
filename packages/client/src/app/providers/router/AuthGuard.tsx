import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/app/constants/paths';
import { useLazyGetUserInfoQuery } from '@/shared/api/authApi';

export const AuthGuard: React.FC<PropsWithChildren> = props => {
  const navigate = useNavigate();
  const [getUserInfo] = useLazyGetUserInfoQuery();

  useEffect(() => {
    getUserInfo()
      .unwrap()
      .catch(error => {
        if (error.status === 401) {
          navigate(paths.signIn);

          return;
        }

        navigate(paths.error);
      });
  }, []);

  return <>{props.children}</>;
};
