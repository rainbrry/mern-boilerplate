import React from "react";

export const ButtonPrimary = ({ children, style, ...props }) => {
	return (
		<button
			className="px-8 py-2 bg-blue-500 hover:bg-blue-700 rounded-md shadow-md text-white"
			{...props}
		>
			{children}
		</button>
	);
};

export const ButtonSecondary = ({ children, style, ...props }) => {
	return (
		<button
			className="px-8 py-2 bg-gray-500 hover:bg-gray-700 rounded-md shadow-md text-white"
			{...props}
		>
			{children}
		</button>
	);
};

export const ButtonInfo = ({ children, style, ...props }) => {
	return (
		<button
			className="px-8 py-2 bg-cyan-500 hover:bg-cyan-700 rounded-md shadow-md text-white"
			{...props}
		>
			{children}
		</button>
	);
};

export const ButtonSuccess = ({ children, style, ...props }) => {
	return (
		<button
			className="px-8 py-2 bg-green-500 hover:bg-green-700 rounded-md shadow-md text-white"
			{...props}
		>
			{children}
		</button>
	);
};

export const ButtonWarning = ({ children, style, ...props }) => {
	return (
		<button
			className="px-8 py-2 bg-yellow-500 hover:bg-yellow-700 rounded-md shadow-md text-white"
			{...props}
		>
			{children}
		</button>
	);
};

export const ButtonDanger = ({ children, style, ...props }) => {
	return (
		<button
			className="px-8 py-2 bg-red-500 hover:bg-red-700 rounded-md shadow-md text-white"
			{...props}
		>
			{children}
		</button>
	);
};
