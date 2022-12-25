import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../services/api/auth";
import { ButtonPrimary } from "../../components/Button";
import Input from "../../components/Input";

export default function Login() {
	const { handleSubmit, register } = useForm();
	const [login] = useLoginMutation();
	const redirect = useNavigate();

	const auth = async (data) => {
		await login(data);
		redirect("/");
	};

	return (
		<main className="h-screen flex justify-center items-center w-full bg-base-300">
			<div className="w-96 bg-white shadow-lg rounded-lg px-4">
				<h1 className="text-3xl text-dark text-center py-6">Login</h1>

				<form onSubmit={handleSubmit(auth)} method="POST" className="mb-5">
					<Input
						label={"Username"}
						type={"text"}
						name={"username"}
						required={true}
						register={register}
					/>

					<Input
						label={"Password"}
						type={"password"}
						name={"password"}
						required={true}
						register={register}
					/>

					<div className="p-2">
						<ButtonPrimary
							type={"submit"}
							style={
								"px-3 py-2 bg-blue-500 rounded-lg shadow w-full mt-3 hover:bg-blue-600 text-white font-bold focus:outline-none focus:bg-blue-600 focus:ring-2"
							}
						>
							Login
						</ButtonPrimary>
					</div>
				</form>
			</div>
		</main>
	);
}
