import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../services/api/users";
import CreatePage from "../../components/CreatePage";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { ButtonPrimary } from "../../components/Button";

export default function EditUser({ user }) {
	const [openModal, setOpenModal] = useState(false);
	const [updateUser] = useUpdateUserMutation();

	const { register, handleSubmit, reset } = useForm();
	const update = async (data) => {
		await updateUser(data);
		reset();
		setOpenModal(!openModal);
	};

	return (
		<CreatePage
			header={"Tambah user"}
			size={"max-w-lg"}
			btnStyle={`px-4 py-0.5 bg-green-600 rounded-lg shadow text-white hover:bg-green-700`}
			btnModal={"Edit"}
			openModal={openModal}
			setOpenModal={setOpenModal}
		>
			<form onSubmit={handleSubmit(update)} className="w-full">
				<Input
					type={"hidden"}
					name={"id"}
					defaultValue={user._id}
					register={register}
				/>
				<Input
					label={"Nama"}
					type={"text"}
					name={"name"}
					required={true}
					defaultValue={user.name}
					register={register}
				/>

				<Input
					label={"Username"}
					type={"text"}
					name={"username"}
					required={"true"}
					defaultValue={user.username}
					register={register}
				/>

				<Select
					label={"Role"}
					name={"role"}
					required={true}
					defaultValue={user.role}
					register={register}
				>
					<option value="">Pilih</option>
					<option value="admin">Admin</option>
					<option value="cashier">Kasir</option>
				</Select>

				<div className="py-2 mt-2 flex justify-end">
					<ButtonPrimary type={"submit"}>Simpan</ButtonPrimary>
				</div>
			</form>
		</CreatePage>
	);
}
