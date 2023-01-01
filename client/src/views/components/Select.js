import React from "react";

export default function Select({
	children,
	label,
	register,
	required,
	name,
	onChange,
	defaultValue,
	...props
}) {
	return (
		<>
			<label htmlFor={name} className="block text-sm text-dark">
				{label}
			</label>
			<select
				name={name}
				id={name}
				className="w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500 bg-white"
				onChange={onChange}
				defaultValue={defaultValue}
				{...register(name, { required })}
			>
				{children}
			</select>
		</>
	);
}
