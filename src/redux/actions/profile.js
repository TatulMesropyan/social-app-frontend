export const setNewPost = (field,value) => ({
	type:"SET_NEW_POST",
	field: field,
	value: value,
});

export const getPosts = (posts) =>({
	type:"GET_POSTS",
	posts: posts,
});

export const setError = (error) => ({
	type:"GET_ERRORS",
	error:error,
});

export const setNewPostDialog = ()=> ({
	type:"SHOW_CREATE_DIALOG",
});

export const deletePostDialog = () => ({
	type:"DELETE_POST_DIALOG"
});
