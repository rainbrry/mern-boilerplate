import React, { useState } from "react";
import { useDeleteProductMutation } from "../../../services/api/products";
import Confirm from "../../components/Confirm";

export default function DeleteProduct({ id, isDisabled }) {
	const [openModal, setOpenModal] = useState(false);
	const [deleteProduct] = useDeleteProductMutation();

	const destroy = async (id) => {
		await deleteProduct(id);
		setOpenModal(!openModal);
	};

	return (
		<Confirm
			open={openModal}
			setOpen={setOpenModal}
			btnStyle={` ${
				isDisabled
					? "px-4 py-0.5 bg-gray-600 rounded-lg shadow text-white hover:bg-gray-700"
					: "px-4 py-0.5 bg-red-600 rounded-lg shadow text-white hover:bg-red-700"
			}`}
			btnModal={"Delete"}
			modalTitle={"Hapus Product"}
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
