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

	console.log(selling);

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

				<div className="w-full p-4 flex flex-row gap-2 justify-between border-b-2">
					<div>
						<span className="text-lg font-semibold">Nama barang</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{selling.products.map((product) => (
								<div key={product._id}>{product.product.name}</div>
							))}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Harga</span>
						<div className="p-1.5 w-full border-gray-400 rounded-lg">
							{selling.products.map((product) => (
								<div key={product._id}>{rupiah(product.price)}</div>
							))}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Qty</span>
						<div className="p-1.5 w-full border-gray-400 rounded-lg">
							{selling.products.map((product) => (
								<div key={product._id}>x {product.qty}</div>
							))}
						</div>
					</div>

					<div>
						<span className="text-lg font-semibold">Total</span>
						<div className="p-1.5 w-full border-gray-400 capitalize rounded-lg">
							{selling.products.map((product) => (
								<div key={product._id}>
									{rupiah(product.qty * product.price)}
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="flex flex-col py-2">
					<div className="flex justify-end px-4">
						<div className="flex items-center">
							<span className="text-xl">Grand total : </span>
							<div className="p-1.5 w-full border-gray-400 rounded-lg text-xl font-semibold">
								{rupiah(selling.grandTotal)}
							</div>
						</div>
					</div>

					<div className="flex justify-end px-4">
						<div className="flex items-center border-b-2 border-gray-800">
							<span className="text-xl">Jumlah bayar : </span>
							<div className="p-1.5 w-full border-gray-400 rounded-lg text-xl font-semibold">
								{rupiah(selling.pay)}
							</div>
						</div>
					</div>

					<div className="flex justify-end px-4">
						<div className="flex items-center">
							<span className="text-xl">Kembalian : </span>
							<div className="p-1.5 w-full border-gray-400 rounded-lg text-xl font-semibold">
								{rupiah(selling.pay - selling.grandTotal)}
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
