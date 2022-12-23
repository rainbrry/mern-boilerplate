import React, { useState } from "react";
import Modal from "./Modal";

export default function CreatePage({
	children,
	header,
	size,
	btnStyle,
	btnModal,
	openModal,
	setOpenModal,
}) {
	return (
		<Modal
			open={openModal}
			setOpen={setOpenModal}
			btnModal={btnModal}
			btnStyle={` ${
				btnStyle
					? btnStyle
					: "px-8 py-2 bg-blue-500 rounded-md shadow-md text-white hover:bg-blue-700"
			}`}
			modalTitle={header}
			modalWitdh={size}
		>
			{children}
		</Modal>
	);
}
