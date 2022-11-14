import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { rupiah } from "../../../helpers/currency";
import { changeQty } from "../../../redux/features/purchasingsSlice";
import ListsProduct from "./lists-product";

export default function AddPurchasing() {
	const cart = useSelector((state) => state.purchasings.cart);
	const dispatch = useDispatch();

	const [grandTotal, setGrandTotal] = useState(0);

	useEffect(() => {
		setGrandTotal(
			cart.reduce((acc, curr) => acc + Number(curr.purchasePrice) * curr.qty, 0)
		);
	}, [cart]);

	console.log(grandTotal);

	return (
		<div className="px-8 py-4 overflow-hidden">
			<h3 className="text-2xl text-base-500">Transaksi baru</h3>
			<div className="w-full flex gap-4 justify-end items-center px-4 py-2 bg-base-200">
				<div className="flex flex-1 items-center">
					<ListsProduct />
				</div>
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
			<div className="w-full h-[420px] bg-base-100 rounded-t-xl shadow-xl overflow-hidden overflow-y-auto">
				<div className="flex flex-row border-b-4 w-full px-5">
					<div className="px-3 py-2 w-6/12 font-medium">Nama barang</div>
					<div className="px-4 py-2 w-2/12">Harga beli</div>
					<div className="px-4 py-2 w-1/12">Qty</div>
					<div className="px-4 py-2 w-2/12 text-center">Total</div>
				</div>
				{cart.map((item, index) => {
					return (
						<div
							className="px-8 py-2 border-b-2 flex w-full items-center"
							key={index}
						>
							<div className="flex flex-row w-full items-center">
								<div className="py-1 w-6/12 truncate capitalize">
									{item.name}
								</div>
								<div className="px-4 py-1 w-2/12 truncate">
									{rupiah(item.purchasePrice)}
								</div>
								<div className="w-20">
									<input
										type="number"
										min={1}
										className="text-center w-20 py-1 border-2 rounded shadow-lg border-gray-500"
										autoComplete={"off"}
										autoFocus={true}
										defaultValue={item.qty}
										onChange={(e) =>
											dispatch(changeQty({ id: item._id, qty: e.target.value }))
										}
									/>
								</div>
								<div className="px-4 py-1 w-3/12 truncate text-center">
									{rupiah(item.qty * item.purchasePrice)}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex flex-col items-end px-10  justify-center h-20 rounded-b-xl shadow-lg w-full bg-teal-100">
				<div>
					Total: <span className="text-2xl">{rupiah(grandTotal || 0)}</span>
				</div>
			</div>
		</div>
	);
}
