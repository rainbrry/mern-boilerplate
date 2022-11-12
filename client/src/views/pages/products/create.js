import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/features/productsSlice";
import Modal from "../../components/Modal";
import CreateableSelect from "react-select/creatable";

export default function AddProduct() {
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();

	const { register, handleSubmit, reset } = useForm();
	const store = (data) => {
		setOpenModal(!openModal);
		dispatch(addProduct(data));
	};

	useEffect(() => {
		openModal && reset();
	}, [openModal, reset]);

	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Tambah product"}
				btnStyle={"px-8 py-2 bg-cyan-500 rounded shadow-md text-white"}
				modalTitle={"Tambah product"}
				modalWitdh={"max-w-lg"}
			>
				<form onSubmit={handleSubmit(store)} method="POST" className="w-full">
					<div className="px-4 py-2">
						<label htmlFor="name" className="block text-sm text-dark">
							Nama produk
						</label>
						<input
							type="text"
							autoComplete={"off"}
							name="name"
							id="name"
							className="w-full px-3 py-1.5 rounded border border-gray-300 outline-none focus:border-blue-500 focus:border-2"
							placeholder="Nama produk"
							{...register("name", { required: true })}
						/>
					</div>

					<div className="px-4 py-2">
						<label htmlFor="kategori" className="block text-sm text-dark">
							Kategori
						</label>
						<input
							type="text"
							autoComplete={"off"}
							name="category"
							id="category"
							className="w-full px-3 py-1.5 rounded border border-gray-300 outline-none focus:border-blue-500 focus:border-2"
							placeholder="Kategori"
							{...register("category")}
						/>
					</div>

					<div className="px-4 py-2">
						<label htmlFor="supplier" className="block text-sm text-dark">
							Supplier
						</label>
						<input
							type="text"
							autoComplete={"off"}
							name="supplier"
							id="supplier"
							className="w-full px-3 py-1.5 rounded border border-gray-300 outline-none focus:border-blue-500 focus:border-2"
							placeholder="Supplier"
							{...register("supplier")}
						/>
					</div>

					<div className="px-4 py-2">
						<label htmlFor="purchase_price" className="block text-sm text-dark">
							Harga beli
						</label>
						<input
							type="number"
							autoComplete={"off"}
							min={0}
							step={500}
							name="purchase_price"
							id="purchase_price"
							className="w-full px-3 py-1.5 rounded border border-gray-300 outline-none focus:border-blue-500 focus:border-2"
							placeholder="Harga beli"
							{...register("purchasePrice", { required: true })}
						/>
					</div>

					<div className="px-4 py-2">
						<label htmlFor="sales_price" className="block text-sm text-dark">
							Harga jual
						</label>
						<input
							type="number"
							autoComplete={"off"}
							min={0}
							step={500}
							name="sales_price"
							id="sales_price"
							className="w-full px-3 py-1.5 rounded border border-gray-300 outline-none focus:border-blue-500 focus:border-2"
							placeholder="Harga jual"
							{...register("salesPrice", { required: true })}
						/>
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
