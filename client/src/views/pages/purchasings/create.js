import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
	addToCart,
	clearCart,
	removeItem,
	updateQuantity,
} from "../../../redux/features/purchasingCartSlice";
import { addPurchasing } from "../../../redux/features/purchasingsSlice";
import SearchProduct from "../../components/SearchProduct";
import Cart from "../../components/Cart";

export default function AddPurchasing() {
	const cart = useSelector((state) => state.purchasingCart.cart);
	const [grandTotal, setGrandTotal] = useState(0);
	const dispatch = useDispatch();

	const addItem = (product) => {
		const data = {
			product: product._id,
			stock: product.stock,
			name: product.name,
			price: product.purchasePrice,
			qty: 1,
		};

		dispatch(addToCart(data));
	};

	const store = async () => {
		const data = {
			items: cart,
			purchasings: {
				grandTotal,
				status: "unconfirmed",
			},
		};

		if (cart.length) {
			await dispatch(addPurchasing(data));
			await dispatch(clearCart());
		}
	};

	useEffect(() => {
		setGrandTotal(
			cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
		);
	}, [cart]);

	return (
		<div className="px-8 py-4 overflow-hidden">
			<h3 className="text-2xl text-base-500">Transaksi baru</h3>
			<div className="w-full flex gap-4 justify-end items-center px-4 py-2 bg-base-200">
				<div className="flex flex-1 items-center">
					<SearchProduct addItem={addItem} cartType={"purchasing"} />
				</div>

				<div className="flex gap-2">
					<button
						onClick={store}
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
						onClick={() => dispatch(clearCart())}
						className={`px-6 py-2 rounded shadow-lg text-white ${
							!cart.length ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-700"
						}`}
						tabIndex={-1}
						disabled={!cart.length}
					>
						Clear
					</button>

					<NavLink
						onClick={() => dispatch(clearCart())}
						to={"/purchasings"}
						className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md shadow-md text-white"
						tabIndex={-1}
					>
						Batal
					</NavLink>
				</div>
			</div>

			<div>
				<Cart
					cart={cart}
					clearCart={clearCart}
					grandTotal={grandTotal}
					updateQuantity={updateQuantity}
					removeItem={removeItem}
					redirect={"/sellings"}
					cartType={"purchasing"}
				/>
			</div>
		</div>
	);
}
