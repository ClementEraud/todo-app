export abstract class IEncryptionService {
	/**
	 * Takes a string a returns an encrypted string.
	 * @param {string} stringToHash
	 * @returns {string} - encrypted string
	 */
	abstract hash(stringToHash: string): string;
	/**
	 * Takes a string and an encryptedString and check if they match.
	 * @param {string} stringToCompare
	 * @param {string} encryptedString
	 * @returns {boolean}
	 */
	abstract compare(stringToCompare: string, encryptedString: string): boolean;
}
