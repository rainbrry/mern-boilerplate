import React, { useState } from "react";
import { toast } from "react-hot-toast";
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
		await createProduct(data)
			.unwrap()
			.then(() => {
				setOpenModal(!openModal);
				reset();
				toast.success("Berhasil menambahkan data");
			})
			.catch((err) => {
				toast.error("Gagal menambahkan data");
			});
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
				<div className="p-2">
					<Input
						label={"Nama barang"}
						type={"text"}
						name={"name"}
						capitalize={true}
						required={true}
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
