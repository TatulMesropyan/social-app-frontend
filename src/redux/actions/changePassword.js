export const setFields = (field, value) => ({
  type: 'SET_FIELDS',
  field: field,
  value: value
});

export const sendData = () => ({
  type: 'SEND_DATA'
});
export const setLoginResponse = (token, user) => ({
  type: 'SET_LOGIN_RESPONSE',
  token,
  user
});
