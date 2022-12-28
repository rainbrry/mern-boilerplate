import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchProduct from "../../components/SearchProduct";
import Cart from "../../components/Cart";
import {
	clearCart,
	removeItem,
	updateItemQty,
	addItem,
} from "../../../services/slice/purchasingCart";
import { useCreatePurchasingMutation } from "../../../services/api/purchasings";
import TransactionPage from "../../components/TransactionPage";

export default function AddPurchasing() {
	const dispatch = useDispatch();
	const [grandTotal, setGrandTotal] = useState(0);
	const [createPurchasing] = useCreatePurchasingMutation();
	const cart = useSelector((state) => state.purchasingCart.items);

	const selectProduct = (product) => {
		const data = {
			product: product._id,
			name: product.name,
			price: product.purchasePrice,
			qty: 1,
		};

		dispatch(addItem(data));
	};

	const store = async () => {
		await createPurchasing({ items: cart })
			.then(() => {
				dispatch(clearCart());
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		setGrandTotal(cart.reduce((acc, item) => acc + item.qty * item.price, 0));
	}, [cart]);

	return (
		<TransactionPage
			header={"Transaksi baru"}
			selectProduct={selectProduct}
			actions={store}
			cart={cart}
			clearCart={() => dispatch(clearCart())}
			redirectPath={"/purchasings"}
			cartType={"purchasing"}
		>
			<div>
				<Cart
					cart={cart}
					clearCart={clearCart}
					grandTotal={grandTotal}
					updateQuantity={updateItemQty}
					removeItem={removeItem}
					redirect={"/purchasing"}
					cartType={"purchasing"}
				/>
			</div>
		</TransactionPage>
	);
}
