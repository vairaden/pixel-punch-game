import React from 'react';
import { paths } from '@/app/constants/paths';
import { useLazyGetUserInfoQuery } from '@/shared/api/authApi';
import { useActions } from '@/shared/hooks';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const withAuthGuard = <Props extends object = object>(
  BaseComponent: React.ComponentType<Props>
): React.ComponentType<Props> => {
  return (props: Props) => {
    const [getUserInfo, { isLoading }] = useLazyGetUserInfoQuery();
    const { setProfile } = useActions();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    useEffect(() => {
      getUserInfo()
        .unwrap()
        .then(data => {
          setProfile(data);
          setIsLoggedIn(true);
        })
        .catch(error => {
          setErrorStatus(error.status);
        });
    }, []);

    return (
      <>
        {isLoading && <div>Loading...</div>}
        {isLoggedIn && (
          <MainLayout>
            <BaseComponent {...props} />
          </MainLayout>
        )}
        {errorStatus && errorStatus !== 401 && <Navigate to={paths.error} />}
        {errorStatus && errorStatus === 401 && <Navigate to={paths.signIn} />}
      </>
    );
  };
};
