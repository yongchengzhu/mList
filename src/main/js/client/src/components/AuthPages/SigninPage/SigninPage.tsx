import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SigninForm from './SigninForm';

import { signinActionCreator } from '../../../redux/actions/auth/signin';
import logo from '../../../assets/logo1.png';
import styles from '../AuthPages.module.scss';
import { RootState } from '../../../models/states';

const SigninPage: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
  const history = useHistory();
  const location: any = useLocation();
  const { from } = location.state || { from: { pathname: '/bookshelf' } };

  useEffect(() => {
    if (auth) {
      history.replace(from);
    }
  }, [auth, from, history]);

  return (
    <main className={styles.main}>
      <img className={styles.logo} alt="Logo" src={logo} />
      <SigninForm
        onSubmit={(values) => dispatch(signinActionCreator(values))}
      />
    </main>
  );
};

export default SigninPage;
