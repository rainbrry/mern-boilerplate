import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/features/usersSlice";

export default function EditUser({ user }) {
	const [openModal, setOpenModal] = useState(false);

	const dispatch = useDispatch();

	const { register, handleSubmit, setValue, reset } = useForm();
	const update = async (data) => {
		dispatch(updateUser(data));
		setOpenModal(!openModal);
		reset();
	};

	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Edit"}
				btnStyle={"px-4 py-1 bg-green-600 rounded-lg shadow text-white"}
				modalTitle={"Edit user"}
				modalWitdh={"max-w-lg"}
			>
				<form
					onSubmit={handleSubmit(update)}
					method="POST"
					className="w-full text-left"
				>
					<input type="hidden" name="id" {...register("id")} value={user._id} />
					<div className="px-4 py-2">
						<label htmlFor="name" className="block text-sm text-dark">
							Name
						</label>
						<input
							type="text"
							name="name"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="name"
							defaultValue={user.name}
							onChange={(e) => setValue("name", e.target.value)}
							{...register("name", { required: true })}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="username" className="block text-sm text-dark">
							Username
						</label>
						<input
							type="text"
							name="username"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Username"
							defaultValue={user.username}
							onChange={(e) => setValue("username", e.target.value)}
							{...register("username", { required: true })}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="name" className="block text-sm text-dark">
							Role
						</label>
						<select
							name="role"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500 bg-white"
							defaultValue={user.role}
							onChange={(e) => setValue("role", e.target.value)}
							{...register("role", { required: true })}
						>
							<option value="">Pilih role</option>
							<option value="admin">Admin</option>
							<option value="kasir">Kasir</option>
							<option value="owner">Owner</option>
						</select>
					</div>
					<div className="py-2 mt-2 flex justify-end">
						<button
							type="submit"
							className="px-6 py-2 bg-blue-500 rounded shadow-lg text-white hover:bg-blue-700"
						>
							Save
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
