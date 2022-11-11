import React from "react";
import { NavLink } from "react-router-dom";

export default function Error403() {
	return (
		<div className="flex justify-center items-center h-screen w-full">
			<div className="text-center">
				<h1 className="text-9xl font-bold text-gray-800">403</h1>
				<h2 className="text-6xl font-bold text-gray-800">Forbidden</h2>
				<p className="text-2xl text-gray-600">
					You don't have permission to access this page.
				</p>
				<NavLink
					to={"/"}
					className={"text-cyan-500 text-xl block py-5 hover:text-cyan-700"}
				>
					Back to Dashboard
				</NavLink>
			</div>
		</div>
	);
}
