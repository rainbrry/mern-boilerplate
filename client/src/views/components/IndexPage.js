import React from "react";

export default function IndexPage({ children, header }) {
	return (
		<div className="px-8 py-4">
			<h3 className="text-2xl text-base-500">{header}</h3>
			{children}
		</div>
	);
}
