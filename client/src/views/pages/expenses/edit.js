import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateExpenseMutation } from "../../../services/api/expenses";
import { ButtonPrimary } from "../../components/Button";
import CreatePage from "../../components/CreatePage";
import Textarea from "../../components/Textarea";
import Input from "../../components/Input";
import Select from "../../components/Select";

export default function EditExpenses({ expense }) {
	const [openModal, setOpenModal] = useState(false);
	const { handleSubmit, register, reset } = useForm();
	const [updateExpense] = useUpdateExpenseMutation();
	const update = async (data) => {
		await updateExpense(data)
			.then(() => {
				reset();
				setOpenModal(!openModal);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<CreatePage
			header={"Edit pengeluaran"}
			size={"max-w-lg"}
			btnStyle={`px-4 py-0.5 bg-green-600 rounded-lg shadow text-white hover:bg-green-700`}
			btnModal={"Edit"}
			openModal={openModal}
			setOpenModal={setOpenModal}
		>
			<form onSubmit={handleSubmit(update)}>
				<Input
					type={"hidden"}
					name={"id"}
					register={register}
					defaultValue={expense._id}
				/>

				<div className="p-2">
					<Select
						label={"Tipe pengeluaran"}
						name={"type"}
						required={true}
						register={register}
						defaultValue={expense.type}
					>
						<option value="">Pilih</option>
						<option value="purchasing">Pembelian</option>
						<option value="refund">Refund</option>
						<option value="other">Lainnya</option>
					</Select>
				</div>

				<div className="p-2">
					<Input
						label={"Jumlah"}
						type={"number"}
						name={"amount"}
						required={true}
						register={register}
						defaultValue={expense.amount}
					/>
				</div>

				<div className="p-2">
					<Textarea
						label={"Keterangan"}
						name={"description"}
						rows={"5"}
						cols={"5"}
						required={true}
						register={register}
						defaultValue={expense.description}
					/>
				</div>

				<div className="py-2 mt-2 flex justify-end">
					<ButtonPrimary type={"submit"}>Simpan</ButtonPrimary>
				</div>
			</form>
		</CreatePage>
	);
}
