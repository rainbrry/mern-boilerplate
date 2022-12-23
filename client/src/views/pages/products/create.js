import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "../../../services/api/products";
import { ButtonPrimary } from "../../components/Button";
import CreatePage from "../../components/CreatePage";
import Input from "../../components/Input";

export default function AddProduct() {
	const [openModal, setOpenModal] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const [createProduct] = useCreateProductMutation();

	const store = async (data) => {
		await createProduct(data);
		reset();
		setOpenModal(!openModal);
	};

	return (
		<CreatePage
			header={"Tambah produk"}
			size={"max-w-lg"}
			btnModal={"Tambah produk"}
			openModal={openModal}
			setOpenModal={setOpenModal}
		>
			<form onSubmit={handleSubmit(store)} className="w-full">
				<Input
					label={"Nama barang"}
					type={"text"}
					name={"name"}
					required={true}
					register={register}
				/>

				<Input
					label={"Kategori"}
					type={"text"}
					name={"category"}
					required={true}
					register={register}
				/>

				<Input
					label={"Supplier"}
					type={"text"}
					name={"supplier"}
					required={true}
					register={register}
				/>

				<Input
					label={"Harga beli"}
					type={"number"}
					min={0}
					step={500}
					name={"purchasePrice"}
					required={true}
					register={register}
				/>

				<Input
					label={"Harga jual"}
					type={"number"}
					min={0}
					step={500}
					name={"salesPrice"}
					required={true}
					register={register}
				/>

				<div className="py-2 mt-2 flex justify-end">
					<ButtonPrimary type={"submit"}>Simpan</ButtonPrimary>
				</div>
			</form>
		</CreatePage>
	);
}
