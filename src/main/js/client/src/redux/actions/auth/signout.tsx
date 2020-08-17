import { ActionCreator } from 'redux';
import { SignoutAction, SIGNOUT } from '../../../models/actions/auth';

export const signoutAction: ActionCreator<SignoutAction> = () => ({
  type: SIGNOUT,
});