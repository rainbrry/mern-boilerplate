import React from "react";
import { rupiah } from "../../../helpers/currency";
import { useShowSellingQuery } from "../../../services/api/sellings";
import IndexPage from "../../components/IndexPage";
import ReturnItem from "./return-item";

export default function EditSelling() {
	const id = window.location.pathname.split("/")[2];
	const { data: selling } = useShowSellingQuery(id);

	return (
		<IndexPage header={"Retur barang"}>
			<div className="py-4">
				<div className="w-full h-[700px] bg-base-100 rounded shadow-xl overflow-hidden overflow-y-auto">
					<div className="flex flex-row border-b-4 w-full">
						<div className="px-4 py-2 w-96 font-medium">Nama barang</div>
						<div className="px-4 py-2 w-64">Harga</div>
						<div className="px-4 py-2 w-28">Qty</div>
						<div className="px-4 py-2 w-64">Total</div>
						<div className="pl-6 py-2 w-52 flex justify-center">Action</div>
					</div>
					{selling &&
						selling.products.map((item, index) => (
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

									<div className="py-1 pl-6 w-52 flex justify-center gap-2">
										<ReturnItem item={item} selling={selling} />
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</IndexPage>
	);
}
