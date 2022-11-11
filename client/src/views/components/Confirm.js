import React from "react";

export default function Confirm({
	open,
	setOpen,
	modalWitdh,
	btnModal,
	btnStyle,
	modalTitle,
	children,
	confirm,
}) {
	const handleModal = () => setOpen(!open);

	return (
		<div>
			<button onClick={handleModal} className={`${btnStyle}`}>
				{btnModal}
			</button>

			<div className={`modal ${open ? "modal-open" : ""}`}>
				<div className={`modal-box relative ${modalWitdh}`}>
					<button
						onClick={handleModal}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</button>
					<h3 className="font-bold text-xl">{modalTitle}</h3>

					{children}

					<div className="modal-action">
						{confirm}
						<button
							onClick={handleModal}
							className="px-4 py-2 bg-gray-500 hover:bg-gray-700 rounded shadow text-white"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
