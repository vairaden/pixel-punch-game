import {
  oAuthRedirectUri,
  useIsLoginYandexMutation,
  useLazyGetUserInfoQuery,
} from '@/shared/api/authApi';
import { useActions } from '@/shared/hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomePage } from '../HomePage';

export const SocialAuthPage = () => {
  const [getUserInfo] = useLazyGetUserInfoQuery();
  const [checkIsUserLoggedIn, { isLoading, isUninitialized }] =
    useIsLoginYandexMutation();
  const { setUser } = useActions();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      checkIsUserLoggedIn({
        code,
        redirect_uri: oAuthRedirectUri,
      }).then(() => {
        setIsLoggedIn(true);
        getUserInfo()
          .unwrap()
          .then(data => {
            setUser(data);
          });
      });
    }
  }, []);

  return (
    <>
      {isLoading || (isUninitialized && <div>Loading...</div>)}
      {isLoggedIn && <HomePage />}
    </>
  );
};
