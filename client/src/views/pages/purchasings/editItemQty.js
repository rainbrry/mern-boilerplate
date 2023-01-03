import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ButtonPrimary } from "../../components/Button";
import { useUpdatePurchasingMutation } from "../../../services/api/purchasings";
import CreatePage from "../../components/CreatePage";
import Input from "../../components/Input";

export default function EditItemQty({ item, purchasing }) {
	const [openModal, setOpenModal] = useState(false);
	const { register, handleSubmit } = useForm();
	const [updatePurchasing] = useUpdatePurchasingMutation();

	const update = async (payload) => {
		const data = {
			...payload,
			actions: "update",
		};
		await updatePurchasing(data)
			.unwrap()
			.then(() => {
				setOpenModal(!openModal);
				toast.success("Berhasil mengubah data");
			})
			.catch((err) => {
				toast.error("Gagal mengubah data");
			});
	};

	return (
		<CreatePage
			header={"Edit Item Qty"}
			size={"max-w-lg"}
			btnModal={"Edit"}
			btnStyle={`bg-green-600 hover:bg-green-700 hover:scale-110 transition duration-150 text-white rounded shadow-md px-3 py-1`}
			openModal={openModal}
			setOpenModal={setOpenModal}
		>
			<form onSubmit={handleSubmit(update)} className="w-full">
				<Input
					type={"hidden"}
					name={"purchasingId"}
					defaultValue={purchasing.data._id}
					register={register}
				/>

				<Input
					type={"hidden"}
					name={"productId"}
					defaultValue={item.product._id}
					register={register}
				/>

				<Input
					label={"Nama barang"}
					type={"text"}
					name={"name"}
					style={`w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none bg-gray-200 capitalize`}
					defaultValue={item.product.name}
					register={register}
					readOnly={true}
				/>

				<Input
					label={"Harga"}
					type={"number"}
					style={`w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none bg-gray-200`}
					name={"price"}
					defaultValue={item.price}
					register={register}
					readOnly={true}
				/>

				<Input
					label={"Qty beli"}
					type={"text"}
					name={"qty"}
					style={`w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none bg-gray-200`}
					register={register}
					defaultValue={item.qty}
					disabled={true}
				/>

				<Input
					label={"Edit qty beli"}
					type={"number"}
					name={"qty"}
					required={true}
					register={register}
					defaultValue={item.qty}
				/>

				<div className="py-2 mt-2 flex justify-end">
					<ButtonPrimary type={"submit"}>Simpan</ButtonPrimary>
				</div>
			</form>
		</CreatePage>
	);
}
