import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonPrimary } from "../../components/Button";
import { useCreateExpenseMutation } from "../../../services/api/expenses";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Textarea from "../../components/Textarea";
import CreatePage from "../../components/CreatePage";
import { toast } from "react-hot-toast";

export default function AddExpenses() {
	const [openModal, setOpenModal] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const [createExpense] = useCreateExpenseMutation();
	const store = async (data) => {
		await createExpense(data)
			.unwrap()
			.then(() => {
				setOpenModal(!openModal);
				reset();
				toast.success("Berhasil menambahkan data");
			})
			.catch((err) => {
				toast.error("Gagal menambahkan data");
			});
	};

	return (
		<CreatePage
			header={"Tambah pengeluaran"}
			size={"max-w-lg"}
			btnModal={"Tambah pengeluaran"}
			openModal={openModal}
			setOpenModal={setOpenModal}
		>
			<form onSubmit={handleSubmit(store)}>
				<div className="p-2">
					<Select
						label={"Tipe pengeluaran"}
						name={"type"}
						required={true}
						register={register}
					>
						<option value="">Pilih</option>
						<option value="pembelian">Pembelian</option>
						<option value="refund">Refund</option>
						<option value="lainnya">Lainnya</option>
					</Select>
				</div>

				<div className="p-2">
					<Input
						label={"Jumlah"}
						type={"number"}
						name={"amount"}
						required={true}
						register={register}
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
					/>
				</div>

				<div className="py-2 mt-2 flex justify-end">
					<ButtonPrimary type={"submit"}>Simpan</ButtonPrimary>
				</div>
			</form>
		</CreatePage>
	);
}
