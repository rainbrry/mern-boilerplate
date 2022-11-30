import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const cartSlice = createSlice({
	name: "purchasing-cart",
	initialState: { cart: [] },
	reducers: {
		addToCart: (state, action) => {
			const itemInCart = state.cart.find(
				(item) => item.product === action.payload.product
			);

			if (itemInCart) toast.error("Item sudah ada di keranjang");
			else state.cart.push({ ...action.payload, qty: action.payload.qty || 1 });
		},

		editCart: (state, action) => {
			state.cart.push({ ...action.payload, qty: action.payload.qty });
		},

		removeItem: (state, action) => {
			const items = state.cart.filter(
				(item) => item.product !== action.payload.product
			);
			state.cart = items;
		},

		clearCart: (state) => {
			state.cart = [];
		},

		updateQuantity: (state, action) => {
			const itemInCart = state.cart.find(
				(item) => item.product === action.payload.product
			);

			if (itemInCart) itemInCart.qty = action.payload.qty;

			if (action.payload.qty === "" || action.payload.qty < 1) {
				itemInCart.qty = 1;
				toast.error("Qty tidak boleh kurang dari 1");
			}
		},
	},
});

export const { addToCart, editCart, updateQuantity, removeItem, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
