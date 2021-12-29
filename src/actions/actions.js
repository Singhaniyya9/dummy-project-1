import { defaultCase, fetchTableData } from "./actionCreators";
export const defaultCaseCall = () => (dispatch) => {
	dispatch(defaultCase());
};
export const fetchData = (payload) => (dispatch) => {
	dispatch(fetchTableData(payload));
};
