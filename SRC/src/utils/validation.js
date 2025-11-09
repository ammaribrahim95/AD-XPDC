// Common validators for forms
export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const isNotEmpty = (v) => v && v.trim() !== '';
