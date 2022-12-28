import React from "react";
import {
	useShowPurchasingQuery,
	useUpdatePurchasingMutation,
} from "../../../services/api/purchasings";
import IndexPage from "../../components/IndexPage";
import { rupiah } from "../../../helpers/currency";
import EditItemQty from "./editItemQty";

export default function EditPurchasing() {
	const id = window.location.pathname.split("/")[2];
	const { data: purchasing } = useShowPurchasingQuery(id);
	const [updatePurchasing] = useUpdatePurchasingMutation();

	const remove = async (payload) => {
		const data = {
			purchasingId: purchasing.data._id,
			productId: payload.product._id,
			price: payload.price,
			qty: payload.qty,
			actions: "remove",
		};

		await updatePurchasing(data);
	};
	return (
		<IndexPage header={"Edit pembelian"}>
			<div className="py-4">
				<div className="w-full h-[700px] bg-base-100 rounded shadow-xl overflow-hidden overflow-y-auto">
					<div className="flex flex-row border-b-4 w-full">
						<div className="px-4 py-2 w-96 font-medium">Nama barang</div>
						<div className="px-4 py-2 w-64">Harga</div>
						<div className="px-4 py-2 w-28">Qty</div>
						<div className="px-4 py-2 w-64">Total</div>
						<div className="pl-6 py-2 w-52 text-center">Action</div>
					</div>
					{purchasing &&
						purchasing.data.products.map((item, index) => (
							<div
								className="py-2 border-b-2 flex w-full items-centerw"
								key={index}
							>
								<div className="flex flex-row w-full items-center">
									<div className="py-1 px-4 truncate capitalize w-96">
										{item.product.name}
									</div>

									<div className="py-1 px-4 truncate w-64">
										{rupiah(item.price)}
									</div>

									<div className="py-1 px-4 truncate w-28">{item.qty}</div>

									<div className="py-1 px-4 truncate w-64">
										{rupiah(item.qty * item.price)}
									</div>

									<div className="py-1 px-4 w-52 flex justify-center gap-2">
										<EditItemQty item={item} purchasing={purchasing} />

										<button
											onClick={() => remove(item)}
											className="bg-red-500 hover:bg-red-700 hover:scale-110 transition duration-150 text-white rounded shadow-md px-2 py-1"
											tabIndex={-1}
										>
											Hapus
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</IndexPage>
	);
}
