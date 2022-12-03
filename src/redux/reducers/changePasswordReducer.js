const initialState = {
  currentPassword: '',
  confirmationPassword: '',
  newPassword: '',
  error: null,
  response: null
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FIELDS':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      };
    case 'SET_RESPONSE':
      return {
        ...state,
        response: action.response
      };
    default:
      return state;
  }
};
