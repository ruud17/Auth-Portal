export const DEFAULT_AVATAR_URL = 'https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg';

export const passwordRegEx = /^(?=.*\d)[A-Za-z\d@$!%*?&]{6,50}$/;

export const MIN_PHOTOS_TO_UPLOAD_WHEN_REGISTERING_USER = 4;
export const PASSWORD_HASH_ROUND_TIMES = 10;

export const API_MESSAGES = {
  USER_SUCCESSFULLY_REGISTERED: 'Registration successful',
  PHOTOS_MINIMUM_REQUIRED: 'At least 4 photos should be added!',
  INTERNAL_SERVER_ERROR_MESSAGE: 'Internal server error',
  EMAIL_ALREADY_USED: 'Email is already used',
  INVALID_CREDENTIALS: 'Invalid credentials',
  AWS_S3_IVALID_PARAM: 'InvalidParameter',
  AWS_S3_UPLOAD_ERROR: 'Failed to upload images to S3',
  FIND_USER_IN_DB_ERROR: 'An error occurred while finding the user',
  PASSWORD_HASHING_ERROR: 'Failed to hash password!',
  GENERATE_ACCESS_TOKEN_ERROR: 'Failed to generate access token. Please try again.',
  USER_NOT_FOUND: 'User not found',
};

export const VALIDATION_MESSAGES = {
  FIRST_NAME_STRING: 'First Name must be a string!',
  FIRST_NAME_MIN_LENGTH: 'First Name must have at least 2 characters!',
  FIRST_NAME_MAX_LENGTH: 'First Name must have maximum 25 characters!',
  FIRST_NAME_REQUIRED: 'First Name is required!',

  LAST_NAME_STRING: 'Last Name must be a string!',
  LAST_NAME_MIN_LENGTH: 'Last Name must have at least 2 characters!',
  LAST_NAME_MAX_LENGTH: 'Last Name must have maximum 25 characters!',
  LAST_NAME_REQUIRED: 'Last Name is required!',

  EMAIL_REQUIRED: 'Email is required!',
  EMAIL_INCORRECT_FORMAT: 'Incorrect email format!',

  PASSWORD_REQUIRED: 'Password is required!',
  PASSWORD_FORMAT: 'Password must contain min 6 and max 50 characters inlucuding 1 number!',

  ROLE_STRING: 'Role must be a string!',
  ROLE_REQUIRED: 'Role is required.',
};
