import React, { useState } from "react";
import Modal from "../../components/Modal";
import { rupiah } from "../../../helpers/currency";
import { useDispatch } from "react-redux";
import axios from "../../../helpers/axios";
import { addToCart } from "../../../redux/features/sellingsCartSlice";
import toast from "react-hot-toast";

export default function ListsProduct() {
	const [products, setProducts] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();

	const addItem = (data) => {
		if (data.stock < 1) {
			toast.error("Stok habis");
			return false;
		}

		dispatch(addToCart(data));
		setOpenModal(false);
	};

	const queryProduct = async (query) => {
		await axios.get(`search-product?query=${query}`).then((res) => {
			setProducts(res.data.data);
		});
		setOpenModal(true);
	};

	return (
		<div>
			<div className="flex gap-3 items-center">
				<label htmlFor="search" className="text-lg font-semibold">
					Cari barang:
				</label>
				<input
					type="text"
					className="px-3 py-1 rounded border-2 outline-none focus:border-cyan-500 capitalize w-80"
					placeholder="Cari barang"
					autoFocus={true}
					autoComplete={"off"}
					defaultValue={""}
					id="search"
					name="search"
					onKeyUp={(e) => e.key === "Enter" && queryProduct(e.target.value)}
				/>
				<Modal open={openModal} setOpen={setOpenModal} modalWitdh={"max-w-5xl"}>
					<div className="w-full mt-3 bg-base-100 rounded shadow-lg overflow-hidden overflow-y-auto border-2">
						{
							<div className="flex flex-row border-b-4 w-full">
								<div className="px-3 py-2 w-6/12 font-medium">Nama barang</div>
								<div className="px-4 py-2 w-2/12">Harga beli</div>
								<div className="px-4 py-2 w-2/12">Harga jual</div>
								<div className="px-4 py-2 w-1/12">Stok</div>
								<div className="px-4 py-2 w-1/12">Action</div>
							</div>
						}

						{!products.length && (
							<div className="flex flex-row py-5 w-full">
								<div className="px-3 py-2 w-full font-medium text-center">
									Data tidak ditemukan
								</div>
							</div>
						)}

						{Object.values(products).map((product, index) => (
							<div
								key={index}
								tabIndex={0}
								className="p-2 flex w-full items-center focus:bg-blue-500 focus:opacity-80 focus:text-white outline-none overflow-hidden rounded"
								onKeyUp={(e) => e.key === "Enter" && addItem(product)}
								autoFocus={true}
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
											className={`px-4 py-1 text-white rounded shadow-lg ${
												product.stock < 1 ? "bg-gray-500" : "bg-green-500"
											}`}
											disabled={product.stock < 1}
										>
											Pilih
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</Modal>
			</div>
		</div>
	);
}
