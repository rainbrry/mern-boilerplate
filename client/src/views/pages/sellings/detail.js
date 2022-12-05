import React, { useState } from "react";
import { useSelector } from "react-redux";
import { rupiah } from "../../../helpers/currency";
import { sellingsSelector } from "../../../redux/features/sellingsSlice";
import Modal from "../../components/Modal";

export default function SellingDetail({ id }) {
	const [openModal, setOpenModal] = useState(false);

	const selling = useSelector((state) =>
		sellingsSelector.selectById(state, id)
	);

	return (
		<div>
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				btnModal={"Detail"}
				btnStyle={"px-4 py-1 bg-cyan-600 rounded-lg shadow text-white"}
				modalTitle={"Detail Penjualan"}
				modalWitdh={"max-w-5xl"}
			>
				<div className="w-full p-4 flex flex-row gap-2 justify-between border-b-2">
					<div>
						<span className="text-lg font-semibold">Tanggal</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{new Date(selling.date).toLocaleString()}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Invoice</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{selling._id}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Pembayaran</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{selling.paymentMethod}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Kasir</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{selling.user.name}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Status</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{selling.status}
						</div>
					</div>
				</div>

				<div className="w-full p-4 border-b-2">
					<div className="flex flex-row gap-2 justify-between items-center">
						<div className="text-lg font-semibold w-6/12">Nama barang</div>
						<div className="text-lg font-semibold w-2/12">Harga</div>
						<div className="text-lg font-semibold w-2/12">Qty</div>
						<div className="text-lg font-semibold w-2/12">Total</div>
					</div>
					<div className="w-full border-gray-400 capitalize rounded-lg">
						{selling.products.map((product, index) => (
							<div key={index}>
								<div className="flex flex-row gap-2 justify-between items-center">
									<span className="w-6/12 truncate">
										{product.product.name}
									</span>
									<span className="w-2/12 truncate">
										{rupiah(product.price)}
									</span>
									<span className="w-2/12 truncate">{product.qty}</span>
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
						<div className="text-lg">Total Bayar : </div>
						<div className="text-lg">Kembalian : </div>
					</div>

					<div className="px-2">
						<div className="text-lg font-semibold">
							{rupiah(selling.grandTotal)}
						</div>
						<div className="text-lg font-semibold">{rupiah(selling.pay)}</div>
						<div className="text-lg font-semibold">
							{rupiah(selling.pay - selling.grandTotal)}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
