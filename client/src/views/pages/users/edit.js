import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../services/api/users";
import { ButtonPrimary } from "../../components/Button";
import CreatePage from "../../components/CreatePage";
import Input from "../../components/Input";

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
					register={register}
					defaultValue={user._id}
				/>

				<div className="p-2">
					<Input
						label={"Nama"}
						type={"text"}
						name={"name"}
						required={true}
						capitalize={true}
						defaultValue={user.name}
						register={register}
					/>
				</div>

				<div className="p-2">
					<Input
						label={"Username"}
						type={"text"}
						name={"username"}
						required={true}
						defaultValue={user.username}
						register={register}
					/>
				</div>

				<div className="py-2 mt-2 flex justify-end">
					<ButtonPrimary type={"submit"}>Simpan</ButtonPrimary>
				</div>
			</form>
		</CreatePage>
	);
}
