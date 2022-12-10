export const setFields = (field, value) => ({
  type: 'SET_FIELDS',
  field: field,
  value: value
});

export const setError = () => ({
  type: 'SET_ERROR'
});

export const setResponse = (response) => ({
  type: 'SET_RESPONSE',
  response: response
});
