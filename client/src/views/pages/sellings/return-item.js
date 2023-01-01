import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonPrimary } from "../../components/Button";
import { useReturnItemMutation } from "../../../services/api/sellings";
import CreatePage from "../../components/CreatePage";
import Input from "../../components/Input";

export default function ReturnItem({ item, selling }) {
	const [openModal, setOpenModal] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const [returnSelling] = useReturnItemMutation();

	const update = async (payload) => {
		const data = {
			productId: item.product._id,
			purchasePrice: item.product.purchasePrice,
			...payload,
		};
		await returnSelling(data)
			.then(() => {
				setOpenModal(!openModal);
				reset();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<CreatePage
			header={"Retur barang"}
			size={"max-w-lg"}
			btnModal={"Retur"}
			btnStyle={`bg-pink-600 hover:bg-pink-700 hover:scale-110 transition duration-150 text-white rounded shadow-md px-3 py-1`}
			openModal={openModal}
			setOpenModal={setOpenModal}
		>
			<form onSubmit={handleSubmit(update)} className="w-full">
				<Input
					type={"hidden"}
					name={"sellingId"}
					defaultValue={selling._id}
					register={register}
				/>

				<Input
					type={"hidden"}
					name={"productId"}
					defaultValue={item.product._id}
					register={register}
				/>

				<div className="p-2">
					<Input
						label={"Nama barang"}
						type={"text"}
						name={"name"}
						style={`w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none bg-gray-200 capitalize`}
						defaultValue={item.product.name}
						register={register}
						readOnly={true}
					/>
				</div>

				<div className="p-2">
					<Input
						label={"Harga"}
						type={"number"}
						style={`w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none bg-gray-200`}
						name={"price"}
						defaultValue={item.price}
						register={register}
						readOnly={true}
					/>
				</div>

				<div className="p-2">
					<Input
						label={"Qty beli"}
						type={"text"}
						name={"qty"}
						style={`w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none bg-gray-200`}
						register={register}
						defaultValue={item.qty}
						readOnly={true}
					/>
				</div>

				<div className="p-2">
					<Input
						label={"Retur qty"}
						type={"number"}
						name={"returnQty"}
						required={true}
						register={register}
						defaultValue={0}
						max={item.qty}
						min={0}
					/>
				</div>

				<div className="p-2">
					<label className="block" htmlFor="">
						Alasan
					</label>
					<div className="flex gap-6">
						<Input
							label={"Rusak"}
							type={"checkbox"}
							style={`px-1 rounded-md border border-gray-300 outline-none bg-gray-200`}
							name={"reason"}
							required={true}
							value={"broken"}
							register={register}
						/>

						<Input
							label={"Lainnya"}
							type={"checkbox"}
							style={`px-1 rounded-md border border-gray-300 outline-none bg-gray-200`}
							name={"reason"}
							required={true}
							value={"other"}
							register={register}
						/>
					</div>
				</div>

				<div className="p-2">
					<label htmlFor="">Solusi</label>

					<div className="flex gap-6">
						<Input
							label={"Tukar"}
							type={"radio"}
							style={`px-1 rounded-md border border-gray-300 outline-none bg-gray-200`}
							name={"solution"}
							required={true}
							value={"change"}
							register={register}
						/>

						<Input
							label={"Refund"}
							type={"radio"}
							style={`px-1 rounded-md border border-gray-300 outline-none bg-gray-200`}
							name={"solution"}
							required={true}
							value={"refund"}
							register={register}
						/>
					</div>
				</div>

				<div className="py-2 mt-2 flex justify-end">
					<ButtonPrimary type={"submit"}>Simpan</ButtonPrimary>
				</div>
			</form>
		</CreatePage>
	);
}
