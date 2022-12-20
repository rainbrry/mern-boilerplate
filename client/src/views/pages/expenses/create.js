import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addExpense } from "../../../redux/features/expensesSlice";
import Modal from "../../components/Modal";

export default function AddExpense() {
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();

	const { register, handleSubmit, reset } = useForm();
	const store = (data) => {
		dispatch(addExpense(data));
		setOpenModal(!openModal);
		reset();
	};

	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Tambah pengeluaran"}
				btnStyle={
					"px-8 py-2 bg-blue-500 hover:bg-blue-700 rounded-md shadow-md text-white"
				}
				modalTitle={"Tambah pengeluaran"}
				modalWitdh={"max-w-lg"}
			>
				<form onSubmit={handleSubmit(store)} method="POST" className="w-full">
					<div className="px-2 py-2">
						<label htmlFor="type" className="block text-sm text-dark">
							Tipe pengeluaran
						</label>
						<select
							name="type"
							id="type"
							className="w-full px-2 py-2 rounded-md border border-gray-300 outline-none focus:border-cyan-500 bg-white"
							{...register("type", { required: true })}
						>
							<option value="">Pilih</option>
							<option value="pembelian">Pembelian barang</option>
							<option value="retur barang">Retur barang</option>
							<option value="lainnya">Lainnya</option>
						</select>
					</div>
					<div className="px-2 py-2">
						<label htmlFor="amount" className="block text-sm text-dark">
							Jumlah
						</label>
						<input
							type="number"
							step={500}
							min={0}
							name="amount"
							id="amount"
							className="w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Jumlah in Rp. (ex: 10000)"
							{...register("amount", { required: true })}
						/>
					</div>
					<div className="px-2 py-2">
						<label htmlFor="description" className="block text-sm text-dark">
							Deskripsi
						</label>
						<textarea
							className="w-full px-2 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							name="description"
							id="description"
							rows="5"
							placeholder="Deskripsi"
							{...register("description", { required: true })}
						></textarea>
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
