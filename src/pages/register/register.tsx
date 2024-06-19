import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserErrorSelector,
  getUserRequestSelector,
  registrationNewUserThunk
} from '../../services/slices/authorizationSlice';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const registrationError = useSelector(getUserErrorSelector);
  const userRequest = useSelector(getUserRequestSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registrationNewUserThunk({ email, name: userName, password }));
  };

  if (userRequest) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={registrationError?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
