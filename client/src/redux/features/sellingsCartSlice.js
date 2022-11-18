import { createSlice } from "@reduxjs/toolkit";

const sellingSlice = createSlice({
	name: "sellings-cart",
	initialState: {
		cart: [],
	},
	reducers: {
		addToCart: (state, action) => {
			const { product, quantity } = action.payload;
			const item = state.cart.find((item) => item.product._id === product._id);
			if (item) {
				item.quantity += quantity;
			} else {
				state.cart.push({ product, quantity });
			}
		},

		removeItem: (state, action) => {
			const { productId } = action.payload;
			state.cart = state.cart.filter((item) => item.product._id !== productId);
		},

		clearCart: (state) => {
			state.cart = [];
		},

		updateQuantity: (state, action) => {
			const { productId, quantity } = action.payload;
			const item = state.cart.find((item) => item.product._id === productId);
			if (item) {
				item.quantity = quantity;
			}
		},
	},
});

export const { addToCart, removeItem, clearCart, updateQuantity } =
	sellingSlice.actions;
export default sellingSlice.reducer;
