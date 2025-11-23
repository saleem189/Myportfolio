import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateName,
  validateMessage,
  validatePhone,
  validateUrl,
  validateForm,
} from '../validators';

describe('validateEmail', () => {
  it('should validate correct email addresses', () => {
    expect(validateEmail('test@example.com')).toEqual({ valid: true, message: '' });
    expect(validateEmail('user.name@domain.co.uk')).toEqual({ valid: true, message: '' });
  });

  it('should reject invalid email addresses', () => {
    expect(validateEmail('invalid')).toEqual({
      valid: false,
      message: 'Please enter a valid email address',
    });
    expect(validateEmail('test@')).toEqual({
      valid: false,
      message: 'Please enter a valid email address',
    });
    expect(validateEmail('')).toEqual({ valid: false, message: 'Email is required' });
  });
});

describe('validateName', () => {
  it('should validate names with minimum length', () => {
    expect(validateName('John')).toEqual({ valid: true, message: '' });
    expect(validateName('John Doe')).toEqual({ valid: true, message: '' });
  });

  it('should reject names that are too short', () => {
    expect(validateName('A')).toEqual({
      valid: false,
      message: 'Name must be at least 2 characters',
    });
    expect(validateName('')).toEqual({ valid: false, message: 'Name is required' });
  });
});

describe('validateMessage', () => {
  it('should validate messages within length limits', () => {
    expect(validateMessage('This is a valid message')).toEqual({ valid: true, message: '' });
  });

  it('should reject messages that are too short', () => {
    expect(validateMessage('Hi')).toEqual({
      valid: false,
      message: 'Message must be at least 10 characters',
    });
  });

  it('should reject empty messages', () => {
    expect(validateMessage('')).toEqual({ valid: false, message: 'Message is required' });
  });
});

describe('validatePhone', () => {
  it('should validate correct phone numbers', () => {
    expect(validatePhone('+1234567890')).toEqual({ valid: true, message: '' });
    expect(validatePhone('1234567890')).toEqual({ valid: true, message: '' });
    expect(validatePhone('+1 (234) 567-8900')).toEqual({ valid: true, message: '' });
  });

  it('should reject invalid phone numbers', () => {
    expect(validatePhone('123')).toEqual({
      valid: false,
      message: 'Please enter a valid phone number',
    });
    expect(validatePhone('')).toEqual({ valid: false, message: 'Phone number is required' });
  });
});

describe('validateUrl', () => {
  it('should validate correct URLs', () => {
    expect(validateUrl('https://example.com')).toEqual({ valid: true, message: '' });
    expect(validateUrl('http://test.org')).toEqual({ valid: true, message: '' });
  });

  it('should reject invalid URLs', () => {
    expect(validateUrl('not-a-url')).toEqual({
      valid: false,
      message: 'Please enter a valid URL',
    });
    expect(validateUrl('')).toEqual({ valid: false, message: 'URL is required' });
  });
});

describe('validateForm', () => {
  it('should validate all fields correctly', () => {
    const fields = {
      email: 'test@example.com',
      name: 'John Doe',
    };

    const validators = {
      email: validateEmail,
      name: validateName,
    };

    const result = validateForm(fields, validators);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return errors for invalid fields', () => {
    const fields = {
      email: 'invalid',
      name: 'A',
    };

    const validators = {
      email: validateEmail,
      name: validateName,
    };

    const result = validateForm(fields, validators);
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('email');
    expect(result.errors).toHaveProperty('name');
  });
});
