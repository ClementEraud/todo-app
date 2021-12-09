export class MissingRequiredProperties extends Error {
	missingProperties: string[];

	constructor(missingProperties) {
		super('Missing required properties.');
		this.missingProperties = missingProperties;
	}
}
