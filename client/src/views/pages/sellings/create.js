import React, { useEffect, useState } from "react";
import TransactionPage from "../../components/TransactionPage";
import { useDispatch, useSelector } from "react-redux";
import { useCreateSellingMutation } from "../../../services/api/sellings";
import {
	addItem,
	clearCart,
	removeItem,
	updateItemQty,
} from "../../../services/slice/sellingCartSlice";
import Cart from "../../components/Cart";

export default function AddSelling() {
	const dispatch = useDispatch();
	const [grandTotal, setGrandTotal] = useState(0);
	const cart = useSelector((state) => state.sellingCart.items);

	const selectProduct = (product) => {
		const data = {
			product: product._id,
			name: product.name,
			price: product.salesPrice,
			purchasePrice: product.purchasePrice,
			stock: product.stock,
			qty: 1,
		};

		dispatch(addItem(data));
	};

	useEffect(() => {
		setGrandTotal(cart.reduce((acc, item) => acc + item.qty * item.price, 0));
	}, [cart]);

	return (
		<TransactionPage
			header={"Transaksi baru"}
			selectProduct={selectProduct}
			cart={cart}
			clearCart={() => dispatch(clearCart())}
			redirectPath={"/sellings"}
			cartType={"selling"}
			grandTotal={grandTotal}
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
