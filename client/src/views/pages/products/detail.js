import React, { useState } from "react";
import Modal from "../../components/Modal";
import { rupiah } from "../../../helpers/currency";

export default function DetailProduct({ product }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Detail"}
				btnStyle={"px-4 py-1 bg-cyan-600 rounded-lg shadow text-white"}
				modalTitle={"Detail product"}
				modalWitdh={"max-w-lg"}
			>
				<form className="w-full">
					<input disabled type="hidden" name="id" value={product._id} />
					<div className="px-4 py-2">
						<label htmlFor="name" className="block text-sm text-dark">
							Name
						</label>
						<input
							disabled
							type="text"
							name="name"
							id="name"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="name"
							defaultValue={product.name}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="name" className="block text-sm text-dark">
							Category
						</label>
						<input
							disabled
							type="text"
							name="name"
							id="name"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="name"
							defaultValue={product.category.name}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="name" className="block text-sm text-dark">
							Supplier
						</label>
						<input
							disabled
							type="text"
							name="name"
							id="name"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="name"
							defaultValue={product.supplier.name}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="purchase_price" className="block text-sm text-dark">
							Purchase price
						</label>
						<input
							disabled
							type="number"
							name="purchase_price"
							id="purchase_price"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Purchase price"
							defaultValue={rupiah(product.purchasePrice)}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="sales_price" className="block text-sm text-dark">
							Sales price
						</label>
						<input
							disabled
							type="number"
							name="sales_price"
							id="sales_price"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Sales price"
							defaultValue={rupiah(product.salesPrice)}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="stock" className="block text-sm text-dark">
							Stock
						</label>
						<input
							disabled
							type="number"
							name="stock"
							id="stock"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Sales price"
							defaultValue={product.stock}
						/>
					</div>
					<div className="px-4 py-2">
						<label htmlFor="markup" className="block text-sm text-dark">
							Markup
						</label>
						<input
							disabled
							type="text"
							name="markup"
							id="markup"
							className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
							placeholder="Markup in %"
							defaultValue={`${product.markup}%`}
						/>
					</div>
				</form>
			</Modal>
		</div>
	);
}
