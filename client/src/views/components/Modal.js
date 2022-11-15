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

	window.onkeyup = (e) => {
		if (e.key === "F2") setOpen(true);
		if (open && e.key === "Escape") setOpen(false);
	};

	return (
		<div>
			<button onClick={handleModal} className={`${btnStyle} outline-none`}>
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
					<h3 className="text-lg font-bold text-left">{modalTitle}</h3>
					{children}
				</div>
			</div>
		</div>
	);
}
