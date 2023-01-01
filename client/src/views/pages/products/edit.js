import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonPrimary } from "../../components/Button";
import { useUpdateProductMutation } from "../../../services/api/products";
import CreatePage from "../../components/CreatePage";
import Input from "../../components/Input";

export default function EditProduct({ product }) {
	const [openModal, setOpenModal] = useState(false);
	const [updateProduct] = useUpdateProductMutation();
	const { register, handleSubmit, reset } = useForm();

	const update = async (data) => {
		await updateProduct(data);
		reset();
		setOpenModal(!openModal);
	};

	return (
		<CreatePage
			header={"Edit produk"}
			size={"max-w-lg"}
			btnModal={"Edit"}
			btnStyle={`px-4 py-0.5 bg-green-600 rounded-lg shadow text-white hover:bg-green-700`}
			openModal={openModal}
			setOpenModal={setOpenModal}
		>
			<form onSubmit={handleSubmit(update)} className="w-full">
				<Input
					type={"hidden"}
					name={"id"}
					register={register}
					defaultValue={product._id}
				/>

				<div className="p-2">
					<Input
						label={"Nama barang"}
						type={"text"}
						name={"name"}
						capitalize={true}
						required={true}
						defaultValue={product.name}
						register={register}
					/>
				</div>

				<div className="p-2">
					<Input
						label={"Kategori"}
						type={"text"}
						name={"category"}
						capitalize={true}
						required={true}
						defaultValue={product.category}
						register={register}
					/>
				</div>

				<div className="p-2">
					<Input
						label={"Supplier"}
						type={"text"}
						name={"supplier"}
						capitalize={true}
						required={true}
						defaultValue={product.supplier}
						register={register}
					/>
				</div>

				<div className="p-2">
					<Input
						label={"Harga beli"}
						type={"number"}
						min={0}
						step={500}
						name={"purchasePrice"}
						required={true}
						defaultValue={product.purchasePrice}
						register={register}
					/>
				</div>

				<div className="p-2">
					<Input
						label={"Harga jual"}
						type={"number"}
						min={0}
						step={500}
						name={"salesPrice"}
						required={true}
						defaultValue={product.salesPrice}
						register={register}
					/>
				</div>

				<div className="py-2 mt-2 flex justify-end">
					<ButtonPrimary type={"submit"}>Simpan</ButtonPrimary>
				</div>
			</form>
		</CreatePage>
	);
}
