export const UNKNOWN_ERROR = 'An unexpected error occurred';
export const MIN_PHOTO_TO_UPLOAD_ON_ACCOUNT_CREATION = 4;
export const UNAUTHORIZED_ERROR_CODE = 401;

export const REGISTER_USER_DEFAULT_VALUES = {
  role: 'admin',
  active: true
};

export const UPLOAD_PHOTOS_VALIDATION_ERROR_MSG = {
  type: 'manual',
  message: 'You must select at least 4 photos.'
};

export const ENDPOINT = {
  REGISTER: '/register',
  LOGIN: '/login',
  PROFILE: '/users/me'
};

export const ROUTE = {
  HOME: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  PROFILE: '/profile',
  WILD: '*'
};
