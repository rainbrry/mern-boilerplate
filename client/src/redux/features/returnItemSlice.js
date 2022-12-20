import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const returnItemSlice = createSlice({
	name: "return-item",
	initialState: { cart: [] },
	reducers: {
		addToCart: (state, action) => {
			const itemInCart = state.cart.find(
				(item) => item.product === action.payload.product
			);

			if (!itemInCart)
				state.cart.push({
					...action.payload,
					buyQty: action.payload.buyQty,
					qty: action.payload.qty,
					returnQty: action.payload.returnQty,
					total: action.payload.qty * action.payload.price,
					profit: action.payload.price - action.payload.purchasePrice,
					reason: [],
				});
		},

		updateQuantity: (state, action) => {
			const itemInCart = state.cart.find(
				(items) => items.product === action.payload.product
			);

			if (itemInCart) {
				itemInCart.qty = action.payload.qty;
				itemInCart.returnQty = itemInCart.buyQty - action.payload.qty;
				itemInCart.total = itemInCart.qty * itemInCart.price;
				itemInCart.profit =
					itemInCart.qty * (itemInCart.price - itemInCart.purchasePrice);
			}

			if (itemInCart.qty > itemInCart.buyQty) {
				toast.error("Return quantity cannot be more than bought quantity");
				itemInCart.qty = itemInCart.buyQty;
			}
		},

		clearCart: (state) => {
			state.cart = [];
		},

		returnReason: (state, action) => {
			const itemInCart = state.cart.find(
				(items) => items.product === action.payload.product
			);

			if (itemInCart) {
				if (action.payload.checked) {
					itemInCart.reason.push(action.payload.reason);
				} else {
					itemInCart.reason = itemInCart.reason.filter(
						(item) => item !== action.payload.reason
					);
				}
			}
		},
	},
});

export const { addToCart, editCart, updateQuantity, clearCart, returnReason } =
	returnItemSlice.actions;
export default returnItemSlice.reducer;
