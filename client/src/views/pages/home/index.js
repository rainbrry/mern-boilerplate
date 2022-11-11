import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../../redux/features/authSlice";

export default function Home() {
	return (
		<div className="w-full p-4 bg-cyan-400 text-white">
			<h3>Hello</h3>
		</div>
	);
}
