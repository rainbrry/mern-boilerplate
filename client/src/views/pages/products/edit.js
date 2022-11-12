import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
	productsSelector,
	updateProduct,
} from "../../../redux/features/productsSlice";

export default function EditProduct({ id }) {
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();
	const product = useSelector((state) =>
		productsSelector.selectById(state, id)
	);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitSuccessful },
	} = useForm();

	const update = async (data) => {
		await dispatch(updateProduct(data));
		setOpenModal(!openModal);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

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
				<form onSubmit={handleSubmit(update)} className="w-full">
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
							{...register("name", { required: true })}
						/>
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
