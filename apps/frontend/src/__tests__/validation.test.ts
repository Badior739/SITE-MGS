import { 
  validateEmail, 
  validatePassword, 
  loginSchema, 
  registerSchema,
  getValidationError 
} from '@/lib/validation';

describe('Form Validation', () => {
  describe('validateEmail', () => {
    it('accepts valid emails', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('user+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('test.email@subdomain.example.com')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('user @example.com')).toBe(false);
    });

    it('rejects empty email', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('accepts valid passwords', () => {
      expect(validatePassword('SecurePass123')).toBe(true);
      expect(validatePassword('MyPassword2026')).toBe(true);
    });

    it('rejects password shorter than 8 characters', () => {
      expect(validatePassword('Short1')).toBe(false);
    });

    it('rejects password without uppercase letter', () => {
      expect(validatePassword('onlysmall123')).toBe(false);
    });

    it('rejects password without lowercase letter', () => {
      expect(validatePassword('ONLYUPPERCASE123')).toBe(false);
    });

    it('rejects password without number', () => {
      expect(validatePassword('OnlyLettersNoNumbers')).toBe(false);
    });
  });

  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const data = {
        email: 'user@example.com',
        password: 'Password123',
      };
      expect(() => loginSchema.parse(data)).not.toThrow();
    });

    it('rejects invalid email', () => {
      const data = {
        email: 'invalid-email',
        password: 'Password123',
      };
      expect(() => loginSchema.parse(data)).toThrow();
    });

    it('rejects missing password', () => {
      const data = {
        email: 'user@example.com',
        password: '',
      };
      expect(() => loginSchema.parse(data)).toThrow();
    });
  });

  describe('registerSchema', () => {
    it('validates correct registration data', () => {
      const data = {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'SecurePass123',
        confirmPassword: 'SecurePass123',
      };
      expect(() => registerSchema.parse(data)).not.toThrow();
    });

    it('rejects mismatched passwords', () => {
      const data = {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'SecurePass123',
        confirmPassword: 'DifferentPass123',
      };
      expect(() => registerSchema.parse(data)).toThrow();
    });

    it('rejects invalid name', () => {
      const data = {
        email: 'user@example.com',
        firstName: 'J', // Too short
        lastName: 'Doe',
        password: 'SecurePass123',
        confirmPassword: 'SecurePass123',
      };
      expect(() => registerSchema.parse(data)).toThrow();
    });

    it('rejects weak password', () => {
      const data = {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'weak', // Doesn't meet requirements
        confirmPassword: 'weak',
      };
      expect(() => registerSchema.parse(data)).toThrow();
    });
  });

  describe('getValidationError', () => {
    it('returns null for valid data', () => {
      const error = getValidationError(
        loginSchema,
        { email: 'user@example.com', password: 'Pass123' }
      );
      expect(error).toBeNull();
    });

    it('returns error message for invalid data', () => {
      const error = getValidationError(
        loginSchema,
        { email: 'invalid', password: 'Pass123' }
      );
      expect(error).toBeTruthy();
      expect(error).toContain('email');
    });
  });
});
