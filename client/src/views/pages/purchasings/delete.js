import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePurchasing } from "../../../redux/features/purchasingsSlice";
import Confirm from "../../components/Confirm";

export default function DeletePurchasing({ id, isDisabled }) {
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();

	const destroy = async (id) => {
		await dispatch(deletePurchasing(id));
		await setOpenModal(!openModal);
	};

	return (
		<Confirm
			open={openModal}
			setOpen={setOpenModal}
			btnStyle={` ${
				isDisabled
					? "px-4 py-1 bg-gray-500 rounded-lg shadow text-white"
					: "px-4 py-1 bg-red-500 rounded-lg shadow text-white"
			}`}
			btnModal={"Delete"}
			modalTitle={"Hapus Transaksi"}
			modalWitdh={"w-1/3"}
			confirm={
				<button
					onClick={() => destroy(id)}
					className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded shadow text-white"
				>
					Yes
				</button>
			}
		>
			<span className="font-medium text-lg block mt-5">
				Anda yakin akan melanjutkan?
			</span>
			<p className="font-medium text-md text-red-500">
				Data yang dihapus tidak bisa dikembalikan lagi
			</p>
		</Confirm>
	);
}
