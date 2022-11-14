import React from "react";
import { NavLink } from "react-router-dom";

export default function AddPurchasing() {
	return (
		<div className="px-8 py-4 overflow-hidden">
			<h3 className="text-2xl text-base-500">Transaksi baru</h3>
			<div className="w-full flex gap-4 justify-end items-center px-4 py-2 bg-base-200">
				<button className="px-6 py-2 bg-green-600 rounded shadow-lg text-white hover:bg-green-800">
					Simpan transaksi
				</button>
				<button className="px-6 py-2 bg-cyan-500 rounded shadow-lg text-white hover:bg-cyan-700">
					Hold transaksi
				</button>
				<NavLink
					to={"/purchasings"}
					className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md shadow-md text-white"
				>
					Batal
				</NavLink>
			</div>
			<div className="w-full h-[400px] bg-base-100 rounded-t-xl shadow-xl overflow-hidden overflow-y-auto">
				<div className="w-full mt-4">
					<div className="p-2 flex w-full justify-center items-end">
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Kode barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="BA-0000001"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Nama barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Nama barang"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Qty
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Qty"
							/>
						</div>

						<div className="px-4 py-2">
							<button className="px-6 py-2 bg-blue-500 rounded shadow-lg text-white hover:bg-blue-700">
								Tambah
							</button>
						</div>
					</div>

					<div className="p-2 flex w-full justify-center items-end">
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Kode barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="BA-0000001"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Nama barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Nama barang"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Qty
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Qty"
							/>
						</div>

						<div className="px-4 py-2">
							<button className="px-6 py-2 bg-blue-500 rounded shadow-lg text-white hover:bg-blue-700">
								Tambah
							</button>
						</div>
					</div>

					<div className="p-2 flex w-full justify-center items-end">
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Kode barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="BA-0000001"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Nama barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Nama barang"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Qty
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Qty"
							/>
						</div>

						<div className="px-4 py-2">
							<button className="px-6 py-2 bg-blue-500 rounded shadow-lg text-white hover:bg-blue-700">
								Tambah
							</button>
						</div>
					</div>

					<div className="p-2 flex w-full justify-center items-end">
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Kode barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="BA-0000001"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Nama barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Nama barang"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Qty
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Qty"
							/>
						</div>

						<div className="px-4 py-2">
							<button className="px-6 py-2 bg-blue-500 rounded shadow-lg text-white hover:bg-blue-700">
								Tambah
							</button>
						</div>
					</div>

					<div className="p-2 flex w-full justify-center items-end">
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Kode barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="BA-0000001"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Nama barang
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Nama barang"
							/>
						</div>
						<div className="px-4 py-2">
							<label htmlFor="name" className="block text-sm text-dark">
								Qty
							</label>
							<input
								type="text"
								autoComplete={"off"}
								name="name"
								id="name"
								className="w-full px-4 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
								placeholder="Qty"
							/>
						</div>

						<div className="px-4 py-2">
							<button className="px-6 py-2 bg-blue-500 rounded shadow-lg text-white hover:bg-blue-700">
								Tambah
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-end px-10  justify-center h-20 rounded-b-xl shadow-lg w-full bg-teal-100">
				<div>
					Total: <span className="text-2xl">Rp. 6000.0000.000</span>
				</div>
			</div>
		</div>
	);
}
