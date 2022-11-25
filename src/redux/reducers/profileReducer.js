const initialState = {
  posts: [],
  title: '',
  description: '',
  picture: '',
  showCreateDialog: false,
  showSubmitDeleteDialog: false
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NEW_POST':
      return { ...state, [action.field]: action.value };
    case 'GET_POSTS':
      return {
        ...state,
        posts: action.posts
      };
    case 'SHOW_CREATE_DIALOG':
      return {
        ...state,
        showCreateDialog: !state.showCreateDialog
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      };
    case 'DELETE_POST_DIALOG':
      return {
        ...state,
        showSubmitDeleteDialog: !state.showSubmitDeleteDialog
      };
    default:
      return state;
  }
};
