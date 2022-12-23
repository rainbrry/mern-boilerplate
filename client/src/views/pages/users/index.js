import React from "react";
import IndexPage from "../../components/IndexPage";
import AddUser from "./create";
import ListUser from "./lists";

export default function Users() {
	return (
		<IndexPage header={"User"}>
			<div className="flex justify-end">
				<AddUser />
			</div>
			<ListUser />
		</IndexPage>
	);
}
