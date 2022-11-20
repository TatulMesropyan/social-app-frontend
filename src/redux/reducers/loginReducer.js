
const initialState = {
	login: "",
	password: "",
	errorCode: 0,
	errorStatus: "",
	user: {},
	token: ""
};

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_LOGIN_CREDENTIALS":
			return { ...state, [action.field]: action.value };
		case "SET_LOGIN_RESPONSE":
			sessionStorage.setItem("Token", action.token);
			return {
				...state,
				user: action.user,
				token: action.token,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.error,
			};
		default:
			return state
	}
}
