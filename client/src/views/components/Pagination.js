import React from "react";

export default function Pagination() {
	return (
		<div className="w-full flex justify-center">
			<div className="flex justify-center gap-10 w-96 items-center px-2  h-10 bg-base-100 rounded shadow-lg">
				<span className="block">Previous</span>
				<span className="block">1</span>
				<span className="block">2</span>
				<span className="block">3</span>
				<span className="block">4</span>
				<span className="block">Next</span>
			</div>
		</div>
	);
}
