import api from '../config/api.js';

function formatValidationErrors(errorsArray) {
  const errorsObject = errorsArray.reduce((acc, error) => {
    // pull the first key val out of single error object
    const [key, value] = Object.entries(error)[0];
    
    if (acc[key]) {
      // If the key already exists, concatenate the new error message
      acc[key] += ` ${value}`;
    } else {
      // Otherwise, add the key-value pair
      acc[key] = value;
    }
  
    return acc;
  }, {});
  return errorsObject;
}

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/api/user/profile', profileData);
    return { data: response.data.user, error: null};
  } catch (error) {
    if (error.response) {
      console.log('error response', error)
      const status = error.response.status;
      const serverError = error.response.data.error

      // Existing email
      if (status === 409) {
        return {data: null, error: {validationError: null, conflictError: serverError.message }}
      }

      if (status === 400) {

        const errorsObject = formatValidationErrors(serverError)
        
        return {data: null, error: {validationError: errorsObject, conflictError: null }}
      }

      throw new Error(serverError.message)
      
    } else {
      throw new Error('Network error or no response from the server');
    }
  }
};