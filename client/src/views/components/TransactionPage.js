import React from "react";
import { NavLink } from "react-router-dom";
import SaveTransaction from "../pages/sellings/save";
import SearchProduct from "./SearchProduct";

export default function TransactionPage({
	cart,
	header,
	actions,
	cartType,
	clearCart,
	grandTotal,
	redirectPath,
	selectProduct,
	children,
}) {
	return (
		<div className="px-8 py-4 overflow-hidden">
			<h3 className="text-2xl text-base-500">{header}</h3>
			<div className="w-full flex gap-4 justify-end items-center px-4 py-2 bg-base-200">
				<div className="flex flex-1 items-center">
					<SearchProduct
						selectProduct={selectProduct}
						cartType={cartType}
						actions={actions}
					/>
				</div>
				<div className="flex gap-2">
					{cartType === "selling" ? (
						<SaveTransaction grandTotal={grandTotal} cart={cart} />
					) : (
						<button
							onClick={actions}
							className={`px-6 py-2 rounded shadow-lg text-white ${
								!cart.length ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
							}`}
							tabIndex={-1}
							disabled={!cart.length}
						>
							Simpan
						</button>
					)}

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
						onClick={clearCart}
						className={`px-6 py-2 rounded shadow-lg text-white ${
							!cart.length ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-700"
						}`}
						tabIndex={-1}
						disabled={!cart.length}
					>
						Clear
					</button>

					<NavLink
						onClick={clearCart}
						to={redirectPath}
						className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md shadow-md text-white"
						tabIndex={-1}
					>
						Batal
					</NavLink>
				</div>
			</div>

			{children}
		</div>
	);
}
