import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const cartSlice = createSlice({
	name: "purchasing-cart",
	initialState: { cart: [] },
	reducers: {
		addToCart: (state, action) => {
			const itemInCart = state.cart.find(
				(item) => item._id === action.payload._id
			);

			if (itemInCart) toast.error("Item sudah ada di keranjang");
			else state.cart.push({ ...action.payload, qty: 1 });
		},

		changeQty: (state, action) => {
			const itemInCart = state.cart.find(
				(item) => item._id === action.payload.id
			);

			if (itemInCart) itemInCart.qty = action.payload.qty;
		},

		removeItem: (state, action) => {
			const items = state.cart.filter((item) => item._id !== action.payload.id);
			state.cart = items;
		},

		clearCart: (state) => {
			state.cart = [];
		},
	},
});

export const { addToCart, changeQty, removeItem, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
