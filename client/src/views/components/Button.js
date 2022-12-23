import React from "react";

export const ButtonPrimary = ({ children, type }) => {
	return (
		<button
			type={type}
			className="px-6 py-2 bg-blue-500 rounded shadow-lg text-white hover:bg-blue-700"
		>
			{children}
		</button>
	);
};

export const ButtonSecondary = ({ children, type }) => {
	return (
		<button
			type={type}
			className="px-6 py-2 bg-gray-500 rounded shadow-lg text-white hover:bg-gray-700"
		>
			{children}
		</button>
	);
};

export const ButtonDanger = ({ children, type }) => {
	return (
		<button
			type={type}
			className="px-6 py-2 bg-red-500 rounded shadow-lg text-white hover:bg-red-700"
		>
			{children}
		</button>
	);
};

export const ButtonWarning = ({ children, type }) => {
	return (
		<button
			type={type}
			className="px-6 py-2 bg-yellow-500 rounded shadow-lg text-white hover:bg-yellow-700"
		>
			{children}
		</button>
	);
};

export const ButtonSuccess = ({ children, type }) => {
	return (
		<button
			type={type}
			className="px-6 py-2 bg-green-500 rounded shadow-lg text-white hover:bg-green-700"
		>
			{children}
		</button>
	);
};
