import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Guest({ children }) {
	const redirect = useNavigate();
	const { auth } = useSelector((state) => state);

	useEffect(() => {
		if (auth.isLogin) redirect("/");
	}, [auth.isLogin, redirect]);

	return children;
}
