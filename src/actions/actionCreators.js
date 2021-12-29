import { DEFAULT_CASE, FETCH_TABLE_DATA } from "./actionTypes";
export const defaultCase = () => ({
	type: DEFAULT_CASE,
});
export const fetchTableData = (payload) => ({
	type: FETCH_TABLE_DATA,
	payload,
});
