import { UserCredentials } from '../../../types/types';
import * as Credentials from '../../../databases/Credentials';

/**
 * Checks if user credential es valid. Function will modified
 * after setting up project main data base
 * @param userCredentials The user credential
 * @returns true if valid, error if not
 */
const isValidCredentials = (userCredentials: UserCredentials): boolean => {
  const isValid = Credentials.isValidCredentials(userCredentials);
  return isValid;
};

export default isValidCredentials;
