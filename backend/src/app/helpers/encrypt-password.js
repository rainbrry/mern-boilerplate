import CryptoJS from "crypto-js";

const passwordKey = "srAc2k3j4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9";

/**
 * @param {string} password
 * @returns {string}
 * @description Encrypt password
 * @access Public
 */
export const encryptPassword = (password) => {
	return CryptoJS.AES.encrypt(password, passwordKey);
};

/**
 * @param {string} encryptedPassword
 * @returns {string}
 * @description Decrypt password
 * @access Public
 */
export const verifyPassword = (encryptedPassword) => {
	return CryptoJS.AES.decrypt(encryptedPassword, passwordKey).toString(
		CryptoJS.enc.Utf8
	);
};
