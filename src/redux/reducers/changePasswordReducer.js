const initialState = {
  currentPassword: '',
  confirmationPassword: '',
  newPassword: ''
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_LOGIN_RESPONSE':
      sessionStorage.setItem('Token', action.token);
      return {
        ...state,
        user: action.user,
        token: action.token
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
