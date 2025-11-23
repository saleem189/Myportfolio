/**
 * Form validation utilities
 * Provides reusable validation functions for common form inputs
 */

/**
 * Validates an email address
 * @param {string} email - The email address to validate
 * @returns {{valid: boolean, message: string}} Validation result
 */
export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { valid: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }

  return { valid: true, message: '' };
}

/**
 * Validates a name field
 * @param {string} name - The name to validate
 * @param {number} minLength - Minimum length (default: 2)
 * @returns {{valid: boolean, message: string}} Validation result
 */
export function validateName(name, minLength = 2) {
  if (!name || name.trim() === '') {
    return { valid: false, message: 'Name is required' };
  }

  if (name.trim().length < minLength) {
    return { valid: false, message: `Name must be at least ${minLength} characters` };
  }

  return { valid: true, message: '' };
}

/**
 * Validates a text message
 * @param {string} text - The text to validate
 * @param {number} minLength - Minimum length (default: 10)
 * @param {number} maxLength - Maximum length (default: 5000)
 * @returns {{valid: boolean, message: string}} Validation result
 */
export function validateMessage(text, minLength = 2, maxLength = 5000) {
  if (!text || text.trim() === '') {
    return { valid: false, message: 'Message is required' };
  }

  const trimmedLength = text.trim().length;

  if (trimmedLength < minLength) {
    return { valid: false, message: `Message must be at least ${minLength} characters` };
  }

  if (trimmedLength > maxLength) {
    return { valid: false, message: `Message must not exceed ${maxLength} characters` };
  }

  return { valid: true, message: '' };
}

/**
 * Validates a phone number (basic validation)
 * @param {string} phone - The phone number to validate
 * @returns {{valid: boolean, message: string}} Validation result
 */
export function validatePhone(phone) {
  if (!phone || phone.trim() === '') {
    return { valid: false, message: 'Phone number is required' };
  }

  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-().]/g, '');

  // Check if it's a valid phone number (10-15 digits)
  const phoneRegex = /^\+?[\d]{10,15}$/;
  if (!phoneRegex.test(cleaned)) {
    return { valid: false, message: 'Please enter a valid phone number' };
  }

  return { valid: true, message: '' };
}

/**
 * Validates a URL
 * @param {string} url - The URL to validate
 * @returns {{valid: boolean, message: string}} Validation result
 */
export function validateUrl(url) {
  if (!url || url.trim() === '') {
    return { valid: false, message: 'URL is required' };
  }

  try {
    new URL(url);
    return { valid: true, message: '' };
  } catch {
    return { valid: false, message: 'Please enter a valid URL' };
  }
}

/**
 * Validates multiple fields at once
 * @param {Object} fields - Object with field names as keys and values to validate
 * @param {Object} validators - Object with field names as keys and validator functions as values
 * @returns {{valid: boolean, errors: Object}} Validation result with errors object
 */
export function validateForm(fields, validators) {
  const errors = {};
  let isValid = true;

  for (const [fieldName, value] of Object.entries(fields)) {
    const validator = validators[fieldName];
    if (validator) {
      const result = validator(value);
      if (!result.valid) {
        errors[fieldName] = result.message;
        isValid = false;
      }
    }
  }

  return { valid: isValid, errors };
}
