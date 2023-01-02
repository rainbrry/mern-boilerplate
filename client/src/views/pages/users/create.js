import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../../services/api/users";
import { ButtonPrimary } from "../../components/Button";
import CreatePage from "../../components/CreatePage";
import Input from "../../components/Input";
import Select from "../../components/Select";

export default function AddUser() {
	const [openModal, setOpenModal] = useState(false);
	const [createUser] = useCreateUserMutation();
	const { register, handleSubmit, reset } = useForm();
	const store = async (data) => {
		await createUser(data);
		setOpenModal(!openModal);
		reset();
	};

	return (
		<CreatePage
			header={"Tambah user"}
			size={"max-w-lg"}
			btnModal={"Tambah user"}
			openModal={openModal}
			setOpenModal={setOpenModal}
		>
			<form onSubmit={handleSubmit(store)} className="w-full">
				<div className="p-2">
					<Input
							label={"Nama"}
							type={"text"}
							name={"name"}
							capitalize={true}
							required={true}
							register={register}
					/>
				</div>

				<div className="p-2">
					<Input
						label={"Username"}
						type={"text"}
						name={"username"}
						required={"true"}
						register={register}
					/>
				</div>

				<div className="p-2">
					<Select
						label={"Role"}
						name={"role"}
						required={true}
						register={register}
					>
						<option value="">Pilih</option>
						<option value="admin">Admin</option>
						<option value="cashier">Kasir</option>
					</Select>
				</div>

				<div className="p-2">
					<Input
						label={"Password"}
						type={"password"}
						name={"password"}
						required={"true"}
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
