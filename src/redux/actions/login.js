export const getLoginCredentials = (field, value) => ({
  type: 'GET_LOGIN_CREDENTIALS',
  field: field,
  value: value
});

export const setLoginResponse = (token, user) => ({
  type: 'SET_LOGIN_RESPONSE',
  token,
  user
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error
});
