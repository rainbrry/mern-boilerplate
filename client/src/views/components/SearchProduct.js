import React, { useState } from "react";
import { rupiah } from "../../helpers/currency";
import { useLazySearchProductQuery } from "../../services/api/products";
import Modal from "./Modal";

export default function SearchProduct({ cartType, selectProduct }) {
	const [openModal, setOpenModal] = useState(false);
	const [search, { data: products }] = useLazySearchProductQuery();

	const addToCart = (product) => {
		selectProduct(product);
		setOpenModal(false);
	};

	const queryProduct = async (query) => {
		await search(query);
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
						<div className="flex flex-row border-b-4 w-full justify-center">
							<div className="px-3 py-2 w-6/12 font-medium">Nama barang</div>
							{cartType === "purchasing" && (
								<div className="px-4 py-2 w-2/12">Harga beli</div>
							)}
							<div className="px-4 py-2 w-2/12">Harga jual</div>
							<div className="px-4 py-2 w-1/12">Stok</div>
							<div className="px-4 py-2 w-1/12">Action</div>
						</div>

						{products && !products.length && (
							<div className="flex flex-row py-5 w-full justify-center">
								<div className="px-3 py-2 w-full font-medium text-center">
									Data tidak ditemukan
								</div>
							</div>
						)}

						{products &&
							products.map((product, index) => (
								<div
									key={index}
									tabIndex={0}
									className="px-4 py-2 flex w-full items-center focus:bg-blue-500 focus:opacity-80 focus:text-white outline-none overflow-hidden rounded"
									onKeyUp={(e) => e.key === "Enter" && addToCart(product)}
									autoFocus={true}
								>
									<div className="flex flex-row w-full items-center justify-center">
										<div className="py-1 w-6/12 truncate capitalize">
											{product.name}
										</div>

										{cartType === "purchasing" && (
											<div className="px-4 py-1 w-2/12 truncate">
												{rupiah(product.purchasePrice)}
											</div>
										)}

										<div className="px-4 py-1 w-2/12 truncate">
											{rupiah(product.salesPrice)}
										</div>
										<div className="px-4 py-1 w-1/12 flex justify-center truncate">
											{product.stock}
										</div>
										<div className="px-4 w-1/12">
											<button
												onClick={() =>
													selectProduct({
														product: product._id,
														name: product.name,
														price: product.purchasePrice,
													})
												}
												tabIndex={-1}
												className={`px-4 py-1 text-white rounded shadow-lg ${
													product.stock < 1 && cartType === "selling"
														? "bg-gray-500"
														: "bg-green-500"
												}`}
												disabled={product.stock < 1 && cartType === "selling"}
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
