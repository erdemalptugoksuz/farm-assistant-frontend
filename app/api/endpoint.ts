import { backendApiUrl } from '../../utils/appConstants';

export const authEndpoint = {
  signUp: `${backendApiUrl}/auth/sign-up`,
  signIn: `${backendApiUrl}/auth/sign-in`,
  signOut: `${backendApiUrl}/auth/sign-out`,
  refreshSession: `${backendApiUrl}/auth/refresh-token`,
};

export const farmEndpoint = {
  crudFarm: `${backendApiUrl}/api/farm/`,
};
