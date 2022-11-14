import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { rupiah } from "../../../helpers/currency";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/purchasingsSlice";
import {
	getProducts,
	productsSelector,
} from "../../../redux/features/productsSlice";

export default function ListsProduct() {
	const [openModal, setOpenModal] = useState(false);
	const products = useSelector(productsSelector.selectAll);
	const dispatch = useDispatch();

	const addItem = (data) => {
		dispatch(addToCart(data));
		setOpenModal(false);
	};

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<Modal
			open={openModal}
			setOpen={setOpenModal}
			btnModal={"Cari barang"}
			btnStyle={
				"px-6 py-2 bg-blue-500 rounded shadow-lg text-white hover:bg-blue-800"
			}
			modalTitle={"List barang"}
			modalWitdh={"max-w-5xl"}
		>
			<div className="py-3">
				<input
					type="text"
					className="px-3 py-1 rounded border-2 outline-none focus:border-cyan-500 capitalize w-80"
					placeholder="Cari barang"
				/>
			</div>
			<div className="w-full bg-base-100 rounded shadow-lg overflow-hidden overflow-y-auto border-2">
				<div className="flex flex-row border-b-4 w-full">
					<div className="px-3 py-2 w-6/12 font-medium">Nama barang</div>
					<div className="px-4 py-2 w-2/12">Harga beli</div>
					<div className="px-4 py-2 w-2/12">Harga jual</div>
					<div className="px-4 py-2 w-1/12">Stok</div>
					<div className="px-4 py-2 w-1/12">Action</div>
				</div>
				{products.map((product) => {
					return (
						<div
							tabIndex={0}
							className="p-2 flex w-full items-center focus:bg-blue-500 focus:opacity-80 focus:text-white outline-none overflow-hidden rounded"
							key={product._id}
							onKeyUp={(e) => e.key === "Enter" && addItem(product)}
						>
							<div className="flex flex-row w-full items-center">
								<div className="py-1 w-6/12 truncate capitalize">
									{product.name}
								</div>
								<div className="px-4 py-1 w-2/12 truncate">
									{rupiah(product.purchasePrice)}
								</div>
								<div className="px-4 py-1 w-2/12 truncate">
									{rupiah(product.salesPrice)}
								</div>
								<div className="px-4 py-1 w-1/12 flex justify-center truncate">
									{product.stock}
								</div>
								<div className="px-4 w-1/12">
									<button
										onClick={() => addItem(product)}
										tabIndex={-1}
										className="px-4 py-1 bg-green-600 text-white rounded shadow-lg"
									>
										Pilih
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Modal>
	);
}
