	import React, { useEffect, useState } from "react";
	import { useDispatch, useSelector } from "react-redux";
	import SearchProduct from "../../components/SearchProduct";
	import {
		editCart,
		clearCart,
		updateQuantity,
		removeItem,
		addToCart,
	} from "../../../redux/features/purchasingCartSlice";
	import {
		purchasingsSelector,
		updatePurchasing,
	} from "../../../redux/features/purchasingsSlice";
	import { NavLink, useNavigate } from "react-router-dom";
	import Cart from "../../components/Cart";

	export default function EditPurchasing() {
		const id = window.location.pathname.split("/")[2];
		const [grandTotal, setGrandTotal] = useState(0);
		const { cart } = useSelector((state) => state.purchasingCart);
		const dispatch = useDispatch();
		const redirect = useNavigate();
		const purchasing = useSelector((state) =>
			purchasingsSelector.selectById(state, id)
		);

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

		const update = async () => {
			const data = {
				id: purchasing._id,
				items: cart,
				grandTotal,
			};

			if (cart.length) {
				await dispatch(updatePurchasing(data));
				await dispatch(clearCart());
			}

			setTimeout(() => {
				redirect("/purchasings");
			}, 1000);
		};

		useEffect(() => {
			purchasing?.products?.forEach((product) => {
				const data = {
					product: product.product._id,
					name: product.product.name,
					price: product.price,
					qty: product.qty,
				};

				if (purchasing) dispatch(editCart(data));
			});
		}, [purchasing, dispatch]);

		useEffect(() => {
			setGrandTotal(
				cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
			);
		}, [cart]);

		return (
			<div className="px-8 py-4 overflow-hidden">
				<h3 className="text-2xl text-base-500">Edit Transaksi</h3>
				<div className="w-full flex gap-4 justify-end items-center px-4 py-2 bg-base-200">
					<div className="flex flex-1 items-center">
						<SearchProduct addItem={addItem} />
					</div>

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
							onClick={() => dispatch(clearCart())}
							className={`px-6 py-2 rounded shadow-lg text-white ${
								!cart.length ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-700"
							}`}
							tabIndex={-1}
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
						redirect={"/purchasing"}
						cartType={"purchasing"}
					/>
				</div>
			</div>
		);
	}
