
const initialState = {
	username: "",
	phone: 0,
	password: "",
	email: "",
	confirmationPassword: "",
};

export const registrationReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_REGISTRATION_DATA":
			return { ...state, [action.field]: action.value };
		case "SET_ERROR":
			return {
				...state,
				error: action.error,
			};
		default:
			return state
	}
}
