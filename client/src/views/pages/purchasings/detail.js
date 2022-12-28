import React, { useState } from "react";
import { rupiah } from "../../../helpers/currency";
import Modal from "../../components/Modal";

export default function PurchasingDetail({ purchasing }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Detail"}
				btnStyle={
					"px-4 py-0.5 bg-cyan-600 rounded-lg shadow text-white hover:bg-cyan-800"
				}
				modalTitle={"Detail Penjualan"}
				modalWitdh={"max-w-5xl"}
			>
				<div className="w-full p-4 flex flex-row gap-2 justify-between border-b-2">
					<div>
						<span className="text-lg font-semibold">Tanggal</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{new Date(purchasing.date).toLocaleString()}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Invoice</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{purchasing._id}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Petugas</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{purchasing.user.name}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Status</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{purchasing.status}
						</div>
					</div>
				</div>

				<div className="w-full p-4 border-b-2">
					<div className="w-full flex flex-row gap-2 justify-between items-center">
						<div className="text-lg font-semibold w-6/12">Nama barang</div>
						<div className="text-lg font-semibold w-2/12">Harga</div>
						<div className="text-lg font-semibold w-2/12">Qty</div>
						<div className="text-lg font-semibold w-2/12">Total</div>
					</div>
					<div className="w-full border-gray-400">
						{purchasing.products.map((product, index) => (
							<div key={index}>
								<div className="flex flex-row gap-2 justify-between items-center">
									<span className="w-6/12 truncate capitalize">
										{product.product.name}
									</span>
									<span className="w-2/12 truncate">
										{rupiah(product.price)}
									</span>
									<span className="truncate w-2/12">{product.qty}</span>
									<span className="w-2/12 truncate">
										{rupiah(product.price * product.qty)}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-end py-4">
					<div className="px-2">
						<div className="text-lg">Grand total : </div>
					</div>

					<div className="px-2">
						<div className="text-lg font-semibold">
							{rupiah(purchasing.grandTotal)}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
