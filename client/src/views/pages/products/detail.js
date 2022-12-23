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
				btnStyle={`px-4 py-0.5 bg-cyan-600 rounded-lg shadow text-white hover:bg-cyan-700`}
				modalTitle={"Detail product"}
				modalWitdh={"max-w-xl"}
			>
				<div className="w-full px-4 py-2 flex flex-col gap-2">
					<div>
						<span>Nama barang</span>
						<div className="p-1.5 w-full border-2 border-gray-400 capitalize rounded-lg">
							{product.name}
						</div>
					</div>
					<div>
						<span>Kategori</span>
						<div className="p-1.5 w-full border-2 border-gray-400 capitalize rounded-lg">
							{product.category}
						</div>
					</div>
					<div>
						<span>Supplier</span>
						<div className="p-1.5 w-full border-2 border-gray-400 capitalize rounded-lg">
							{product.supplier}
						</div>
					</div>
					<div>
						<span>Harga beli</span>
						<div className="p-1.5 w-full border-2 border-gray-400 capitalize rounded-lg">
							{rupiah(product.purchasePrice)}
						</div>
					</div>
					<div>
						<span>Harga jual</span>
						<div className="p-1.5 w-full border-2 border-gray-400 capitalize rounded-lg">
							{rupiah(product.salesPrice)}
						</div>
					</div>
					<div>
						<span>Stock</span>
						<div className="p-1.5 w-full border-2 border-gray-400 capitalize rounded-lg">
							{product.stock}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
