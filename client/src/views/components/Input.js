import React from "react";

export default function Input({
	label,
	type,
	name,
	register,
	required,
	onChange,
	defaultValue,
	style,
	capitalize,
	disabled,
	...props
}) {
	return (
		<div className="p-2">
			<label htmlFor={name} className="block text-sm text-dark">
				{label}
			</label>
			<input
				type={type}
				name={name}
				className={`${
					style
						? style
						: `w-full px-2 py-1.5 rounded-md border border-gray-300 outline-none focus:border-cyan-500 ${
								capitalize ? "capitalize" : ""
						  }`
				}`}
				placeholder={label}
				onChange={onChange}
				defaultValue={defaultValue}
				{...register(name, { required })}
				disabled={disabled}
				{...props}
			/>
		</div>
	);
}
