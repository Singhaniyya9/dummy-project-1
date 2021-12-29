import { DEFAULT_CASE, FETCH_TABLE_DATA } from "../actions/actionTypes";

const initialState = {
	defaultCaseData: "I,m here",
	arrayVal: [],
};

const testReducer = (state = initialState, action) => {
	console.log(action, "action");
	const { type, payload } = action;
	switch (type) {
		case DEFAULT_CASE:
			return {
				...initialState,
				updatedState: "Myself got updated",
			};
		case FETCH_TABLE_DATA:
			return {
				...state,
				arrayVal: payload,
			};

		default:
			return {
				...state,
			};
	}
};
export default testReducer;
