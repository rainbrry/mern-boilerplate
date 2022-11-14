import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	changeQty,
	removeItem,
} from "../../../redux/features/purchasingsSlice";
import { rupiah } from "../../../helpers/currency";

export default function PurchasingCart() {
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.purchasings);

	return (
		<div className="w-full h-[420px] bg-base-100 rounded-t-xl shadow-xl overflow-hidden overflow-y-auto">
			<div className="flex flex-row border-b-4 w-full px-5">
				<div className="px-3 py-2 w-5/12 font-medium">Nama barang</div>
				<div className="px-4 py-2 w-2/12">Harga beli</div>
				<div className="px-4 py-2 w-1/12">Qty</div>
				<div className="px-4 py-2 w-2/12 text-center">Total</div>
				<div className="pl-6 py-2 w-2/12 text-center">Action</div>
			</div>
			{cart.map((item, index) => {
				return (
					<div
						className="px-8 py-2 border-b-2 flex w-full items-center"
						key={index}
					>
						<div className="flex flex-row w-full items-center">
							<div className="py-1 w-5/12 truncate capitalize">{item.name}</div>
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
							<div className="px-2 py-1 w-1/12">
								<button
									onClick={() => dispatch(removeItem({ id: item._id }))}
									className="bg-red-500 hover:bg-red-700 hover:scale-110 transition duration-150 text-white rounded shadow-md px-4 py-1"
								>
									Hapus
								</button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
