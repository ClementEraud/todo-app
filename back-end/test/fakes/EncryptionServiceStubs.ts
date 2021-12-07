import { IEncryptionService } from '../../src/application/ports/services/EncryptionService';

export class EncryptionServiceFake implements IEncryptionService {
	hash(stringToHash: string): string {
		return stringToHash;
	}
	compare(stringToCompare: string, encryptedString: string): boolean {
		return stringToCompare === encryptedString;
	}
}
