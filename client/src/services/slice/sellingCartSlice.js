import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const sellingCartSlice = createSlice({
	name: "sellingsCart",
	initialState: { items: [] },
	reducers: {
		// Add item to cart
		addItem: (state, action) => {
			const item = action.payload;

			const itemExists = state.items.find((i) => i.product === item.product);

			if (item.stock < 1) toast.error("Stok barang tidak mencukupi");
			else if (itemExists) toast.error("Barang suda ada di keranjang");
			else
				state.items.push({
					...item,
					qty: 1,
					total: item.price * item.qty,
				});
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

			if (itemExists) {
				itemExists.qty = item.qty;
				itemExists.total = itemExists.price * itemExists.qty;
			}

			if (item.qty > item.stock) {
				toast.error("Jumlah barang tidak boleh melebihi stok");
				itemExists.qty = item.stock;
			}

			if (item.qty === "" || item.qty < 1) {
				itemExists.qty = 1;
				toast.error("Jumlah barang tidak boleh kurang dari 1");
			}
		},

		// Clear cart
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, updateItemQty, clearCart } =
	sellingCartSlice.actions;
export default sellingCartSlice.reducer;
