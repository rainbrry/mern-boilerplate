import React from "react";

export default function Form({ children, onSubmit }) {
	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4">
			{children}
		</form>
	);
}
