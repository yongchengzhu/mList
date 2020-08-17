import { LocationDescriptor } from 'history';

export interface RootRouteProps {
  path: string;
  redirectTo: LocationDescriptor;
  default: LocationDescriptor;
}
