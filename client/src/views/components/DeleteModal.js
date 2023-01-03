import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Confirm from "./Confirm";

export default function DeleteModal({ id, isDisabled, deleteData }) {
	const [openModal, setOpenModal] = useState(false);

	const destroy = async (id) => {
		await deleteData(id)
			.unwrap()
			.then(() => {
				setOpenModal(!openModal);
				toast.success("Data berhasil dihapus");
			})
			.catch((err) => {
				toast.error("Data gagal dihapus, coba lagi");
			});
	};

	return (
		<Confirm
			open={openModal}
			setOpen={setOpenModal}
			btnStyle={` ${
				isDisabled
					? "px-4 py-0.5 bg-gray-500 rounded-lg shadow text-white hover:bg-gray-700"
					: "px-4 py-0.5 bg-red-500 rounded-lg shadow text-white hover:bg-red-700"
			}`}
			btnModal={"Delete"}
			modalTitle={"Hapus Pengeluaran"}
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
			<span className="font-medium text-lg block mt-5 text-center">
				Anda yakin akan melanjutkan?
			</span>
			<p className="font-medium text-md text-red-500 text-center">
				Data yang dihapus tidak bisa dikembalikan lagi
			</p>
		</Confirm>
	);
}
