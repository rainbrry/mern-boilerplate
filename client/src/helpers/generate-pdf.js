import html2pdf from "html2pdf.js";

export const generatePDF = (filename) => {
	const element = document.getElementById("report");
	const opt = {
		margin: 0.5,
		filename: filename,
		image: { type: "jpeg", quality: 0.98 },
		html2canvas: { scale: 2 },
		jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
	};

	html2pdf().from(element).set(opt).save();
};
