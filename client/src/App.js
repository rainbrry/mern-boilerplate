import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "./redux/features/authSlice";
import { Toaster } from "react-hot-toast";
import Router from "./routes";

export default function App() {
	const [mounted, setMounted] = useState(false);
	const { auth } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (auth.isLogin) {
			dispatch(getAuth());
		}
	}, [dispatch, auth.isLogin]);

	useEffect(() => {
		setTimeout(() => {
			setMounted(true);
		}, 1000);
	}, [mounted]);

	if (!mounted) {
		return (
			<div className="flex h-screen bg-slate-100 items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					style={{
						margin: "auto",
						background: "none",
						display: "block",
					}}
					width="200px"
					height="200px"
				>
					<circle
						cx={50}
						cy={50}
						r={0}
						fill="none"
						stroke="#e90c59"
						strokeWidth={2}
					>
						<animate
							attributeName="r"
							repeatCount="indefinite"
							dur="1s"
							values="0;40"
							keyTimes="0;1"
							keySplines="0 0.2 0.8 1"
							calcMode="spline"
							begin="0s"
						/>
						<animate
							attributeName="opacity"
							repeatCount="indefinite"
							dur="1s"
							values="1;0"
							keyTimes="0;1"
							keySplines="0.2 0 0.8 1"
							calcMode="spline"
							begin="0s"
						/>
					</circle>
					<circle
						cx={50}
						cy={50}
						r={0}
						fill="none"
						stroke="#46dff0"
						strokeWidth={2}
					>
						<animate
							attributeName="r"
							repeatCount="indefinite"
							dur="1s"
							values="0;40"
							keyTimes="0;1"
							keySplines="0 0.2 0.8 1"
							calcMode="spline"
							begin="-0.5s"
						/>
						<animate
							attributeName="opacity"
							repeatCount="indefinite"
							dur="1s"
							values="1;0"
							keyTimes="0;1"
							keySplines="0.2 0 0.8 1"
							calcMode="spline"
							begin="-0.5s"
						/>
					</circle>
				</svg>
			</div>
		);
	}

	return (
		<main className="flex h-screen overflow-hidden bg-base-200">
			<Router />
			<Toaster
				position="top-center"
				reverseOrder={false}
				containerStyle={{
					top: 80,
				}}
			/>
		</main>
	);
}
