// import { format } from "date-fns";
// import { v4 as uuid } from "uuid";
// import fs from "fs";
// import path from "path";

// const fsPromises = fs.promises;
// const logEvents = async (message, logFileName) => {
// 	const dateTime = `${format(new Date(), "yyyy-MM-dd HH:mm:ss")}`;
// 	const logTime = `${dateTime}\t${uuid}\t${message}\n`;

// 	try {
// 		if (!fs.existsSync(__dirname, "../../", "logs")) {
// 			await fsPromises.writeFile(__dirname, "../../", "logs");
// 		}
// 		await fsPromises.appendFile(
// 			path.join(__dirname, "../../", "logs", logFileName),
// 			logTime
// 		);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// const logger = (req, res, next) => {
// 	logEvents(
// 		`Request: ${req.method} ${req.url}, ${req.headers.origin}`,
// 		"request.log"
// 	);
// 	console.log(`Request: ${req.method} ${req.path}`);
// 	next();
// };

// export { logEvents, logger };
