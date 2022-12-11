const initialState = {
  posts: [],
  title: '',
  description: '',
  picture: '',
  showCreateDialog: false,
  showSubmitDeleteDialog: false,
  confirmPostDelete: false,
  openedPost: {},
  openSingleDialog: false
};

export const postsReducer = (state = initialState, action) => {
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
    case 'CONFIRM_POST_DELETE':
      return {
        ...state,
        confirmPostDelete: action.value,
        showSubmitDeleteDialog: false
      };
    case 'OPENED_POST':
      return {
        ...state,
        openedPost: action.post,
        openSingleDialog: true
      };
    case 'POST_DIALOG':
      return {
        ...state,
        openSingleDialog: !state.openSingleDialog
      };
    default:
      return state;
  }
};
