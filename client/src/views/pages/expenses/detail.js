import React, { useState } from "react";
import { rupiah } from "../../../helpers/currency";
import Modal from "../../components/Modal";

export default function DetailExpenses({ expense }) {
	const [openModal, setOpenModal] = useState(false);
	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Detail"}
				btnStyle={
					"px-4 py-0.5 bg-cyan-600 rounded-lg shadow text-white hover:bg-cyan-700"
				}
				modalTitle={"Detail pengeluaran"}
				modalWitdh={"max-w-xl"}
			>
				<div className="w-full px-4 py-2 flex flex-col gap-2">
					<div className="px-2 py-2">
						<label htmlFor="type" className="block text-sm text-dark">
							Tipe
						</label>
						<input
							type="text"
							name="type"
							id="type"
							className="w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							value={expense.type}
							disabled
						/>
					</div>
					<div className="px-2 py-2">
						<label htmlFor="type" className="block text-sm text-dark">
							Petugas
						</label>
						<input
							type="text"
							name="type"
							id="type"
							className="w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							value={expense.user.name}
							disabled
						/>
					</div>
					<div className="px-2 py-2">
						<label htmlFor="amount" className="block text-sm text-dark">
							Jumlah
						</label>
						<input
							type="text"
							name="amount"
							id="amount"
							className="w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							value={rupiah(expense.amount)}
							disabled
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
							value={expense.description}
							disabled
						></textarea>
					</div>
				</div>
			</Modal>
		</div>
	);
}
