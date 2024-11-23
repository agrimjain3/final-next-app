// import crypto from 'node:crypto';

// export function hashUserPassword(password) {
//   const salt = crypto.randomBytes(16).toString('hex');

//   const hashedPassword = crypto.scryptSync(password, salt, 64);
//   return hashedPassword.toString('hex') + ':' + salt;
// }

// export function verifyPassword(storedPassword, suppliedPassword) {
//   const [hashedPassword, salt] = storedPassword.split(':');
//   const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
//   const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);
//   return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
// }
import crypto from 'node:crypto';

/**
 * Hashes a user password using a random salt and returns the result.
 * @param {string} password - The plain-text password to hash.
 * @returns {string} - The hashed password in the format 'hashedPassword:salt'.
 */
export function hashUserPassword(password) {
  if (!password || typeof password !== 'string') {
    throw new Error("Password must be a non-empty string.");
  }

  const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
  const hashedPassword = crypto.scryptSync(password, salt, 64); // Hash the password with the salt

  return `${hashedPassword.toString('hex')}:${salt}`; // Return the hashed password with the salt
}

/**
 * Verifies a supplied password against a stored password hash.
 * @param {string} storedPassword - The stored password in the format 'hashedPassword:salt'.
 * @param {string} suppliedPassword - The plain-text password to verify.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
export function verifyPassword(storedPassword, suppliedPassword) {
  if (!storedPassword || typeof storedPassword !== 'string') {
    throw new Error("Stored password must be a non-empty string.");
  }

  if (!suppliedPassword || typeof suppliedPassword !== 'string') {
    throw new Error("Supplied password must be a non-empty string.");
  }

  const [hashedPassword, salt] = storedPassword.split(':');

  if (!hashedPassword || !salt) {
    throw new Error("Stored password format is invalid. Expected 'hashedPassword:salt'.");
  }

  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex'); // Convert the hashed password to a buffer
  const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64); // Hash the supplied password with the same salt

  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf); // Compare the two hashes securely
}
