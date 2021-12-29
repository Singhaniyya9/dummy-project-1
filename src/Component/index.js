import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions/actions";
import axios from "axios";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const SDataTable = (props) => {
	const { fetchData, arrayVal } = props;
	const [state, setState] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});
	const [data, setData] = useState([]);
	const [editClick, setEditClick] = useState(false);
	useEffect(() => {
		apiData();
		typeof window !== "undefined" &&
			window.localStorage.removeItem("User Updated Data");
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (typeof arrayVal !== "undefined") {
			setData(arrayVal);
		}
	}, [arrayVal]);
	const apiData = () => {
		axios
			.get("https://reqres.in/api/users?page=1")
			.then((res) => {
				fetchData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleEdit = (item) => {
		setEditClick(true);
		setState({
			...state,
			firstName: item?.first_name,
			lastName: item?.last_name,
			email: item?.email,
		});
	};
	const handleDelete = (item) => {
		let newArrays = data?.filter((i) => i.id !== item.id);
		setData(newArrays);
	};
	const customStyles = {
		rows: { style: { fontSize: "12pt" } },
		headCells: {
			style: {
				backgroundColor: "#f5f5f5",
				color: "black",
				fontSize: "14pt",
				overflow: "visible",
			},
		},
		cells: { style: { fontSize: "12pt" } },
	};
	const columns = [
		{
			id: 1,
			name: "ID",
			selector: (row) => row.id,
			sortable: true,
			reorder: true,
		},
		{
			id: 2,
			name: "First Name",
			selector: (row) => row.first_name,
			sortable: true,
			reorder: true,
		},
		{
			id: 3,
			name: "Last Name",
			selector: (row) => row.last_name,
			sortable: true,
			right: true,
			reorder: true,
		},
		{
			id: 4,
			name: "Email ",
			selector: (row) => row.email,
			sortable: true,
			right: true,
			reorder: true,
		},
		{
			id: 5,
			name: "Avatar",
			selector: (row) => (
				<img
					src={row.avatar}
					alt="avatar"
					style={{ width: "60px", height: "60px" }}
				/>
			),
			sortable: true,
			right: true,
			reorder: true,
		},
		{
			id: 6,
			name: "Edit",
			selector: (row) => <EditIcon onClick={() => handleEdit(row)} />,
			sortable: true,
			reorder: true,
		},
		{
			id: 7,
			name: "Delete",
			selector: (row) => (
				<DeleteIcon
					onClick={() => handleDelete(row)}
					style={{ justifyContent: "end !important" }}
				/>
			),
			sortable: true,
			reorder: true,
		},
	];
	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};
	const handleUpdate = () => {
		typeof window !== "undefined" &&
			window.localStorage.setItem("User Updated Data", JSON.stringify(state));
		setEditClick(false);
	};
	return (
		<div className="login">
			{data.length === 0 && (
				<h3>There are no records to display.Kindly refresh the page </h3>
			)}
			{data.length > 0 && (
				<DataTable
					title="User Data"
					columns={columns}
					data={data}
					customStyles={customStyles}
				/>
			)}
			{editClick && (
				<div>
					<Box
						component="form"
						sx={{
							"& > :not(style)": {
								margin: "12px 20px",
								width: "48ch",
							},
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							id="outlined-basic"
							label="First Name"
							placeholder="First Name"
							name="firstName"
							onChange={(e) => handleChange(e)}
							value={state?.firstName}
						/>
						<TextField
							id="outlined-basic"
							label="Last Name"
							placeholder="Last Name"
							name="lastName"
							onChange={(e) => handleChange(e)}
							value={state?.lastName}
						/>
						<TextField
							id="outlined-basic"
							label="Email"
							placeholder="Email"
							name="email"
							onChange={(e) => handleChange(e)}
							value={state?.email}
						/>
						<Button variant="contained" onClick={handleUpdate}>
							Update
						</Button>
					</Box>
				</div>
			)}
		</div>
	);
};
export const mapStateToProps = (state) => {
	const { arrayVal } = state.testReducer;
	return { arrayVal };
};
export const mapDispatchToProps = (dispatch) => ({
	fetchData: (payload) => dispatch(fetchData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SDataTable);
