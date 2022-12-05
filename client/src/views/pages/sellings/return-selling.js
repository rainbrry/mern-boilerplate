import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
	addToCart,
	clearCart,
	returnReason,
	updateQuantity,
} from "../../../redux/features/returnItemSlice";
import {
	returnItem,
	sellingsSelector,
} from "../../../redux/features/sellingsSlice";
import { rupiah } from "../../../helpers/currency";

export default function ReturnSelling() {
	const id = window.location.pathname.split("/")[2];
	const [change, setChange] = useState(0);
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.returnItem);
	const selling = useSelector((state) =>
		sellingsSelector.selectById(state, id)
	);

	const handleCheck = (e, product) => {
		const { value, checked } = e.target;

		dispatch(
			returnReason({
				product,
				reason: value,
				checked,
			})
		);
	};

	const update = async () => {
		const data = { id, items: cart };
		await dispatch(returnItem(data));
	};

	useEffect(() => {
		selling?.products?.forEach((product) => {
			const data = {
				product: product.product._id,
				name: product.product.name,
				price: product.price,
				buyQty: product.qty,
				qty: product.qty,
				returnQty: 0,
			};

			if (selling) dispatch(addToCart(data));
		});
	}, [selling, dispatch]);

	useEffect(() => {
		setChange(
			cart.reduce(
				(acc, item) => acc - Number(item.price) * Number(item.returnQty),
				0
			)
		);
	}, [cart, selling]);

	return (
		<div className="px-8 py-4 overflow-hidden">
			<h3 className="text-2xl text-base-500">Edit Transaksi</h3>
			<div className="w-full flex gap-4 justify-end items-center px-4 py-2 bg-base-200">
				<div className="flex gap-2">
					<button
						onClick={update}
						className={`px-6 py-2 rounded shadow-lg text-white ${
							!cart.length ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
						}`}
						tabIndex={-1}
						disabled={!cart.length}
					>
						Simpan
					</button>

					<button
						className={`px-6 py-2 rounded shadow-lg text-white ${
							!cart.length ? "bg-gray-400" : "bg-cyan-500 hover:bg-cyan-700"
						}`}
						tabIndex={-1}
						disabled={!cart.length}
					>
						Hold
					</button>

					<button
						className={`px-6 py-2 rounded shadow-lg text-white ${
							!cart.length ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-700"
						}`}
						tabIndex={-1}
					>
						Clear
					</button>

					<NavLink
						to={"/sellings"}
						onClick={() => dispatch(clearCart())}
						className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md shadow-md text-white"
						tabIndex={-1}
					>
						Batal
					</NavLink>
				</div>
			</div>

			{
				<div className="overflow-hidden">
					<div className="w-full h-[580px] bg-base-100 rounded-t-xl shadow-xl overflow-hidden overflow-y-auto">
						<div className="flex flex-row border-b-4 w-full px-5">
							<div className="px-3 py-2 w-5/12 font-medium">Nama barang</div>
							<div className="px-4 py-2 w-2/12">Harga</div>
							<div className="px-4 py-2 w-2/12 text-center">Qty</div>
							<div className="px-4 py-2">Retur</div>
							<div className="pl-6 py-2 w-2/12 text-center">Action</div>
						</div>
						{!cart.length ? (
							<span className="flex justify-center py-40 text-xl font-semibold items-center">
								Kosong
							</span>
						) : (
							cart.map((item, index) => {
								return (
									<div
										className="px-8 py-2 border-b-2 flex w-full items-centerw"
										key={index}
									>
										<div className="flex flex-row w-full items-center">
											<div className="py-1 w-5/12 truncate capitalize">
												{item.name}
											</div>

											<div className="px-4 py-1 w-2/12 truncate">
												{rupiah(item.price)}
											</div>

											<div className="w-2/12 text-center pl-10">
												<input
													type="number"
													min={0}
													max={item.buyQty}
													value={item.qty || 0}
													required
													className="text-center w-20 py-1 border-2 rounded shadow-lg border-gray-500"
													autoComplete={"off"}
													onChange={(e) =>
														dispatch(
															updateQuantity({
																product: item.product,
																qty: e.target.value,
															})
														)
													}
												/>
											</div>

											<div className="px-4 py-1">{item.returnQty} pcs</div>

											<div className="px-2 py-1 pl-20 flex flex-col">
												<div className="flex justify-between gap-2">
													<label htmlFor="change">Tukar</label>
													<input
														type="checkbox"
														id="change"
														value={"change"}
														onChange={(e) => handleCheck(e, item.product)}
													/>
												</div>
												<div className="flex justify-between gap-2">
													<label htmlFor="broken">Rusak</label>
													<input
														type="checkbox"
														id="broken"
														value={"broken"}
														onChange={(e) => handleCheck(e, item.product)}
													/>
												</div>
												<div className="flex justify-between gap-2">
													<label htmlFor="refund">Refund</label>
													<input
														type="checkbox"
														id="refund"
														value={"refund"}
														onChange={(e) => handleCheck(e, item.product)}
													/>
												</div>
											</div>
										</div>
									</div>
								);
							})

							// cart.map((item, index) => {
							// 	return (
							// 		<div
							// 			className="px-8 py-2 border-b-2 flex w-full items-centerw"
							// 			key={index}
							// 		>
							// 			<div className="flex flex-row w-full items-center">
							// 				<div className="py-1 w-5/12 truncate capitalize">
							// 					{item.name}
							// 				</div>

							// 				<div className="px-4 py-1 w-2/12 truncate">
							// 					{rupiah(item.price)}
							// 				</div>

							// 				<div className="px-4 py-1">{item.qty} pcs</div>

							// 				<div className="w-2/12 text-center pl-10">
							// 					<input
							// 						type="number"
							// 						min={0}
							// 						max={item.qty}
							// 						value={item.returnQty || 0}
							// 						required
							// 						className="text-center w-20 py-1 border-2 rounded shadow-lg border-gray-500"
							// 						autoComplete={"off"}
							// 						onChange={(e) =>
							// 							dispatch(
							// 								updateQuantity({
							// 									product: item.product,
							// 									returnQty: e.target.value,
							// 								})
							// 							)
							// 						}
							// 					/>
							// 				</div>

							// 				<div className="px-2 py-1 pl-20 flex flex-col">
							// 					<div className="flex justify-between gap-2">
							// 						<label htmlFor="change">Tukar</label>
							// 						<input
							// 							type="checkbox"
							// 							id="change"
							// 							value={"change"}
							// 							onChange={(e) => handleCheck(e, item.product)}
							// 						/>
							// 					</div>
							// 					<div className="flex justify-between gap-2">
							// 						<label htmlFor="broken">Rusak</label>
							// 						<input
							// 							type="checkbox"
							// 							id="broken"
							// 							value={"broken"}
							// 							onChange={(e) => handleCheck(e, item.product)}
							// 						/>
							// 					</div>
							// 					<div className="flex justify-between gap-2">
							// 						<label htmlFor="refund">Refund</label>
							// 						<input
							// 							type="checkbox"
							// 							id="refund"
							// 							value={"refund"}
							// 							onChange={(e) => handleCheck(e, item.product)}
							// 						/>
							// 					</div>
							// 				</div>
							// 			</div>
							// 		</div>
							// 	);
							// })
						)}
					</div>

					<div className="flex justify-end py-4">
						<div className="px-2">
							<div className="text-lg">Total sebelumnya : </div>
							<div className="text-lg">Kembalian : </div>
						</div>

						<div className="px-2">
							<div className="text-lg font-semibold">
								{rupiah(selling.grandTotal)}
							</div>
							<div className="text-lg font-semibold">{rupiah(change)}</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
}
