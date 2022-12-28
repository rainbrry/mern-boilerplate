import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const purchasingCart = createSlice({
	name: "purchasingCart",
	initialState: { items: [], purchasings: [] },
	reducers: {
		// Add item to cart
		addItem: (state, action) => {
			const item = action.payload;
			const itemExists = state.items.find((i) => i.product === item.product);

			if (itemExists) toast.error("Barang suda ada di keranjang");
			else state.items.push({ ...item, qty: action.payload.qty || 1 });
		},

		// Remove item from cart
		removeItem: (state, action) => {
			const item = action.payload;
			state.items = state.items.filter((i) => i.product !== item.product);
		},

		// Update item qty
		updateItemQty: (state, action) => {
			const item = action.payload;
			const itemExists = state.items.find((i) => i.product === item.product);

			if (itemExists) itemExists.qty = item.qty;

			if (item.qty === "" || item.qty < 1) {
				itemExists.qty = 1;
				toast.error("Jumlah barang tidak boleh kurang dari 1");
			}
		},

		// Clear cart
		clearCart: (state) => {
			state.items = [];
		},

		// edit purchasing cart
		editPurchasing: (state, action) => {
			const item = action.payload;
			const itemExists = state.purchasings.find(
				(i) => i.product === item.product
			);

			if (itemExists) toast.error("Barang sudah ada di keranjang");
			else state.purchasings.push({ ...item });
		},

		updatePurchasingQty: (state, action) => {
			const item = action.payload;
			const itemExists = state.purchasings.find(
				(i) => i.product === item.product
			);

			if (itemExists) itemExists.qty = item.qty;

			if (item.qty === "" || item.qty < 1) {
				itemExists.qty = 1;
				toast.error("Jumlah barang tidak boleh kurang dari 1");
			}
		},

		removePurchasing: (state, action) => {
			const item = action.payload;
			state.purchasings = state.purchasings.filter(
				(i) => i.product !== item.product
			);
		},

		clearPurchasing: (state) => {
			state.purchasings = [];
		},
	},
});

export const {
	addItem,
	removeItem,
	updateItemQty,
	clearCart,
	editPurchasing,
	updatePurchasingQty,
	removePurchasing,
	clearPurchasing,
} = purchasingCart.actions;
export default purchasingCart.reducer;
