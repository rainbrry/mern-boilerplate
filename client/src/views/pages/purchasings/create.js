import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePurchasingMutation } from "../../../services/api/purchasings";
import {
	clearCart,
	removeItem,
	updateItemQty,
	addItem,
} from "../../../services/slice/purchasingCartSlice";
import Cart from "../../components/Cart";
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
			.unwrap()
			.then(() => {
				dispatch(clearCart());
				toast.success("Transaksi berhasil");
			})
			.catch((err) => {
				toast.error("Transaksi gagal");
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
					grandTotal={grandTotal}
					updateQuantity={updateItemQty}
					removeItem={removeItem}
					cartType={"purchasing"}
				/>
			</div>
		</TransactionPage>
	);
}
