import * as bcrypt from 'bcrypt';
import { IEncryptionService } from '../../application/ports/services/EncryptionService';

export class EncryptionService implements IEncryptionService {
	hash(stringToHash: string): string {
		return bcrypt.hashSync(stringToHash, 10);
	}

	compare(stringToCompare: string, encryptedString: string): boolean {
		return bcrypt.compareSync(stringToCompare, encryptedString);
	}
}
