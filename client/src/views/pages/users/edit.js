import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../services/api/users";
import { ButtonPrimary } from "../../components/Button";
import CreatePage from "../../components/CreatePage";
import Input from "../../components/Input";
import Select from "../../components/Select";

export default function EditUser({ user }) {
	const [openModal, setOpenModal] = useState(false);
	const [updateUser] = useUpdateUserMutation();

	const { register, handleSubmit, reset } = useForm();
	const update = async (data) => {
		await updateUser(data)
			.unwrap()
			.then(() => {
				reset();
				setOpenModal(false);
				toast.success("Berhasil mengubah data");
			})
			.catch((err) => {
				toast.error("Gagal mengubah data");
			});
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

				<div className="p-2">
					<Select
						label={"Role"}
						name={"role"}
						required={true}
						register={register}
						defaultValue={user.role}
					>
						<option value="">Pilih</option>
						<option value="admin">Admin</option>
						<option value="kasir">Kasir</option>
					</Select>
				</div>

				<div className="py-2 mt-2 flex justify-end">
					<ButtonPrimary type={"submit"}>Simpan</ButtonPrimary>
				</div>
			</form>
		</CreatePage>
	);
}
