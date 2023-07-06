import { CONSTANTS } from './constants';

function createUrl(endpoint: string): string {
  return apiUrl().concat(endpoint);
}

function apiUrl(): string {
  const hasTrailingSlash = CONSTANTS.APIURL.charAt(-1) === '/';
  return hasTrailingSlash ? CONSTANTS.APIURL : CONSTANTS.APIURL.concat('/');
}

export const EndPoints = {

  baseUrl: apiUrl(),
  auth: {
    login: createUrl('auth/login'),
    logout: createUrl('auth/logout'),
    refreshToken: createUrl('auth/refresh-token'),
    sendPasswordResetLink: createUrl('auth/send-password-reset-link'),
    resetPassword: createUrl('auth/reset-password'),
  },
  changePassword: createUrl('change_password'),
  roles: 'roles',
  permissions: 'permissions',
  users: 'users',
  activityLogs: 'activity-logs',
};
