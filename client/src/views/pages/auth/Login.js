import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function Login() {
	const dispatch = useDispatch();

	const { handleSubmit, register } = useForm();
	const auth = (data) => {
		// dispatch(login(data));
	};

	return (
		<main className="h-screen flex justify-center items-center w-full bg-base-300">
			<div className="w-96 bg-white shadow-lg rounded-lg px-4">
				<h1 className="text-3xl text-dark text-center py-6">Login</h1>

				<form onSubmit={handleSubmit(auth)} method="POST" className="mb-5">
					<div className="px-4 py-3">
						<label className="block text-sm text-dark">Username</label>
						<input
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
							name="Username"
							placeholder="Username"
							{...register("username", { required: true })}
						/>
					</div>
					<div className="px-4 py-2">
						<label className="block text-sm text-dark">Password</label>
						<input
							type="password"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
							placeholder="********"
							{...register("password", { required: true })}
						/>
					</div>

					<div className="px-4 py-2">
						<button
							type="submit"
							className="px-3 py-2 bg-blue-500 rounded-lg shadow w-full mt-3 hover:bg-blue-600 text-white font-bold focus:outline-none focus:bg-blue-600 focus:ring-2"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
