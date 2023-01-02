import React from "react";

export default function Textarea({
	style,
	label,
	rows,
	cols,
	name,
	register,
	required,
	onChange,
	defaultValue,
}) {
	return (
		<>
			<label htmlFor={name} className="block text-sm text-dark">
				{label}
			</label>
			<textarea
				className={` ${
					style
						? style
						: "w-full px-2 rounded-md border border-gray-300 outline-none focus:border-cyan-500"
				}`}
				name={name}
				rows={rows}
				cols={cols}
				placeholder={label}
				{...register(name, { required: true })}
				defaultValue={defaultValue}
			></textarea>
		</>
	);
}
