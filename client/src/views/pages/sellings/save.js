import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { rupiah } from "../../../helpers/currency";
import { clearCart } from "../../../redux/features/sellingsCartSlice";
import { addSelling } from "../../../redux/features/sellingsSlice";
import Modal from "../../components/Modal";

export default function SaveTransaction({ cart, grandTotal }) {
	const [openModal, setOpenModal] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("cash");
	const [pay, setPay] = useState(0);
	const dispatch = useDispatch();

	const handlePay = (e) => {
		setPay(e.target.value);
	};

	const save = async () => {
		if (pay === 0 || pay === "" || pay < grandTotal) {
			setPay(grandTotal);
		}

		const data = {
			items: cart,
			sellings: {
				grandTotal,
				paymentMethod,
				pay,
				status: "success",
			},
		};

			if (cart.length) {
				await dispatch(addSelling(data));
				await dispatch(clearCart());
			}

			setOpenModal(false);
	};

	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Simpan"}
				modalTitle={"Pembayaran"}
				btnStyle={`px-6 py-2 rounded shadow-lg text-white ${
					!cart.length ? "bg-gray-400" : "bg-green-500 hover:bg-green-800"
				}`}
				modalWitdh={"max-w-md"}
			>
				<div className="w-full p-4 flex flex-col gap-2 justify-center items-center">
					<div className="px-4 py-2">
						<label htmlFor="name" className="block font-semibold text-dark">
							Tipe Pembayaran
						</label>
						<select
							name="paymentMethod"
							id="paymentMethod"
							onChange={(e) => setPaymentMethod(e.target.value)}
							className="w-64 px-2 py-2 rounded-md border border-gray-300 outline-none focus:border-cyan-500 bg-white"
						>
							<option value="cash">Cash</option>
							<option value="transfer">Transfer</option>
						</select>
					</div>

					<div className="px-4 py-2">
						<label
							htmlFor="grandTotal"
							className="block font-semibold text-dark"
						>
							Total
						</label>
						<input
							type={"text"}
							name="grandTotal"
							id="grandTotal"
							className="w-64 px-2 py-2 rounded-md border border-gray-300 outline-none text-xl font-semibold"
							value={rupiah(grandTotal)}
							disabled
						/>
					</div>

					<div className="px-4 py-2">
						<label htmlFor="pay" className="block font-semibold text-dark">
							Bayar
						</label>
						<input
							type="number"
							name="pay"
							id="pay"
							min={0}
							step={100}
							className="w-64 px-2 py-2 rounded-md border border-gray-300 outline-none text-xl font-semibold"
							value={pay}
							onChange={handlePay}
							onKeyUp={(e) =>
								e.key === "Enter" && pay < grandTotal && setPay(grandTotal)
							}
						/>
					</div>

					<div className="px-4 py-2">
						<label htmlFor="change" className="block font-semibold text-dark">
							Kembalian
						</label>
						<input
							type="number"
							name="pay"
							id="pay"
							className="w-64 px-2 py-2 rounded-md border border-gray-300 outline-none text-xl font-semibold"
							value={pay - grandTotal || 0}
							disabled
						/>
					</div>
				</div>

				<div className="flex justify-between gap-2 px-4">
					<button
						tabIndex={-1}
						className="px-4 py-2 rounded bg-red-500 text-white w-full"
					>
						Batal
					</button>
					<button
						onClick={save}
						className="px-4 py-2 rounded bg-blue-500 text-white w-full"
					>
						Simpan
					</button>
				</div>
			</Modal>
		</div>
	);
}
