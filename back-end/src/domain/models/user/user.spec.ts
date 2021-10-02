import { User } from './user';

describe('domain/User', () => {
  describe('constructor', () => {
    it('should create a new User', () => {
      // GIVEN
      const firstName = 'Karl';
      const lastName = 'Marx';

      // WHEN
      const user = new User(1, firstName, lastName);

      // THEN
      expect(user.id).toBe(1);
      expect(user.firstName).toBe('Karl');
      expect(user.lastName).toBe('Marx');
    });

    it('should fail when first name is null', () => {
      // GIVEN
      const firstName = null;
      const lastName = 'Marx';

      // WHEN
      const result = () => new User(2, firstName, lastName);

      // THEN
      expect(result).toThrowError('Names cannot be null or empty.');
    });

    it('should fail when last name is empty', () => {
      // GIVEN
      const firstName = 'Karl';
      const lastName = '';

      // WHEN
      const result = () => new User(3, firstName, lastName);

      // THEN
      expect(result).toThrowError('Names cannot be null or empty.');
    });
  });
});
