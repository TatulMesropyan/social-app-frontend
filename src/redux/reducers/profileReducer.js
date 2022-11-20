
const initialState = {
	posts:[],
	title:'',
	description:'',
	picture:'',
	showCreateDialog:false,
	showSubmitDeleteDialog:false,
};

export const profileReducer = (state = initialState,action) => {
	switch (action.type) {
		case "SET_NEW_POST" :
			return {...state, [action.field]: action.value};
		case "GET_POSTS" :
			return {
				...state,
				posts: action.posts
			};
		case "SET_ERROR" :
			return {
				...state,
				error:action.error,
			};
		default:
			return state
	}
}
