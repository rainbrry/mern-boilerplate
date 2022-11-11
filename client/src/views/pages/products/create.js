import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/features/productsSlice";
import {
	categoriesSelector,
	getCategories,
} from "../../../redux/features/categoriesSlice";
import {
	getSuppliers,
	suppliersSelector,
} from "../../../redux/features/suppliersSlice";
import Modal from "../../components/Modal";

export default function AddProduct() {
	const [openModal, setOpenModal] = useState(false);

	const dispatch = useDispatch();
	const categories = useSelector(categoriesSelector.selectAll);
	const suppliers = useSelector(suppliersSelector.selectAll);

	const { register, handleSubmit, reset } = useForm();
	const store = (data) => {
		setOpenModal(!openModal);
		dispatch(addProduct(data));
		reset();
	};

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getSuppliers());
	}, [dispatch]);

	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Add product"}
				btnStyle={"px-8 py-2 bg-cyan-500 rounded-md shadow-md text-white"}
				modalTitle={"Add product"}
				modalWitdh={"max-w-lg"}
			>
				<form onSubmit={handleSubmit(store)} method="POST" className="w-full">
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
							type="text"
							name="purchase_price"
							id="purchase_price"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Purchase price"
							{...register("purchasePrice", { required: true })}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="sales_price" className="block text-sm text-dark">
							Sales price
						</label>
						<input
							type="sales_price"
							name="sales_price"
							id="sales_price"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Sales price"
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
