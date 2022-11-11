import React from "react";
import { NavLink } from "react-router-dom";

export default function Error404() {
	return (
		<div className="flex justify-center items-center h-screen w-full">
			<div className="text-center">
				<h1 className="text-9xl font-bold text-red-400">404</h1>
				<h2 className="text-6xl font-bold text-red-400">
					<span className="text-red-400 line-through">Soulmate</span> Page Not
					Found
				</h2>
				<p className="text-2xl text-red-400">
					The page you are looking for does not exist.
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
