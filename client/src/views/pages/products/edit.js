import React, { useState } from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../redux/features/productsSlice";
import { suppliersSelector } from "../../../redux/features/suppliersSlice";
import { categoriesSelector } from "../../../redux/features/categoriesSlice";

export default function EditProduct({ product }) {
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();

	const categories = useSelector(categoriesSelector.selectAll);
	const suppliers = useSelector(suppliersSelector.selectAll);

	const { register, handleSubmit, setValue, reset } = useForm();
	const store = (data) => {
		dispatch(updateProduct(data));
		setOpenModal(!openModal);
		reset();
	};

	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Edit"}
				btnStyle={"px-4 py-1 bg-green-600 rounded-lg shadow text-white"}
				modalTitle={"Edit product"}
				modalWitdh={"max-w-lg"}
			>
				<form onSubmit={handleSubmit(store)} method="POST" className="w-full">
					<input
						type="hidden"
						name="id"
						value={product._id}
						{...register("id")}
					/>
					<div className="px-4 py-2">
						<label htmlFor="name" className="block text-sm text-dark">
							Name
						</label>
						<input
							type="text"
							name="name"
							id="name"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="name"
							defaultValue={product.name}
							onChange={(e) => setValue("name", e.target.value)}
							{...register("name", { required: true })}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="category" className="block text-sm text-dark">
							Category
						</label>
						<select
							name="category"
							id="category"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500 bg-white"
							defaultValue={product.category}
							onChange={(e) => setValue("category", e.target.value)}
							{...register("category", { required: true })}
						>
							<option value="">Choose category</option>
							{categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="supplier" className="block text-sm text-dark">
							Supplier
						</label>
						<select
							name="supplier"
							id="supplier"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500 bg-white"
							defaultValue={product.supplier}
							onChange={(e) => setValue("supplier", e.target.value)}
							{...register("supplier", { required: true })}
						>
							<option value="">Choose supplier</option>
							{suppliers.map((supplier) => (
								<option key={supplier._id} value={supplier._id}>
									{supplier.name}
								</option>
							))}
						</select>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="purchase_price" className="block text-sm text-dark">
							Purchase price
						</label>
						<input
							type="number"
							name="purchase_price"
							id="purchase_price"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Purchase price"
							defaultValue={product.purchasePrice}
							onChange={(e) => setValue("purchasePrice", e.target.value)}
							{...register("purchasePrice", { required: true })}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="sales_price" className="block text-sm text-dark">
							Sales price
						</label>
						<input
							type="number"
							name="sales_price"
							id="sales_price"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Sales price"
							defaultValue={product.salesPrice}
							onChange={(e) => setValue("salesPrice", e.target.value)}
							{...register("salesPrice", { required: true })}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="markup" className="block text-sm text-dark">
							Markup
						</label>
						<input
							type="number"
							name="markup"
							id="markup"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Markup in %"
							defaultValue={product.markup}
							onChange={(e) => setValue("markup", e.target.value)}
							{...register("markup", { required: true })}
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
