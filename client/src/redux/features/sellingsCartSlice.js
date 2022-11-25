import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const sellingSlice = createSlice({
	name: "sellings-cart",
	initialState: { cart: [] },
	reducers: {
		addToCart: (state, action) => {
			if (action.payload.stock < 1) toast.error("Stok kurang");

			const itemInCart = state.cart.find(
				(items) => items.product === action.payload.product
			);

			if (itemInCart) toast.error("Item sudah ada di keranjang");
			else state.cart.push({ ...action.payload, qty: 1 });
		},

		removeItem: (state, action) => {
			const items = state.cart.filter(
				(items) => items.product !== action.payload.product
			);
			state.cart = items;
		},

		clearCart: (state) => {
			state.cart = [];
		},

		updateQuantity: (state, action) => {
			const itemInCart = state.cart.find(
				(items) => items.product === action.payload.product
			);
			
			if (itemInCart) itemInCart.qty = action.payload.qty;

			if (action.payload.qty > itemInCart.stock) {
				toast.error("Stok kurang");
				itemInCart.qty = itemInCart.stock;
			}

			if (action.payload.stock < itemInCart.qty) {
				toast.error("Stok kurang");
				itemInCart.qty = action.payload.stock;
			}

			if (itemInCart.qty < 1) {
				itemInCart.qty = 1;
				toast.error("Qty tidak boleh kurang dari 1");
			}
		},
	},
});

export const { addToCart, removeItem, clearCart, updateQuantity } =
	sellingSlice.actions;
export default sellingSlice.reducer;
