import React from "react";

export default function Modal({
	open,
	setOpen,
	modalWitdh,
	btnModal,
	btnStyle,
	modalTitle,
	children,
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
						tabIndex={-1}
						onClick={handleModal}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</button>
					<h3 className="text-lg font-bold text-left">{modalTitle}</h3>
					{children}
				</div>
			</div>
		</div>
	);
}
