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
		if (open && e.key === "Escape") setOpen(false);
	};

	return (
		<div>
			<button
				onClick={handleModal}
				className={`${btnStyle} outline-none`}
				tabIndex={-1}
			>
				{btnModal}
			</button>

			<div className={`modal ${open ? "modal-open" : ""}`}>
				<div className={`modal-box relative ${modalWitdh}`}>
					<button
						onClick={handleModal}
						tabIndex={-1}
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
